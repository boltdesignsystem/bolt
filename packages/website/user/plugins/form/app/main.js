import $ from 'jquery';
import Dropzone from 'dropzone';
import { config, translations } from 'grav-form';

let request = {};

// translations
const Dictionary = {
    dictCancelUpload: translations.PLUGIN_FORM.DROPZONE_CANCEL_UPLOAD,
    dictCancelUploadConfirmation: translations.PLUGIN_FORM.DROPZONE_CANCEL_UPLOAD_CONFIRMATION,
    dictDefaultMessage: translations.PLUGIN_FORM.DROPZONE_DEFAULT_MESSAGE,
    dictFallbackMessage: translations.PLUGIN_FORM.DROPZONE_FALLBACK_MESSAGE,
    dictFallbackText: translations.PLUGIN_FORM.DROPZONE_FALLBACK_TEXT,
    dictFileTooBig: translations.PLUGIN_FORM.DROPZONE_FILE_TOO_BIG,
    dictInvalidFileType: translations.PLUGIN_FORM.DROPZONE_INVALID_FILE_TYPE,
    dictMaxFilesExceeded: translations.PLUGIN_FORM.DROPZONE_MAX_FILES_EXCEEDED,
    dictRemoveFile: translations.PLUGIN_FORM.DROPZONE_REMOVE_FILE,
    dictRemoveFileConfirmation: translations.PLUGIN_FORM.DROPZONE_REMOVE_FILE_CONFIRMATION,
    dictResponseError: translations.PLUGIN_FORM.DROPZONE_RESPONSE_ERROR
};

Dropzone.autoDiscover = false;

const DropzoneMediaConfig = {
    createImageThumbnails: { thumbnailWidth: 150 },
    addRemoveLinks: false,
    dictDefaultMessage: Dictionary.dictDefaultMessage,
    dictRemoveFileConfirmation: Dictionary.dictRemoveFileConfirmation,
    previewTemplate: `
        <div class="dz-preview dz-file-preview">
      <div class="dz-image"><img data-dz-thumbnail /></div>

      <div class="dz-details">
        <div class="dz-size"><span data-dz-size></span></div>
        <div class="dz-filename"><span data-dz-name></span></div>
      </div>
      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>



      <div class="dz-success-mark">

        <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
          <!-- Generator: Sketch 3.2.1 (9971) - http://www.bohemiancoding.com/sketch -->
          <title>Check</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
              <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>
          </g>
        </svg>
      
      </div>
      <div class="dz-error-mark">

        <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
            <!-- Generator: Sketch 3.2.1 (9971) - http://www.bohemiancoding.com/sketch -->
            <title>error</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">
                    <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>
                </g>
            </g>
        </svg>
      </div>
    </div>`.trim()
};

export default class FilesField {
    constructor({ container = '.dropzone.files-upload', options = {} } = {}) {
        this.container = $(container);
        if (!this.container.length) { return; }

        this.urls = {};
        this.options = Object.assign({}, Dictionary, DropzoneMediaConfig, {
            klass: this,
            url: this.container.data('file-url-add') || config.current_url,
            acceptedFiles: this.container.data('media-types'),
            init: this.initDropzone
        }, this.container.data('dropzone-options'), options);

        this.dropzone = new Dropzone(container, this.options);
        this.dropzone.on('complete', this.onDropzoneComplete.bind(this));
        this.dropzone.on('success', this.onDropzoneSuccess.bind(this));
        this.dropzone.on('removedfile', this.onDropzoneRemovedFile.bind(this));
        this.dropzone.on('sending', this.onDropzoneSending.bind(this));
        this.dropzone.on('error', this.onDropzoneError.bind(this));
    }

