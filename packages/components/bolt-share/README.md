Share block. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-share
```

## Description:
The share component provides the user a visual queue to share the content with relevant peers, as well as an easy mechanism to actively do the sharing.

## Share Link Notes:
* The only currently supported share methods are:
  * Facebook
  * Twitter
  * LinkedIn
  * Email
  * Copy to Clipboard (component)
* **Facebook** only needs `u` (URL) to scrap the page's OG Tags
* **Twitter** Needs at least one of the following query vars:
  * `url` (recommended -- URL included with the Twee)
  * `text` (recommended -- re-populated text highlighted in the Tweet composer)
  * `via` (Attribute the source of a Tweet to a Twitter username, no `@` needed)
  * `hashtags` (A comma-separated list of hashtags to be appended to default Tweet text)
* **LinkedIn** only needs `url` to scrap the page's OG Tags, but also can include:
  * `title`
  * `summary`
  * `source`
* **Email** Recommended query vars:
  * `subject`
  * `body`

## Best practices
* Don't use the share tool with a page's related sections
* Implement any "stickiness" and placement functionality on the platform the component is being used in
* For larger screens, ease-in opacity from 0% to 100% on scroll. The placement should be lower right-hand side and fixed until the main page content is scrolled pass
* Don't have the fixed position of the component overlap any "related content"