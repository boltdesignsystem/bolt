<?php
declare(strict_types=1);

namespace Bolt;

use PHPUnit\Framework\TestCase;
use Bolt;

final class ColorsTest extends TestCase
{
  private static $epsilon = 0.00001; // accuracy for floating point test

  public function testCanCalculateLuminosity() {
    $colorBlack = '000000';
    $colorWhite = 'ffffff';
    $colorRandom = 'a8b3c1';

    $luminosityBlack = Colors::calculateLuminosity($colorBlack);
    $luminosityWhite = Colors::calculateLuminosity($colorWhite);
    $luminosityRandom = Colors::calculateLuminosity($colorRandom);

    $this->assertSame(0.0, $luminosityBlack);
    $this->assertSame(1.0, $luminosityWhite);
    $this->assertTrue(abs(0.44415-$luminosityRandom) < self::$epsilon);
  }

  public function testCanCalculateLuminosityRatio() {
    $colorBlack = '000000';
    $colorWhite = 'ffffff';
    $colorRandom = 'a8b3c1';

    $luminosityRatioOne = Colors::calculateLuminosityRatio($colorBlack, $colorWhite);
    $luminosityRatioTwo = Colors::calculateLuminosityRatio($colorWhite, $colorBlack);
    $luminosityRatioThree = Colors::calculateLuminosityRatio($colorBlack, $colorRandom);
    $luminosityRatioFour = Colors::calculateLuminosityRatio($colorWhite, $colorRandom);

    $this->assertTrue(abs(21-$luminosityRatioOne) < self::$epsilon);
    $this->assertTrue(abs(21-$luminosityRatioTwo) < self::$epsilon);
    $this->assertTrue(abs(9.88305-$luminosityRatioThree) < self::$epsilon);
    $this->assertTrue(abs(2.12484-$luminosityRatioFour) < self::$epsilon);
  }

  public function testCanCalculateTextContrast() {
    $colorBlack = '000000';
    $colorWhite = 'ffffff';
    $colorRandom = 'a8b3c1';

  }
}
