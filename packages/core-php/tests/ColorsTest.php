<?php
declare(strict_types=1);

namespace Bolt;

use PHPUnit\Framework\TestCase;
use Bolt;

final class ColorsTest extends TestCase
{
  public function testCanCalculateLuminosity() {
    $colorBlack = '000000';
    $colorWhite = 'ffffff';
    $colorRandom = 'a8b3c1';
    $epsilon = 0.00001; // accuracy for floating point test

    $luminosityBlack = Colors::calculateLuminosity($colorBlack);
    $luminosityWhite = Colors::calculateLuminosity($colorWhite);
    $luminosityRandom = Colors::calculateLuminosity($colorRandom);

    $this->assertSame(0.0, $luminosityBlack);
    $this->assertSame(1.0, $luminosityWhite);
    $this->assertTrue(abs(0.44415-$luminosityRandom) < $epsilon);
  }
}
