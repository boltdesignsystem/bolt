## Demo: Disable Filtering Search Results {id=disable-search-filtering}

In this example, we manually disable the Typeahead component's default internal filtering of results and instead return back exactly the data from the server.

This config option can be enabled via the `no-filter` Web Component prop or setting the `no_filter` config option to true in the Twig template.

> NOTE: sorting the results can _also_ be disabled via the `no-sort` Web Component prop or by setting the `no_sort` prop in Twig!

This demo also shows how complex data can get mapped to search results + custom rendered!