    initDropzone() {
        let files = this.options.klass.container.find('[data-file]');
        let dropzone = this;
        if (!files.length) { return; }

        files.each((index, file) => {
            file = $(file);
            let data = file.data('file');
            let mock = {
                name: data.name,
                size: data.size,
                type: data.type,
                status: Dropzone.ADDED,
                accepted: true,
                url: this.options.url,
                removeUrl: data.remove
            };

            dropzone.files.push(mock);
            dropzone.options.addedfile.call(dropzone, mock);
            if (mock.type.match(/^image\//)) dropzone.options.thumbnail.call(dropzone, mock, data.path);

            file.remove();
        });
    }

    onDropzoneSending(file, xhr, formData) {
        formData.append('__form-name__', this.container.closest('form').find('[name="__form-name__"]').val());
        formData.append('__form-file-uploader__', 1);
        formData.append('name', this.options.dotNotation);
        formData.append('form-nonce', config.form_nonce);
        formData.append('task', 'filesupload');
    }

    onDropzoneSuccess(file, response, xhr) {
        if (this.options.reloadPage) {
            global.location.reload();
        }

        // store params for removing file from session before it gets saved
        if (response.session) {
            file.sessionParams = response.session;
            file.removeUrl = this.options.url;

            // Touch field value to force a mutation detection
            const input = this.container.find('[name][type="hidden"]');
            const value = input.val();
            input.val(value + ' ');
        }

        return this.handleError({
            file,
            data: response,
            mode: 'removeFile',
            msg: `<p>${translations.PLUGIN_FORM.FILE_ERROR_UPLOAD} <strong>${file.name}</strong></p>
            <pre>${response.message}</pre>`
        });
    }

    onDropzoneComplete(file) {
        if (!file.accepted && !file.rejected) {
            let data = {
                status: 'error',
                message: `${translations.PLUGIN_FORM.FILE_UNSUPPORTED}: ${file.name.match(/\..+/).join('')}`
            };

            return this.handleError({
                file,
                data,
                mode: 'removeFile',
                msg: `<p>${translations.PLUGIN_FORM.FILE_ERROR_ADD} <strong>${file.name}</strong></p>
                <pre>${data.message}</pre>`
            });
        }

        if (this.options.reloadPage) {
            global.location.reload();
        }
    }

    onDropzoneRemovedFile(file, ...extra) {
        if (!file.accepted || file.rejected) { return; }
        let url = file.removeUrl || this.urls.delete;
        let path = (url || '').match(/path:(.*)\//);
        let body = { filename: file.name };

        if (file.sessionParams) {
            body.task = 'filessessionremove';
            body.session = file.sessionParams;
        }

        request(url, { method: 'post', body }, () => {
            if (!path) { return; }

            path = global.atob(path[1]);
            let input = this.container.find('[name][type="hidden"]');
            let data = JSON.parse(input.val() || '{}');
            delete data[path];
            input.val(JSON.stringify(data));
        });
    }

    onDropzoneError(file, response, xhr) {
        let message = xhr && response.error ? response.error.message : response;
        $(file.previewElement).find('[data-dz-errormessage]').html(message);

        return this.handleError({
            file,
            data: { status: 'error' },
            msg: `<pre>${message}</pre>`
        });
    }

    handleError(options) {
        return true;
        /* let { file, data, mode, msg } = options;
        if (data.status !== 'error' && data.status !== 'unauthorized') { return; }

        switch (mode) {
            case 'addBack':
                if (file instanceof File) {
                    this.dropzone.addFile.call(this.dropzone, file);
                } else {
                    this.dropzone.files.push(file);
                    this.dropzone.options.addedfile.call(this.dropzone, file);
                    this.dropzone.options.thumbnail.call(this.dropzone, file, file.extras.url);
                }

                break;
            case 'removeFile':
            default:
                if (~this.dropzone.files.indexOf(file)) {
                    file.rejected = true;
                    this.dropzone.removeFile.call(this.dropzone, file, { silent: true });
                }

                break;
        }

        let modal = $('[data-remodal-id="generic"]');
        modal.find('.error-content').html(msg);
        $.remodal.lookup[modal.data('remodal')].open(); */
    }
}

export function UriToMarkdown(uri) {
    uri = uri.replace(/@3x|@2x|@1x/, '');
    uri = uri.replace(/\(/g, '%28');
    uri = uri.replace(/\)/g, '%29');

    return uri.match(/\.(jpe?g|png|gif|svg)$/i) ? `![](${uri})` : `[${decodeURI(uri)}](${uri})`;
}

let instances = [];
let cache = $();
const onAddedNodes = (event, target/* , record, instance */) => {
    let files = $(target).find('.dropzone.files-upload');
    if (!files.length) { return; }

    files.each((index, file) => {
        file = $(file);
        if (!~cache.index(file)) {
            addNode(file);
        }
    });
};

const addNode = (container) => {
    container = $(container);
    let input = container.find('input[type="file"]');
    let settings = container.data('grav-file-settings') || {};

    if (settings.accept && ~settings.accept.indexOf('*')) {
        settings.accept = [''];
    }

    let options = {
        url: container.data('file-url-add') || (container.closest('form').attr('action') || config.current_url) + '.json',
        paramName: settings.paramName || 'file',
        dotNotation: settings.name || 'file',
        acceptedFiles: settings.accept ? settings.accept.join(',') : input.attr('accept') || container.data('media-types'),
        maxFilesize: settings.filesize || 256,
        maxFiles: settings.limit || null
    };

    cache = cache.add(container);
    container = container[0];
    instances.push(new FilesField({ container, options }));
};

export let Instances = (() => {
    $('.dropzone.files-upload').each((i, container) => addNode(container));
    $('body').on('mutation._grav', onAddedNodes);

    return instances;
})();

