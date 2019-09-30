Share block. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

###### Install via NPM

```
npm install @bolt/components-share
```

## Description
The share component provides the user a visual queue to share the content with relevant peers, as well as an easy mechanism to actively do the sharing.

## OG Tags

* **OG tags <u>MUST</u> be present for share functionality to work correctly (see example below)**
* The only currently supported share methods are:
  * Facebook
  * Twitter
  * LinkedIn
  * Email
  * Copy to Clipboard (component)
* **Facebook** only needs `u` (URL) to scrap the page's OG Tags
  * <u>Facebook Sharing API resources</u>: <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog#params_share" target="_blank">https://developers.facebook.com/docs/sharing/reference/share-dialog#params_share</a>
  * <u>Facebook Open Graph Debuger</u>: <a href="https://developers.facebook.com/tools/debug/" target="_blank">https://developers.facebook.com/tools/debug/</a>
* **Twitter** Needs at least one of the following query vars:
  * `url` (recommended -- URL included with the Twee)
  * `text` (recommended -- re-populated text highlighted in the Tweet composer)
  * `via` (Attribute the source of a Tweet to a Twitter username, no `@` needed)
  * `hashtags` (A comma-separated list of hashtags to be appended to default Tweet text)
    * <u>Twitter Tweet API resources</u>: <a href="https://dev.twitter.com/web/tweet-button/parameters#tweet-content-parameters" target="_blank">https://dev.twitter.com/web/tweet-button/parameters#tweet-content-parameters</a>
    * <u>Twitter card validator</u>: <a href="https://cards-dev.twitter.com/validator" target="_blank">https://cards-dev.twitter.com/validator</a>
* **LinkedIn** only needs `url` to scrap the page's OG Tags, but also can include:
  * `title`
  * `summary`
  * `source`
    * <u>LinkedIn Sharing API resources</u>: <a href="https://developer.linkedin.com/docs/share-on-linkedin" target="_blank">https://developer.linkedin.com/docs/share-on-linkedin</a> (click "Customized URL")
* **Email** Recommended query vars:
  * `subject`
  * `body`
* When passing in a page title or URL as a parameter of an overall URL (as with the social share and email links), remember to run it through urlencode(), or special character (particularly ampersands) may be interpreted as part of the overall URL instead.

### Example

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="Bolt Design System: Page Title" />
<meta property="og:description" content="Sample description" />
<meta property="og:image" content="https://boltdesignsystem.com/images/500x500-480.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="480" />
<meta property="og:image:height" content="480" />
<meta property="og:url" content="https://boltdesignsystem.com/some-page-title-here" />
<meta property="og:site_name" content="Bolt Design System" />
<!-- Twitter specific tags -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Bolt Design System: Page Title" />
<meta name="twitter:description" content="Sample description" />
<meta name="twitter:image" content="https://boltdesignsystem.com/images/500x500-480.jpg" />
<meta name="twitter:site" content="@pega" />
```

## Best Practices

* Don't use the share tool with a page's related sections
* Implement any "stickiness" and placement functionality on the platform the component is being used in
* For larger screens, ease-in opacity from 0% to 100% on scroll. The placement should be lower right-hand side and fixed until the main page content is scrolled pass
* Don't have the fixed position of the component overlap any "related content"
