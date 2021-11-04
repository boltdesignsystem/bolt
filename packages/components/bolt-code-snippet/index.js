const codeSnippets = document.querySelectorAll('.c-bolt-code-snippet');

if (codeSnippets.length) {
  import(/* webpackChunkName: 'bolt-code-snippet' */ './src/code-snippet').then(
    ({ BoltCodeSnippet }) => {
      codeSnippets.forEach(el => {
        // Workaround for Bolt Table...
        // Table stringifies the DOM, losing any event binding setup by the Code Snippet component.
        // So, we don't init any Code Snippets inside tables and let the Table component init them itself when it's ready.
        if (!el.closest('bolt-table')) {
          const codeSnippetComponent = new BoltCodeSnippet(el);
        }
      });
    },
  );
}
