# Device Viewer component testing steps

## Device Viewer component render as expected (functionally and visually)

The server-side pre-rendered `bolt-device-viewer` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Device Viewer Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-device-viewer-05-device-viewer/02-components-device-viewer-05-device-viewer.html).
2. Then, enable javascript and watch as the Device Viewer re-renders on the client-side.
3. The layout should not shift, e.g. the appearance of each device image should be identical before and after the web component re-renders.

# Device Viewer component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: device viewer

    In order to present application layouts as seen by mulitple device viewports
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-device-viewer" component renders and functions as expected

## Scenario: Ipad display variations

1. Given I am viewing the [Ipad display variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-device-viewer-10-device-viewer-ipad-variation/02-components-device-viewer-10-device-viewer-ipad-variation.html).
2. First display varient should show a black Ipad in a portrait orientation.
3. Second display varient should be a black Ipad in a landscape orientation.
4. Third display varient should be a silver Ipad in a portrait orientation.
5. Fourth display varient should be a silver Ipad in a landsacpe orientation.
6. Fifth display varient should be a silver Ipad in a portrait orientation with a magnifying glass icon in viewport center.
7. When hovered over with the cursor a movable magnification view becomes visible.
8. Sixth display varient should be a black Ipad in a landscape orientation with a magnifying glass icon in viewport center.
9. When hovered over with the cursor a movable magnification view becomes visible. 

## Scenario: Iphone8 display variations

1. Given I am viewing the [Iphone8 variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-device-viewer-15-device-viewer-iphone8-variation/02-components-device-viewer-15-device-viewer-iphone8-variation.html).
2. First display varient should show a black Iphone8 in a portrait orientation.
3. Second display varient should be a black Iphone8 in a landscape orientation.
4. Third display varient should be a silver Iphone8 in a portrait orientation.
5. Fourth display varient should be a silver Iphone8 in a landsacpe orientation.
6. Third display varient should be a gold Iphone8 in a portrait orientation.
7. Fourth display varient should be a gold Iphone8 in a landsacpe orientation.
8. Fifth display varient should be a silver Iphone8 in a portrait orientation with a magnifying glass icon in viewport center.
9. When hovered over with the cursor a movable magnification view becomes visible.
10. Sixth display varient should be a black Iphone8 in a landscape orientation with a magnifying glass icon in viewport center.
11. When hovered over with the cursor a movable magnification view becomes visible. 

## Scenario: Macbook variations

1. Given I am viewing the [Macbook variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-device-viewer-20-device-viewer-macbook-variation/02-components-device-viewer-20-device-viewer-macbook-variation.html).
2. First display varient should display the default macbook view.
3. Second display should display a macbook with a magnifying glass icon in the viewport center.
4. When hovered over with the cursor a movable magnification view becomes visible.
