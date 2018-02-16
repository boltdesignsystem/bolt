Band is a panel with vertical spacing. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-band
```

Description:
Bands are full width sections that go edge to edge of the display and typically denote a collective section of a page. Bands can contain many page elements and components.

Bands also define what theme the contents follow. For example, a dark theme with have an indigo background with a yellow primary button. 

Bands are defined content areas where content hangs together. 

Dos:
* Are full width
* Are xlight, light, dark, xdark
* Optionally include a background image (see background) 
* Optionally can include a gradient
* Has grid set inside of it
* Can have many components inside of it like teaser on one side and card on the other with background shapes behind the card
* Make sure the content inside a band hangs together

Don'ts:
* Introduce content in a band that doesn't hang with other content
* Don't have a band not be full width
