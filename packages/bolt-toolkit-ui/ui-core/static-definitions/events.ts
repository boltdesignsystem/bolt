export type ClickHandler = typeof HTMLElement.prototype.onclick;
export type FocusHandler = typeof HTMLElement.prototype.onfocus;
export type BlurHandler = typeof HTMLElement.prototype.onblur;
export type KeyupHandler = typeof HTMLElement.prototype.onkeyup;

export type CustomChangeHandler<T> = ( event: CustomChangeEvent<T> ) => any;
export type CustomChangeEvent<T> = CustomEvent & { detail: { value: T } };
