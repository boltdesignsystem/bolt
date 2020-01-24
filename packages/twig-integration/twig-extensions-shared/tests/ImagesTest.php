<?php
declare(strict_types=1);

namespace Bolt;

use PHPUnit\Framework\TestCase;
use Webmozart\PathUtil\Path;
use Bolt;

class ImagesTests extends TestCase {

  public function setUp() {
    // Doing this so colors will actually get calculated
    putenv('NODE_ENV=production');
  }

  public function testGetImageData() {
    $sets = [
      [
        'file' => 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
        'height' => 0,
        'width' => 0,
        'isAbsolute' => true,
      ],
      [
        'file' => 'assets/500x500.jpg',
        'height'=> 500,
        'width'=> 500,
        'color' => '#2f4962',
        'base64' => 'data:image/jpeg;base64',
        'isAbsolute' => false,
      ],
      [
        'file' => 'assets/732x945.jpg',
        'height'=> 945,
        'width'=> 732,
        'color' => '#c9c9c9',
        'base64' => 'data:image/jpeg;base64',
        'isAbsolute' => false,
      ],
      [
        'file' => 'assets/tout-4x3-climber.jpg',
        'height'=> 480,
        'width'=> 640,
        'color' => '#6b6764',
        'base64' => 'data:image/jpeg;base64',
        'isAbsolute' => false,
      ],
      [
        'file' => 'assets/decision-hub-chart.png',
        'height'=> 2300,
        'width'=> 2712,
        'color' => 'hsl(233, 33%, 97%)',
        'base64' => 'data:image/gif;base64',
        'isAbsolute' => false,
      ],
      [
        'file' => 'assets/logo-paypal.svg',
        'height'=> 33,
        'width'=> 124,
        'color' => 'hsl(233, 33%, 97%)',
        'base64' => 'data:image/gif;base64',
        'isAbsolute' => false,
      ],
    ];

    foreach ($sets as $set) {
      $results = Images::get_image_data($set['file'], __DIR__);
      $this->assertEquals($set['height'], $results['height'], 'height of image');
      $this->assertEquals($set['width'], $results['width'], 'width of image');
      if (isset($set['base64'])) {
        $this->assertStringStartsWith($set['base64'], $results['base64']);
      }
      if (isset($set['color'])) {
        $this->assertTrue(self::compareColors($set['color'], $results['color'], 0.001), "{$set['file']}, the expected value {$results['color']} did not match the actual value {$set['color']}.");
      }
    }
  }

  /**
   * Returns true if the two colors are within the given precision
   * @param $expectedColor string hex color in the form of either `#xxxxxx` or `hsl(123, xx%, xx%)`
   * @param $actualColor string hex color in the form of either `#xxxxxx` or `hsl(123, xx%, xx%)`
   * @param $precision float acceptable percent difference between the two numbers to return true.
   * @return bool
   */
  private static function compareColors($expectedColor, $actualColor, $precision) {
    list($rExpected, $gExpected, $bExpected) = sscanf($expectedColor, "#%02x%02x%02x");
    $expectedColorRgbValue = $rExpected . "," . $gExpected . "," . $bExpected;

    list($rActual, $gActual, $bActual) = sscanf($actualColor, "#%02x%02x%02x");
    $actualColorRgbValue = $rActual . "," . $gActual . "," . $bActual;

    $expectedColorRgbValue = [ $rExpected, $gExpected, $bExpected ];
    $actualColorRgbValue = [ $rActual, $gActual, $bActual ];

    $color_difference = (self::deltaECIE2000($expectedColorRgbValue, $actualColorRgbValue));

    return ($color_difference . chr(10)) < $precision * 100;
  }



