load("init.js");

testOnAllDevices("Search page test", "/styleguide/search.html", function(driver, device) {
  checkLayout(driver, "test/visual/specs/search.gspec", device.tags, device.excludedTags);
  checkImageDiff({
    driver: driver,
    storage: "test/visual/image-diff/search-" + device.deviceName,
    spec: "test/visual/specs/search.gspec"
  });
});