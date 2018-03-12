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
    // @todo add png
    // @todo add svg
    // @todo add jpeg
    $sets = [
      [
        'file' => 'assets/500x500.jpg',
        'height'=> 500,
        'width'=> 500,
        'color' => '#dcbfa6',
      ],
      [
        'file' => 'assets/732x945.jpg',
        'height'=> 945,
        'width'=> 732,
        'color' => '#bdbdbd',
      ],
      [
        'file' => 'assets/tout-4x3-climber.jpg',
        'height'=> 480,
        'width'=> 640,
        'color' => '#908379',
      ],
      [
        'file' => 'assets/decision-hub-chart.png',
        'height'=> 2300,
        'width'=> 2712,
        'color' => '#cd9b1c',
      ],
      [
        'file' => 'assets/logo-paypal.svg',
        'height'=> 500,
        'width'=> 500,
        'color' => '#dcbfa6',
      ],
    ];

    foreach ($sets as $set) {
      $results = Images::get_image_data($set['file'], __DIR__);
      $this->assertEquals($set['height'], $results['height'], 'height of image');
      $this->assertEquals($set['width'], $results['width'], 'width of image');
      $this->assertEquals($set['color'], $results['color'], 'color of image');
      $this->assertStringStartsWith('data:image/jpeg;base64', $results['base64']);
    }
  }

}
