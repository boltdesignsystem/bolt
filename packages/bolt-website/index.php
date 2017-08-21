<?php

require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/bolt/pattern-kit-core/src/app.php';

$app['http_cache']->run();