  // @todo: move to separate class - code taken from https://github.com/renasboy/php-color-difference
  public static function deltaECIE2000 ($rgb1, $rgb2) {
        list($l1, $a1, $b1) = self::_rgb2lab($rgb1);
        list($l2, $a2, $b2) = self::_rgb2lab($rgb2);

        $avg_lp     = ($l1 + $l2) / 2;
        $c1         = sqrt(pow($a1, 2) + pow($b1, 2));
        $c2         = sqrt(pow($a2, 2) + pow($b2, 2));
        $avg_c      = ($c1 + $c2) / 2;
        $g          = (1 - sqrt(pow($avg_c , 7) / (pow($avg_c, 7) + pow(25, 7)))) / 2;
        $a1p        = $a1 * (1 + $g);
        $a2p        = $a2 * (1 + $g);
        $c1p        = sqrt(pow($a1p, 2) + pow($b1, 2));
        $c2p        = sqrt(pow($a2p, 2) + pow($b2, 2));
        $avg_cp     = ($c1p + $c2p) / 2;
        $h1p        = rad2deg(atan2($b1, $a1p));
        if ($h1p < 0) {
            $h1p    += 360;
        }
        $h2p        = rad2deg(atan2($b2, $a2p));
        if ($h2p < 0) {
            $h2p    += 360;
        }
        $avg_hp     = abs($h1p - $h2p) > 180 ? ($h1p + $h2p + 360) / 2 : ($h1p + $h2p) / 2;
        $t          = 1 - 0.17 * cos(deg2rad($avg_hp - 30)) + 0.24 * cos(deg2rad(2 * $avg_hp)) + 0.32 * cos(deg2rad(3 * $avg_hp + 6)) - 0.2 * cos(deg2rad(4 * $avg_hp - 63));
        $delta_hp   = $h2p - $h1p;
        if (abs($delta_hp) > 180) {
            if ($h2p <= $h1p) {
                $delta_hp += 360;
            }
            else {
                $delta_hp -= 360;
            }
        }
        $delta_lp   = $l2 - $l1;
        $delta_cp   = $c2p - $c1p;
        $delta_hp   = 2 * sqrt($c1p * $c2p) * sin(deg2rad($delta_hp) / 2);
        $s_l        = 1 + ((0.015 * pow($avg_lp - 50, 2)) / sqrt(20 + pow($avg_lp - 50, 2)));
        $s_c        = 1 + 0.045 * $avg_cp;
        $s_h        = 1 + 0.015 * $avg_cp * $t;
        $delta_ro   = 30 * exp(-(pow(($avg_hp - 275) / 25, 2)));
        $r_c        = 2 * sqrt(pow($avg_cp, 7) / (pow($avg_cp, 7) + pow(25, 7)));
        $r_t        = -$r_c * sin(2 * deg2rad($delta_ro));
        $kl = $kc = $kh = 1;
        $delta_e    = sqrt(pow($delta_lp / ($s_l * $kl), 2) + pow($delta_cp / ($s_c * $kc), 2) + pow($delta_hp / ($s_h * $kh), 2) + $r_t * ($delta_cp / ($s_c * $kc)) * ($delta_hp / ($s_h * $kh)));
        return $delta_e;
    }
    private static function _rgb2lab ($rgb) {
        return self::_xyz2lab(self::_rgb2xyz($rgb));
    }
    private static function _rgb2xyz ($rgb) {
        list($r, $g, $b) = $rgb;
        $r = $r <= 0.04045 ? $r / 12.92 : pow(($r + 0.055) / 1.055, 2.4);
        $g = $g <= 0.04045 ? $g / 12.92 : pow(($g + 0.055) / 1.055, 2.4);
        $b = $b <= 0.04045 ? $b / 12.92 : pow(($b + 0.055) / 1.055, 2.4);
        $r *= 100;
        $g *= 100;
        $b *= 100;
        $x = $r * 0.412453 + $g * 0.357580 + $b * 0.180423;
        $y = $r * 0.212671 + $g * 0.715160 + $b * 0.072169;
        $z = $r * 0.019334 + $g * 0.119193 + $b * 0.950227;
        return [ $x, $y, $z];
    }
    private static function _xyz2lab ($xyz) {
        list ($x, $y, $z) = $xyz;
        $x /= 95.047;
        $y /= 100;
        $z /= 108.883;
        $x = $x > 0.008856 ? pow($x, 1 / 3) : $x * 7.787 + 16 / 116;
        $y = $y > 0.008856 ? pow($y, 1 / 3) : $y * 7.787 + 16 / 116;
        $z = $z > 0.008856 ? pow($z, 1 / 3) : $z * 7.787 + 16 / 116;
        $l = $y * 116 - 16;
        $a = ($x - $y) * 500;
        $b = ($y - $z) * 200;
        return [ $l, $a, $b ];
    }
}
