<?php

require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/app.php';

$app['http_cache']->run();
