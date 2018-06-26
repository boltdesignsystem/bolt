// boltSettings is a global variable designed to track settings that may be used multiple instances of the same
// component (or even different components).  Consumers may modify these settings at any time (either before or after
// the following code loads) by writing to window.boltSettings.

// Read the existing boltSettings, if any
boltSettings = window.boltSettings || {};

// Set default values only if these variables are not already set
boltSettings.smoothScrollOffset = window.boltSettings.smoothScrollOffset || 80;
boltSettings.gumshoeOffset = window.boltSettings.gumshoeOffset || boltSettings.smoothScrollOffset + 100;

// Write the result back to the global context.
window.boltSettings = boltSettings;
