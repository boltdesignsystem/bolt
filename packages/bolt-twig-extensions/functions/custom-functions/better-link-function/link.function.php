<?php
// Includes Attributes object support
if (!class_exists('Drupal')) {

$function = new Twig_SimpleFunction(
    'link',
    function ($title, $url, $attributes) {
      
      if (!empty($attributes)) {
        if (is_array($attributes)) {
          $attributes = new Drupal\Core\Template\Attribute($attributes);
        }
        return '<a href="' . $url . '"' . $attributes . '>' . $title . '</a>';
      } else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    },
    array('is_safe' => array('html'))
);

}
