<?php

$function = new \Twig_SimpleFunction('pattern_template', function ($patternName) {

// uncomment to see all calls to this template
//  fputs(STDOUT, '
//  pattern_template: '. $patternName . '
//  ');

  // @todo Deprecate & remove this whole `pattern_template` function
  switch ($patternName) {
    case 'button_group':
      return '@bolt/button-group.twig';
    case 'button':
      return '@bolt/button.twig';
    case 'card':
      return '@bolt/card.twig';
    case 'eyebrow':
      return '@bolt/eyebrow.twig';
    case 'flag':
      return '@bolt/flag.twig';
    case 'headline':
      return '@bolt/headline.twig';
    case 'image':
      return '@bolt/image.twig';
    case 'link':
      return '@bolt/link.twig';
    case 'teaser':
      return '@bolt/teaser.twig';
    case 'text':
      return '@bolt/text.twig';
    case 'video':
      return '@bolt/video.twig';
    default:
      return 'ERROR: Template not found: '. $patternName;
  }

  // the full list of `$patternName` that uses this is:
    //button - @bolt/button.twig
    //button_group - @bolt-button-group/button-group.twig
    //card - @bolt-card/card.twig
    //eyebrow - @bolt-headline/eyebrow.twig
    //flag - @bolt-global/flag.twig
    //headline - @bolt-headline/headline.twig
    //image - @bolt-global/image.twig
    //teaser - @bolt-teaser/teaser.twig
    //text - @bolt-headline/text.twig
    //video - @bolt-video/video.twig

}, [
  'needs_environment' => false,
  'needs_context' => false
]);

?>
