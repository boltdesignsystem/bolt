<?php
declare(strict_types=1);

namespace Bolt;

use PHPUnit\Framework\TestCase;
use Bolt;

final class UtilsTest extends TestCase
{

  public function testIsRemoteUrl() {
    $sets = [
      [
        'url' => 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
        'answer' => true,
      ],
      [
        'url' => 'http://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
        'answer' => true,
      ],
      [
        'url' => '//upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
        'answer' => true,
      ],
      [
        'url' => 'wikipedia/en/a/a9/Example.jpg',
        'answer' => false,
      ],
      [
        'url' => '../wikipedia/en/a/a9/Example.jpg',
        'answer' => false,
      ],

    ];
    foreach ($sets as $set) {
      $this->assertEquals($set['answer'], Utils::isRemoteUrl($set['url']), 'This should be: ' . json_encode($set['answer']) . ' ~ ' . $set['url']);
    }
  }
}
