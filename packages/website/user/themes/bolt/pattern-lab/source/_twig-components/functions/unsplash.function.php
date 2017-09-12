<?php

use Crew\Unsplash\HttpClient;



$function = new Twig_SimpleFunction('unsplash', function ($width, $height) {

  Crew\Unsplash\HttpClient::init([
  	'applicationId'	=> '1006c0142f5a69df292023ae6cb9b76325a7b2639587f0ed1c44566848cd7377',
  	'secret'		=> 'ed98cb383003b8ef035045689e89624946eba2eb4fd7136a4fc85acef9999cad',
  	// 'callbackUrl'	=> 'https://your-application.com/oauth/callback',
  	'utmSource' => 'Pattern Lab'
  ]);

  $filters = [
    // 'category' => [3, 6],
    // 'featured' => true,
    // 'username' => 'andy_brunner',
    // 'query'    => 'coffee',
    'w'        => $width,
    'h'        => $height
  ];

  // file_put_contents("Tmpfile.zip", fopen("http://someurl/file.zip", 'r'));
  // $photo = Crew\Unsplash\Photo::random($filters);
  //
  // print('<pre>');
  // print_r($photo);
  // print('</pre>');
  // return $photo;


});
