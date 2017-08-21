describe( "Quote Component", function () {
    before( function () {
        browser.url( "/tests/quote" );
        return browser;
    } );

    it( "should look like baseline", function () {
        return browser
            .compareScreen( "quote", {
                name: "component",
                elem: ".quote--component",
                screenWidth: [ 600 ]
            } );
    } );

} );
