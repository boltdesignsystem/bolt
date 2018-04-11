---
title: Colors
---
We use color to express our brand, and to support or emphasize key messages within the interface. The thoughtful use of color in our Digital experiences is critical to creating compelling and informative content. 

# Best Practices
## Use color to communicate, not just to decorate.

Color should have a clear hierarchy to help focus the user’s attention or to support optimal legibility. While color can be used creatively to express the brand, avoid relying on color to convey key information on the page.

## Accessibility is not optional. 

Pega websites need to to meet all web accessibility standards, including the minimum contrast ratios that the WCAG 2.0 specifies for text and background colors according to their AA level.

# Brand colors

Whenever possible, lead with Indigo or White, and use the accent colors primarily as “pops” of color to add visual variety. Select colors, like orange and yellow, may also be used as calls to action or interactive elements, such as a Share button.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1520622319934_brand-colors.png)

# Color themes

Themes are specialized color combinations that allow you to be creative while still optimizing for legibility and contrast. Color themes are applied to the band component; once you select the appropriate theme, all elements within the band are updated to the correct color combination.

## x-dark and dark

Dark themes should be primarily used as a focal point on the page. They are commonly used as page heroes, or further down the page to call attention to an important section. As a rule of thumb, dark themes should take up no more than 20-30% of page real estate. 

![Use an x-dark band as the hero of a page, or as a small callout feature.](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1520626539852_band-xdark.png)

![Use a Dark band in the middle of the page to create a strong feature, or to provide a bit of contrast against  an X-Dark band.](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1520627110188_band-dark.png)

## light and x-light

Light themes are used to encapsulate larger amounts of information, and to help users absorb larger amounts of content. Use as the main body of the page, to present search results or cards, or to offset promotional messaging from a dark band. 

For body copy, such as articles, always use the x-light theme.

![A collection of 3 cards on a Light band](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1520861989630_band-light-cards.png)

![For long-form body copy, use an x-light band](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1520862101308_band-xlight-content.png)

# System status/messaging colors

Use status colors to indicate system information, success or error, or provide system warnings. Avoid using status colors in other contexts.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1520623547730_Status-colors.png)

# Color contrast | WCAG AA standards

All type/color combinations in Bolt must pass [**WCAG AA standards**](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) of 4.5:1 for normal text and 3:1 for large text. For larger text, if the font weight is light (300) or normal (400) the text should be no smaller than 24px. If the font weight is Semi-Bold (600) then the large text should be no smaller than 19px.

## Do

Minimal contrast ratio: 4.5

| ![1.0 White on Indigo](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646002492_White+on+Indigo.png) | ![1.1 Indigo on Yellow](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646002472_Indigo+on+Yellow.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| *1.0 White on Indigo*                                        | *1.1 Indigo on Yellow*                                       |
| ![1.2 Indigo on Gray](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646043013_Indigo+on+Gray.png) | ![1.3 Dark on White](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646043008_Dark+on+White.png) |
| *1.2 Indigo on Gray*                                         | *1.3 Dark on White*                                          |

## Don’t

WCAG Fail

| ![2.0 White on Teal](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646367591_White+on+Teal.png) | ![2.1 White on Yellow](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646367605_White+on+Yellow.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| *2.0 White on Teal*                                          | *2.1 White on Yellow*                                        |
| ![2.2 Dark on Gray](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646640088_Dark+on+Gray.png) | ![2.3 White on Dark](https://d2mxuefqeaa7sj.cloudfront.net/s_20FB1E9CE7575F11BF3A48959741CD9B0CFEC13FE431F3F9FCDE7443B3435F8B_1521646640094_White+on+Dark.png) |
| *2.2 Dark on Gray*                                           | *2.3 White on Dark*                                          |