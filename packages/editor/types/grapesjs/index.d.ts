declare module '*.yml';

interface Window {
  HTMLLinkElement: typeof HTMLLinkElement;
}

interface GrapeTrait {
  type: 'text' | 'select' | 'checkbox' | 'number' | 'color';
  label?: string;
  name: string;
  default?: any;
  options?: Array<string | {
    value: string;
    name: string;
  }>;
}

declare module 'grapesjs' {
  export function init(config: EditorConfig): Editor;

  /**
   * @link https://github.com/artf/grapesjs/blob/master/src/editor/config/config.js
   */
  export interface EditorConfig {
    stylePrefix?: string;
    components?: string;
    style?: string;
    fromElement?: boolean;
    /** Show an alert before unload the page with unsaved changes */
    noticeOnUnload?: boolean;
    showOffsets?: boolean;
    showOffsetsSelected?: boolean;
    forceClass?: boolean;
    height?: string;
    width?: string;
    log?: Array<'debug' | 'info' | 'warning' | 'error'> | Array<string>;
    baseCss?: string;
    protectedCss?: string;
    canvasCss?: string;
    defaultCommand?: string;
    showToolbar?: boolean;
    allowScripts?: boolean;
    showDevices?: boolean;
    devicePreviewMode?: boolean;
    mediaCondition?: string;
    tagVarStart?: string;
    tagVarEnd?: string;
    keepEmptyTextNodes?: boolean;
    jsInHtml?: boolean;
    nativeDnD?: boolean;
    multipleSelection?: boolean;
    exportWrapper?: boolean;
    wrappesIsBody?: boolean;
    avoidInlineStyle?: boolean;
    avoidDefaults?: boolean;
    clearStyles?: boolean;
    container?: HTMLElement | Element | string;
    undoManager?: object;
    plugins?: Array<(editor: Editor) => void>;
    assetManager?: AssetManagerConfig | object;
    canvas?: CanvasConfig;
    layers?: object;
    storageManager?: StorageManagerConfig | object;
    // rte?: RichtTextEditorConfig | object;
    // domComponents?: DomComponentsConfig | object;
    modal?: ModalConfig | object;
    // codeManager?: CodeManagerConfig | object;
    panels?: PanelsConfig;
    // commands?: CommandsConfig | object;
    // cssComposer?: CssComposerConfig | object;
    // selectorManager?: SelectorManagerConfig | object;
    // deviceManager?: DeviceManagerConfig | object;
    styleManager?: StyleManagerConfig | object;
    blockManager?: {
      appendTo?: HTMLElement | string;
      blocks: BlockOptions[];
    }
    traitManager?: TraitManagerConfig | object;
    textViewCode?: string;
    keepUnusedStyles?: boolean;
    multiFrames?: boolean;
  }

  export class Editor {
    DomComponents: DomComponents;
    BlockManager: BlockManager;
    Panels: Panels;
    Modal: Modal;
    getHtml(): string;
    destroy(): void;
    /** Total unsaved changes */
    getDirtyCount(): number;
    getContainer(): HTMLElement;
    getComponents(): Array<object>;
    on(event: GrapesEvent, callback: Function): Editor;
  }

  interface Panels {
    removeButton: (panelId: string, buttonId) => void;
    addButton: (panelId: string, button: PanelButtonConfig) => void;
  }

  /**
   * @link https://grapesjs.com/docs/api/component.html#component
   * */
  interface ComponentObject {
    type?: string;
    tagName?: string;
    /** Indicates if it's possible to drag the component inside others. You can also specify a query string to indentify elements, eg. '.some-class[title=Hello], [data-gjs-type=column]' means you can drag the component only inside elements containing some-class class and Hello title, and column components. */
    draggable?: boolean | string;
    /** Indicates if it's possible to drop other components inside. You can use a query string as with draggable */
    droppable?: boolean | string;
    /** Indicates if its possible to highlight the component through the gui while editing */
    highlightable?: boolean;
    resizable?: boolean;
    // Allow to edit the content of the component (used on Text components). Default: false
    editable?: boolean;
    // can copy/paste; default `true`
    copyable?: boolean;
    // Content of the component (not escaped) which will be appended before children rendering. Default: ''
    // If the badge is visible when the component is selected
    badgable?: boolean;
    content?: string;
    script?: string | Function;
    // https://grapesjs.com/docs/modules/Traits.html
    traits?: Array<string | GrapeTrait>;
    // becomes HTML attributes
    attributes?: {};
    // Set an array of items to show up inside the toolbar when the component is selected (move, clone, delete). Eg. toolbar: [ { attributes: {class: 'fa fa-arrows'}, command: 'tlb-move' }, ... ]. By default, when toolbar property is falsy the editor will add automatically commands like move, delete, etc. based on its properties.
    toolbar?: {}[];
    components?: Array<ComponentObject | string>;
  }

