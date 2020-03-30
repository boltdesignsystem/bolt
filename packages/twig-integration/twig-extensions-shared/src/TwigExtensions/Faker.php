<?php

namespace Bolt\TwigExtensions;
use \Faker\Factory;


class TwigFaker {
  // public $faker;

  public static $faker;


  public function __construct () {
    // $faker = ;
    static::$faker = Factory::create();

    // self::$faker = $faker;
      if (getenv('TWIG_FAKER_ALWAYS_GET_SAME_TEXT')) {// Env Var can be set to any text
        // Set it so each call returns that same text: it won't be random text each time.
        // Valuable for Visual Regression Testing.
        self::$faker->seed(1234);
      }
  }

  /**
   * Get random text
   * @param int $maxCharcters - Max characters of text
   * @return string
   */
  public function text($maxCharcters = 200) {
    return self::$faker->text($maxCharcters);
  }


  public function numberBetween($min = 1, $max = 99){
    return self::$faker->numberBetween($min, $max);
  }

  /**
   * Get random words
   * @param int $number - Max number of words
   * @return string
   */
  public function words($number = 3, $asText = true) {
    return self::$faker->words($number, true);
  }

  /**
   * Get random sentences
   * @param int $number - Number of sentences
   * @return string
   */
  public function sentences($nb = 3, $asText = false){
    return self::$faker->sentences($nb, $asText);
  }

  /**
   * Generate a random sentence
   *
   * @example 'Lorem ipsum dolor sit amet.'
   * @param integer $nbWords         around how many words the sentence should contain
   * @param boolean $variableNbWords set to false if you want exactly $nbWords returned,
   *                                  otherwise $nbWords may vary by +/-40% with a minimum of 1
   * @return string
   */
  static public function sentence($nbWords = 6, $variableNbWords = true){
    return self::$faker->sentence($nbWords, $variableNbWords);
  }

  /**
   * @param int $sentences - How many sentences
   * @param bool $variable - Should the number vary by +/- 40%?
   * @return string
   */
  public function paragraph($sentences = 8, $variable = true) {
    return self::$faker->paragraph($sentences, $variable);
  }

  /**
   * @example 'Robust full-range hub'
   */
  public function catchPhrase(){
    return self::$faker->catchPhrase();
  }

  /**
   * @example 'integrate extensible convergence'
   */
  public function bs(){
    return self::$faker->bs();
  }

  /**
   * @example 'Acme Ltd'
   */
  public function company(){
    return self::$faker->company();
  }
}