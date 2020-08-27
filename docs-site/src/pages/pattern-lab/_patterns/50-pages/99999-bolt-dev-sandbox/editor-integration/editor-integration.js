// import './ck4-format-plugin';
// https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Importing this way webpack takes a LONG time to compile and sometimes run out of memory.
// console.log(ClassicEditor) // => undefined, @todo why does this work outside of PL but not here? Loading from CDN for now.

// CKEditor 5
if (typeof window.ClassicEditor !== 'undefined') {
  window.ClassicEditor.create(document.querySelector('#editor-classic'), {
    heading: {
      options: [
        // { model: 'paragraph', view: 'bolt-text', title: 'Paragraph' },
        {
          model: 'paragraphCustom',
          view: {
            name: 'bolt-text',
            attributes: { 'ck-custom': true }, // must have *some* attribute, otherwise matches other 'bolt-text' elements first
          },
          title: 'Paragraph',
        },
        {
          model: 'headline1',
          view: {
            name: 'bolt-text',
            attributes: { headline: true, 'font-size': 'xxxlarge', tag: 'h1' },
          },
          title: 'Headline xxxlarge h1',
        },
        {
          model: 'headline2',
          view: {
            name: 'bolt-text',
            attributes: { headline: true, 'font-size': 'xxlarge', tag: 'h2' },
          },
          title: 'Headline xxlarge h2',
        },
        {
          model: 'headline3',
          view: {
            name: 'bolt-text',
            attributes: { headline: true, 'font-size': 'xlarge', tag: 'h3' },
          },
          title: 'Headline xlarge h3',
        },
        {
          model: 'headline4',
          view: {
            name: 'bolt-text',
            attributes: { headline: true, 'font-size': 'large', tag: 'h4' },
          },
          title: 'Headline large h4',
        },
        {
          model: 'headline5',
          view: {
            name: 'bolt-text',
            attributes: { headline: true, 'font-size': 'small', tag: 'h5' },
          },
          title: 'Headline small h5',
        },
        {
          model: 'headline6',
          view: {
            name: 'bolt-text',
            attributes: { headline: true, 'font-size': 'xsmall', tag: 'h6' },
          },
          title: 'Headline xsmall h6',
        },
        {
          model: 'subheadline1',
          view: {
            name: 'bolt-text',
            attributes: { subheadline: true, 'font-size': 'xxlarge', tag: 'p' },
          },
          title: 'Subheadline xxlarge',
        },
        {
          model: 'subheadline2',
          view: {
            name: 'bolt-text',
            attributes: { subheadline: true, 'font-size': 'xlarge', tag: 'p' },
          },
          title: 'Subheadline xlarge',
        },
        {
          model: 'subheadline3',
          view: {
            name: 'bolt-text',
            attributes: { subheadline: true, 'font-size': 'large', tag: 'p' },
          },
          title: 'Subheadline large',
        },
        {
          model: 'eyebrow',
          view: { name: 'bolt-text', attributes: { eyebrow: true, tag: 'p' } },
          title: 'Eyebrow',
        },
        {
          model: 'link',
          view: { name: 'bolt-text', attributes: { eyebrow: true, tag: 'a' } },
          title: 'Link',
        },
        { model: 'blockquote', view: 'bolt-blockquote', title: 'Blockquote' },
        // {
        //   model: 'ordered-list',
        //   view: 'bolt-ordered-list',
        //   title: 'Ordered list',
        // },
        // {
        //   model: 'unordered-list',
        //   view: 'bolt-unordered-list',
        //   title: 'Unordered list',
        // },
        // { model: 'code', view: 'bolt-code-snippet', title: 'Code snippet' },
      ],
    },
  }).catch(error => {
    console.error(error);
  });
}

// CKEditor 4
if (typeof window.CKEDITOR !== 'undefined') {
  window.CKEDITOR.replace('editor1', {
    height: 280,
    // Adding a custom stylesheet with some additional styles for text formats.
    // Default CKEditor styles are included as well to avoid copying default styles.
    contentsCss: [
      '/pattern-lab/build/bolt-global.css',
      '/pattern-lab/build/bolt-global-en.css', // for staging build
      'body { margin: 8px; }',
    ],
    // removePlugins: 'format',
    // extraPlugins: 'format-custom',
    // format_tags: 'p;h1;h2;pre;div;bolt-text',
    // format_bolt_text: {
    //   element: 'bolt-text',
    //   name: 'Custom Paragraph',
    //   attributes: { 'ck-custom': 'true' },
    // },
    // format_bolt_text: { element: 'bolt-text', name: 'bolt' },
  });

  window.CKEDITOR.stylesSet.add('my_styles', [
    // Block-level styles
    {
      name: 'Custom Paragraph',
      element: 'bolt-text',
      attributes: { 'ck-custom': true }, // must have *some* attribute, otherwise matches other 'bolt-text' elements first
    },
    {
      name: 'Headline xxxlarge h1',
      element: 'bolt-text',
      attributes: { headline: true, 'font-size': 'xxxlarge', tag: 'h1' },
    },
    {
      name: 'Headline xxlarge h2',
      element: 'bolt-text',
      attributes: { headline: true, 'font-size': 'xxlarge', tag: 'h2' },
    },
    {
      name: 'Headline xlarge h3',
      element: 'bolt-text',
      attributes: { headline: true, 'font-size': 'xlarge', tag: 'h3' },
    },
    {
      name: 'Headline large h4',
      element: 'bolt-text',
      attributes: { headline: true, 'font-size': 'large', tag: 'h4' },
    },
    {
      name: 'Headline small h5',
      element: 'bolt-text',
      attributes: { headline: true, 'font-size': 'small', tag: 'h5' },
    },
    {
      name: 'Headline xsmall h6',
      element: 'bolt-text',
      attributes: { headline: true, 'font-size': 'xsmall', tag: 'h6' },
    },
    {
      name: 'Subheadline xxlarge',
      element: 'bolt-text',
      attributes: { subheadline: true, 'font-size': 'xxlarge', tag: 'p' },
    },
    {
      name: 'Subheadline xlarge',
      element: 'bolt-text',
      attributes: { subheadline: true, 'font-size': 'xlarge', tag: 'p' },
    },
    {
      name: 'Subheadline large',
      element: 'bolt-text',
      attributes: { subheadline: true, 'font-size': 'large', tag: 'p' },
    },
    {
      name: 'Eyebrow',
      element: 'bolt-text',
      attributes: { eyebrow: true, tag: 'p' },
    },
    {
      name: 'Link',
      element: 'bolt-text',
      attributes: { eyebrow: true, tag: 'a' },
    },
    {
      name: 'Blockquote',
      element: 'bolt-blockquote',
    },
  ]);

  window.CKEDITOR.config.stylesSet = 'my_styles';
  // Need JS inside Iframe, but get this error:
  // Uncaught (in promise) DOMException: Failed to execute 'define' on 'CustomElementRegistry': this name has already been used with this registry
  // window.CKEDITOR.scriptLoader.load('/pattern-lab/build/bolt-global.js');
}