  interface DomComponents {
    name: string;
    addType(
      type: string,
      methods: {
        // name of component to extend. default: `'default'`
        extend?: string;
        extendView?: string;
        isComponent?: (el: HTMLElement) => boolean;
        model: {
          defaults: ComponentObject;
          // executed once the model of the component is initiliazed
          init?: () => void;
          // executes when some property of the model is updated.
          updated?: (
            property: string,
            value: string,
            prevValue: string,
          ) => void;
          // executed when the component is removed.
          removed?: () => void;
        };
        view?: {
          // executed once the view of the component is initiliazed
          init?: () => void;
          // executed once the component is rendered on the canvas
          onRender?: () => void;
          events?: {
            // just an example of a single event, can add any
            click?: (event: Event) => void;
            // must return `this`
            render?: () => void;
          };
        };
      },
    ): void;
    getType(type: string): any;
  }

  interface BlockOptions {
    label: string;
    content: string | ComponentObject;
    // selects it right after adding it so you can edit traits right away
    select?: boolean;
    category?: string | object;
    // activate it - needs more details. can best be seen by adding the `img` block
    activate?: boolean;
    attributes?: object;
    // https://grapesjs.com/docs/modules/Blocks.html#custom-render
    render?: ({
      model: { },
      className: string,
      el: HTMLElement,
    }) => string | void;
  }

  interface BlockManager {
    add(id: string, opt: BlockOptions): void;
  }

  interface StorageManagerConfig {
    id?: string;
    autosave?: boolean;
    autoload?: boolean;
    type?: "local" | "remote" | "null";
    stepsBeforeSave?: number;
    storeComponents?: boolean;
    storeStyles?: boolean;
    storeHtml?: boolean;
    storeCss?: boolean;
    checkLocal?: boolean;
    params?: object;
    headers?: object;
    urlStore?: string;
    urlLoad?: string;
    contentTypeJson?: boolean;
    credentials?: RequestCredentials;

    beforeSend(jqXHR: any, settings: object): void;
    onComplete(jqXHR: any, status: any): void;
  }

  interface StyleManagerConfig {
    stylePrefix?: string;
    sectors?: Array<object>;
    appendTo?: HTMLElement | string;
    textNoElement?: string;
    hideNotStylable?: boolean;
    highlightChanged?: boolean;
    highlightComputed?: boolean;
    showComputed?: boolean;
    clearProperties?: boolean;
    avoidComputed?: Array<string>;
  }

  interface AssetManagerConfig {
    assets?: Array<object | string>;
    noAssets?: string;
    stylePrefix?: string;
    upload?: boolean;
    uploadName?: string;
    headers?: object;
    params?: object;
    credentials?: RequestCredentials;
    multiUpload?: boolean;
    autoAdd?: boolean;
    uploadText?: string;
    addBtnText?: string;
    customFetch?: Function;
    uploadFile?: Function;
    embedAsBase64?: boolean;
    handleAdd?: Function;
    dropzone?: boolean;
    openAssetsOnDrop?: number;
    dropzoneContent?: string;
    modalTitle?: string;
    inputPlaceholder?: string;
  }

  interface CanvasConfig {
    stylePrefix?: string;
    scripts?: Array<string>;
    styles?: Array<string>;
    customBadgeLabel?: Function;
    autoscrollLimit?: number;
    notTextable?: Array<string>;
  }

  interface PanelsConfig {
    stylePrefix?: string;
    defaults?: {
      id: string;
      el: string | HTMLElement;
      resizable?: Resizable;
      buttons?: PanelButtonConfig[];
    }[];
    em?: object;
    delayBtnsShow?: number;
  }

