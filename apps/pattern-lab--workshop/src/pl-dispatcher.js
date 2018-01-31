// PL-specific workaround. Originally inlined in PL Styleguidekit -- moved to separate file for defer order behavior since not designed to be run asynchronously :(

window.Dispatcher = new EventEmitter();