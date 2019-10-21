<?php

$filter = new Twig_SimpleFilter('json_decode', function ($json) {
  return json_decode($json, true);
});