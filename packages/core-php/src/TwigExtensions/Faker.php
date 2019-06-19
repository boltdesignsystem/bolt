<?php

namespace Bolt\TwigExtensions;
use \Faker\Factory;

class TwigFaker {
  private $faker;

  function __construct () {
      $this->faker = Factory::create();
      if (getenv('TWIG_FAKER_ALWAYS_GET_SAME_TEXT')) {// Env Var can be set to any text
        // Set it so each call returns that same text: it won't be random text each time.
        // Valuable for Visual Regression Testing.
        $this->faker->seed(1234);
      }
  }

  /**
   * Get random text
   * @param int $maxCharcters - Max characters of text
   * @return string
   */
  function text($maxCharcters = 200) {
    return $this->faker->text($maxCharcters);
  }

  /**
   * Get random words
   * @param int $number - Max number of words
   * @return string
   */
  function words($number = 3, $asText = true) {
    return $this->faker->words($number, true);
  }

  /**
   * Get random sentences
   * @param int $number - Number of sentences
   * @return string
   */
  function sentences($nb = 3, $asText = false){
    return $this->faker->sentences($nb, $asText);
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
  static function sentence($nbWords = 6, $variableNbWords = true){
    return $this->faker->sentences($nbWords, $variableNbWords);
  }

  /**
   * @param int $sentences - How many sentences
   * @param bool $variable - Should the number vary by +/- 40%?
   * @return string
   */
  function paragraph($sentences = 8, $variable = true) {
    return $this->faker->paragraph($sentences, $variable);
  }

  /**
   * @example 'Robust full-range hub'
   */
  function catchPhrase(){
    return $this->faker->catchPhrase();
  }

  /**
   * @example 'integrate extensible convergence'
   */
  function bs(){
    return $this->faker->bs();
  }

  /**
   * @example 'Acme Ltd'
   */
  function company(){
    return $this->faker->company();
  }
}