
/**
 * On media change call callback with matches argument
 */
export function matchMedia( mediaQuery: string, callback: ( matches: boolean ) => void ): () => void {

  function handleMediaChange( mql: MediaQueryList ) {

    callback( mql.matches );

  }

  const mql = window.matchMedia( mediaQuery );
  mql.addListener( handleMediaChange );

  // Call manually to get initial state
  handleMediaChange( mql );

  return () => mql.removeListener( handleMediaChange );

}
