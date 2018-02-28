<?php
declare(strict_types=1);

namespace Bolt;

use PHPUnit\Framework\TestCase;
use Bolt;

final class ColorsTest extends TestCase
{
  private static $epsilon = 0.00001; // accuracy for floating point test
  private static $colorBlack = '000000';
  private static $colorWhite = 'ffffff';
  private static $colorRandom = 'a8b3c1';

  public function testCanCalculateLuminosity() {
    $luminosityBlack = Colors::calculateLuminosity(self::$colorBlack);
    $luminosityWhite = Colors::calculateLuminosity(self::$colorWhite);
    $luminosityRandom = Colors::calculateLuminosity(self::$colorRandom);

    $this->assertSame(0.0, $luminosityBlack);
    $this->assertSame(1.0, $luminosityWhite);
    $this->assertTrue(abs(0.44415-$luminosityRandom) < self::$epsilon);
  }

  public function testCanCalculateLuminosityRatio() {
    $luminosityRatioOne = Colors::calculateLuminosityRatio(self::$colorBlack, self::$colorWhite);
    $luminosityRatioTwo = Colors::calculateLuminosityRatio(self::$colorWhite, self::$colorBlack);
    $luminosityRatioThree = Colors::calculateLuminosityRatio(self::$colorBlack, self::$colorRandom);
    $luminosityRatioFour = Colors::calculateLuminosityRatio(self::$colorWhite, self::$colorRandom);

    $this->assertTrue(abs(21-$luminosityRatioOne) < self::$epsilon);
    $this->assertTrue(abs(21-$luminosityRatioTwo) < self::$epsilon);
    $this->assertTrue(abs(9.88305-$luminosityRatioThree) < self::$epsilon);
    $this->assertTrue(abs(2.12484-$luminosityRatioFour) < self::$epsilon);
  }

  public function testCanCalculateTextContrast() {
    $textContrastOne = Colors::calculateTextContrast(self::$colorBlack);
    $textContrastTwo = Colors::calculateTextContrast(self::$colorWhite);
    $textContrastThree = Colors::calculateTextContrast(self::$colorRandom);

    $this->assertEquals('white', $textContrastOne);
    $this->assertEquals('black', $textContrastTwo);
    $this->assertEquals('black', $textContrastThree);
  }
}
