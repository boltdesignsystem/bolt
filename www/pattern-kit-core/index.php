<?php

require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/pattern-kit/src/app.php';

$app['http_cache']->run();
