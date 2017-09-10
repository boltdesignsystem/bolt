export declare type ClickHandler = typeof HTMLElement.prototype.onclick;
export declare type FocusHandler = typeof HTMLElement.prototype.onfocus;
export declare type BlurHandler = typeof HTMLElement.prototype.onblur;
export declare type KeyupHandler = typeof HTMLElement.prototype.onkeyup;
export declare type CustomChangeHandler<T> = (event: CustomChangeEvent<T>) => any;
export declare type CustomChangeEvent<T> = CustomEvent & {
    detail: {
        value: T;
    };
};
