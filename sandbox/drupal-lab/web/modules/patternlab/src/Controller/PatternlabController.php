<?php
/**
 * @file
 * Contains \Drupal\patternlab\Controller\PatternlabController.
 */

namespace Drupal\patternlab\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Provides route responses for the patternlab module.
 */
class PatternlabController extends ControllerBase {

  /**
   * Redirects to the static patternlab path for the theme.
   */
  public function view($theme) {
    // @TODO: This should be configurable. Obviously.
    return new RedirectResponse("/themes/{$theme}/pattern-lab/public/index.html");
  }
}
