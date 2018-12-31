<?php

namespace Drupal\Core;

/**
 * Defines an object that holds information about a URL.
 */
class Url {

  /**
   * The URL options.
   *
   * See \Drupal\Core\Url::fromUri() for details on the options.
   *
   * @var array
   */
  protected $options = array();

  /**
   * The URI.
   *
   * @var string
   */
  protected $uri;

  /**
   * Constructs a new Url object.
   *
   * In most cases, use Url::fromRoute() rather than
   * constructing Url objects directly in order to avoid ambiguity and make your
   * code more self-documenting.
   *
   * @param string $uri
   *   The uri
   * @param array $options
   *   See \Drupal\Core\Url::fromUri() for details.
   *
   * @see static::fromRoute()
   * @see static::fromUri()
   *
   * @todo Update this documentation for non-routed URIs in
   *   https://www.drupal.org/node/2346787
   */
  public function __construct($uri, $options = array()) {
    $this->uri = $uri;
    $this->options = $options;
  }

  /**
   * Creates a new Url object from a URI.
   *
   * @param string $uri
   *   The URI of the resource including the scheme.
   * @param array $options
   *   (optional) An associative array of additional URL options, with the
   *   following elements:
   *   - 'attributes': An associative array of HTML attributes that will be
   *     added to the anchor tag if you use the \Drupal\Core\Link class to make
   *     the link.
   *
   * @return \Drupal\Core\Url
   *   A new Url object.
   */
  public static function fromUri($uri, $options = []) {
    $url = new static($uri, $options);

    return $url;
  }

  /**
   * Returns the URL options.
   *
   * @return array
   *   The array of options. See \Drupal\Core\Url::fromUri() for details on what
   *   it contains.
   */
  public function getOptions() {
    return $this->options;
  }

  /**
   * Gets a specific option.
   *
   * See \Drupal\Core\Url::fromUri() for details on the options.
   *
   * @param string $name
   *   The name of the option.
   *
   * @return mixed
   *   The value for a specific option, or NULL if it does not exist.
   */
  public function getOption($name) {
    if (!isset($this->options[$name])) {
      return NULL;
    }

    return $this->options[$name];
  }

  /**
   * Sets the URL options.
   *
   * @param array $options
   *   The array of options. See \Drupal\Core\Url::fromUri() for details on what
   *   it contains.
   *
   * @return $this
   */
  public function setOptions($options) {
    $this->options = $options;
    return $this;
  }

  /**
   * Sets a specific option.
   *
   * See \Drupal\Core\Url::fromUri() for details on the options.
   *
   * @param string $name
   *   The name of the option.
   * @param mixed $value
   *   The option value.
   *
   * @return $this
   */
  public function setOption($name, $value) {
    $this->options[$name] = $value;
    return $this;
  }

  /**
   * Returns the URI value for this Url object.
   *
   * @return string
   *   A URI.
   */
  public function getUri() {
    return $this->uri;
  }

  /**
   * Generates the string URL representation for this Url object.
   *
   * @return string
   *   A string URL.
   */
  public function __tostring() {
    return $this->uri;
  }

}