  type EditorFunction = (editor: Editor) => void;

  /**
   * @link https://grapesjs.com/docs/api/panels.html#addbutton
   */
  interface PanelButtonConfig {
    id: string;
    className?: string;
    command: string | EditorFunction | {
      run: EditorFunction;
      stop: EditorFunction;
    };
    active?: boolean;
    /** set `title` to get tooltip */
    attributes?: {};
    togglable?: boolean;
    label?: string;
  }

  /**
   * @link https://github.com/artf/grapesjs/blob/master/src/utils/Resizer.js#L4
   * Can also be a simple boolean
   */
  interface Resizable {
    /** Top left */
    tl?: boolean;
    /** Top center */
    tc?: boolean;
    /** Top right */
    tr?: boolean;
    /** Center left */
    cl?: boolean;
    /** Center right */
    cr?: boolean;
    /** Bottom left */
    bl?: boolean;
    /** Bottom center */
    bc?: boolean;
    /** Bottom right */
    br?: boolean;
    /** Default is 'width' */
    keyWidth?: string;
  }

  interface ModalConfig {
    stylePrefix?: string;
    title?: string;
    content?: string;
    backdrop?: boolean;
  }

  interface ModalOptions {
    title?: HTMLElement | string;
    content?: HTMLElement | string;
  }

  interface Modal {
    open(opts?: ModalOptions): Modal
    close(): Modal;
    isOpen(): Boolean;
    setTitle(title: string): Modal;
    getTitle(): string;
    setContent(content: HTMLElement | string): Modal;
    getContent(): string;
  }

  interface TraitManagerConfig {
    stylePrefix?: string;
    appendTo?: HTMLElement;
    labelContainer?: string;
    labelPlhText?: string;
    labelPlhRef?: string;
    optionsTarget?: Array<object>;
    textNoElement?: string;
  }

  type GrapesEvent =
    | ComponentEvent
    | BlockEvent
    | AssetEvent
    | KeymapEvent
    | StyleManagerEvent
    | StorageEvent
    | CanvasEvent
    | SelectorEvent
    | RichTextEditorEvent
    | ModalEvent
    | CommandEvent
    | GeneralEvent;

  type ComponentEvent =
    | 'component:create'
    | 'component:mount'
    | 'component:add'
    | 'component:remove'
    | 'component:clone'
    | 'component:update'
    | 'component:update:{propertyName}'
    | 'component:styleUpdate'
    | 'component:styleUpdate:{propertyName}'
    | 'component:selected'
    | 'component:deselected'
    | 'component:toggled';

  type BlockEvent =
    | 'block:add'
    | 'block:remove'
    | 'block:drag:start'
    | 'block:drag'
    | 'block:drag:stop';

  type AssetEvent =
    | 'asset:add'
    | 'asset:remove'
    | 'asset:upload:start'
    | 'asset:upload:end'
    | 'asset:upload:error'
    | 'asset:upload:response';

  type KeymapEvent =
    | 'keymap:add'
    | 'keymap:remove'
    | 'keymap:emit'
    | 'keymap:emit:{keymapId}';

  type StyleManagerEvent =
    | 'styleManager:update:target'
    | 'styleManager:change'
    | 'styleManager:change:{propertyName}';

  type StorageEvent =
    | 'storage:start'
    | 'storage:start:store'
    | 'storage:start:load'
    | 'storage:load'
    | 'storage:store'
    | 'storage:end'
    | 'storage:end:store'
    | 'storage:end:load'
    | 'storage:error'
    | 'storage:error:store'
    | 'storage:error:load';

  type CanvasEvent =
    | 'canvas:dragenter'
    | 'canvas:dragover'
    | 'canvas:drop'
    | 'canvas:dragend'
    | 'canvas:dragdata';

  type SelectorEvent = 'selector:add';

  type RichTextEditorEvent = 'rte:enable' | 'rte:disable';

  type ModalEvent = 'modal:open' | 'modal:close';

  type CommandEvent =
    | 'run:{commandName}'
    | 'stop:{commandName}'
    | 'run:{commandName}:before'
    | 'stop:{commandName}:before'
    | 'abort:{commandName}';

  type GeneralEvent = 'canvasScroll' | 'undo' | 'redo' | 'load';
}
