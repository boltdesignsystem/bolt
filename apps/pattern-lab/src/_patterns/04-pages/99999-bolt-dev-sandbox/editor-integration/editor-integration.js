// https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Importing this way webpack takes a LONG time to compile and sometimes run out of memory.
// console.log(ClassicEditor) // => undefined, @todo why does this work outside of PL but not here? Loading from CDN for now.

if (typeof window.ClassicEditor !== 'undefined') {
  window.ClassicEditor
  .create( document.querySelector( '#editor-classic' ), {
    heading: {
      options: [
        { model: 'paragraph', view: 'bolt-text', title: 'Paragraph' },
        { model: 'headline1', view: { name: 'bolt-text', attributes: { headline: true, 'font-size': 'xxxlarge', tag: 'h1' } }, title: 'Headline xxxlarge h1' },
        { model: 'headline2', view: { name: 'bolt-text', attributes: { headline: true, 'font-size': 'xxlarge', tag: 'h2' } }, title: 'Headline xxlarge h2' },
        { model: 'headline3', view: { name: 'bolt-text', attributes: { headline: true, 'font-size': 'xlarge', tag: 'h3' } }, title: 'Headline xlarge h3' },
        { model: 'headline4', view: { name: 'bolt-text', attributes: { headline: true, 'font-size': 'large', tag: 'h4' } }, title: 'Headline large h4' },
        { model: 'headline5', view: { name: 'bolt-text', attributes: { headline: true, 'font-size': 'small', tag: 'h5' } }, title: 'Headline small h5' },
        { model: 'headline6', view: { name: 'bolt-text', attributes: { headline: true, 'font-size': 'xsmall', tag: 'h6' } }, title: 'Headline xsmall h6' },
        { model: 'subheadline1', view: { name: 'bolt-text', attributes: { subheadline: true, 'font-size': 'xxlarge', tag: 'p' } }, title: 'Subheadline xxlarge', },
        { model: 'subheadline2', view: { name: 'bolt-text', attributes: { subheadline: true, 'font-size': 'xlarge', tag: 'p' } }, title: 'Subheadline xlarge', },
        { model: 'subheadline3', view: { name: 'bolt-text', attributes: { subheadline: true, 'font-size': 'large', tag: 'p' } }, title: 'Subheadline large', },
        { model: 'eyebrow', view: { name: 'bolt-text', attributes: { eyebrow: true, tag: 'p' } }, title: 'Eyebrow' },
        { model: 'link', view: { name: 'bolt-text', attributes: { eyebrow: true, tag: 'a' } }, title: 'Link' },
        { model: 'blockquote', view: 'bolt-blockquote', title: 'Blockquote' },
        { model: 'ordered-list', view: 'bolt-ordered-list', title: 'Ordered list' },
        { model: 'unordered-list', view: 'bolt-unordered-list', title: 'Unordered list' },
        { model: 'code', view: 'bolt-code-snippet', title: 'Code snippet' },
      ]
    }
  } )
  .catch( error => {
    console.error( error );
  } );
}

// InlineEditor
// .create( document.querySelector( '#editor-inline' ) )
// .catch( error => {
//   console.error( error );
// } );

// BalloonEditor
// .create( document.querySelector( '#editor-balloon' ) )
// .catch( error => {
//   console.error( error );
// } );
