load("galen-bootstrap/galen-bootstrap.js");

$galen.settings.website = "http://localhost:8000";
$galen.registerDevice("narrow", inLocalBrowser("narrow screen", "540x960", ["narrow_screen"]));
$galen.registerDevice("wide", inLocalBrowser("wide screen", "1280x960", ["wide_screen"]));