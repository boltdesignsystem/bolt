# Nav Priority Functional Testing Steps

## Background: mobile 
1. Given I am viewing the URL /pattern-lab/?p=components-navbar-docs
1. And the viewport is narrower than the the xsmall breakpoint (400px)

### Scenario: mobile initial state
1. Then I should NOT see the nav links
1. And I should see a chevron down icon

### Scenario: mobile open and close 
1. When I click the chevron down icon
1. Then I should see all the nav links in a dropdown
1. When I click the chevron down icon again (or click outside the menu)
1. Then I should NOT see the nav links


## Background: medium breakpoint
1. Given I am viewing the URL /pattern-lab/?p=components-navbar-docs
1. And the viewer is between the medium and large breakpoints (~800px to ~1000px)

### Scenario: medium initial state
1. Then I should should see at least one nav link
1. And I should see the text "More"

### Scenario: medium open
1. When I click the text "More"
1. Then I should see all nav links that were not previously visible in a dropdown 

### Scenario: more-text prop
1. When I change the value of the "MoreText" form field to "Mas"
1. Then I should see the text "Mas"
1. And I should NOT see the text "More"


## Background: xxxlarge breakpoint
1. Given I am viewing the URL /pattern-lab/?p=components-navbar-docs
1. And the viewer is wider than the xxxlarge breakpoint (~1920px)

### Scenario: xxxlarge initial state
1. Then I should should see all the nav links
1. And I should NOT see a chevron down icon
1. And I should NOT see the text "More"
