<?php
namespace Grav\Plugin;

use Grav\Common\Data\Data;
use Grav\Common\Data\Blueprint;
use Grav\Common\Filesystem\Folder;
use Grav\Common\Grav;
use Grav\Common\Inflector;
use Grav\Common\Iterator;
use Grav\Common\Page\Page;
use Grav\Common\Utils;
use RocketTheme\Toolbox\Event\Event;

class Form extends Iterator implements \Serializable
{
    /**
     * @var string
     */
    public $message;

    /**
     * @var string
     */
    public $message_color;

    /**
     * @var string
     */
    public $status = 'success';

    /**
     * @var array
     */
    protected $header_data = [];

    /**
     * @var array
     */
    protected $rules = [];

    /**
     * Data values of the form (values to be stored)
     *
     * @var Data $data
     */
    protected $data;

    /**
     * Form header items
     *
     * @var Data $items
     */
    protected $items = [];

    /**
     * All the form data values, including non-data
     *
     * @var Data $values
     */
    protected $values;

    /**
     * The form page object
     *
     * @var Page $page
     */
    protected $page;

    /**
     * Create form for the given page.
     *
     * @param Page $page
     * @param null $name
     * @param null $form
     */
    public function __construct(Page $page, $name = null, $form = null)
    {
        parent::__construct();

        $this->page = $page->route();

        $header            = $page->header();
        $this->rules       = isset($header->rules) ? $header->rules : [];
        $this->header_data = isset($header->data) ? $header->data : [];

        if ($form) {
            $this->items = $form;
        } else {
            if (isset($header->form)) {
                $this->items = $header->form; // for backwards compatibility
            }
        }

        // Add form specific rules.
        if (!empty($this->items['rules']) && is_array($this->items['rules'])) {
            $this->rules += $this->items['rules'];
        }

        // Set form name if not set.
        if ($name && !is_int($name)) {
            $this->items['name'] = $name;
        } elseif (empty($this->items['name'])) {
            $this->items['name'] = $page->slug();
        }

        // Set form id if not set.
        if (empty($this->items['id'])) {
            $inflector = new Inflector();
            $this->items['id'] = $inflector->hyphenize($this->items['name']);
        }

        // Reset and initialize the form
        $this->reset();
    }

    /**
     * Custom serializer for this complex object
     *
     * @return string
     */
    public function serialize()
    {
        $data = [
            'items' => $this->items,
            'message' => $this->message,
            'message_color' => $this->message_color,
            'status' => $this->status,
            'header_data' => $this->header_data,
            'rules' => $this->rules,
            'data' => $this->data->toArray(),
            'values' => $this->values->toArray(),
            'page' => $this->page
        ];
        return serialize($data);
    }

    /**
     * Custom unserializer for this complex object
     *
     * @param string $data
     */
    public function unserialize($data)
    {
        $data = unserialize($data);

        $this->items = $data['items'];
        $this->message = $data['message'];
        $this->message_color = $data['message_color'];
        $this->status = $data['status'];
        $this->header_data = $data['header_data'];
        $this->rules = $data['rules'];

        $name = $this->items['name'];
        $items = $this->items;
        $rules = $this->rules;

        $blueprint  = function() use ($name, $items, $rules) {
            $blueprint = new Blueprint($name, ['form' => $items, 'rules' => $rules]);
            return $blueprint->load()->init();
        };

        $this->data = new Data($data['data'], $blueprint);
        $this->values = new Data($data['values']);
        $this->page = $data['page'];
    }

    /**
     * Allow overriding of fields
     *
     * @param $fields
     */
    public function setFields($fields)
    {
        $this->fields = $fields;
    }

    /**
     * Get the name of this form
     *
     * @return String
     */
    public function name()
    {
        return $this->items['name'];
    }

    /**
     * Reset data.
     */
    public function reset()
    {
        $name = $this->items['name'];
        $grav = Grav::instance();

        // Fix naming for fields (supports nested fields now!)
        if (isset($this->items['fields'])) {
            $this->items['fields'] = $this->processFields($this->items['fields']);
        }

        $items = $this->items;
        $rules = $this->rules;

        $blueprint  = function() use ($name, $items, $rules) {
            $blueprint = new Blueprint($name, ['form' => $items, 'rules' => $rules]);
            return $blueprint->load()->init();
        };

        $this->data   = new Data($this->header_data, $blueprint);
        $this->values = new Data();
        $this->fields = null;
        $this->fields = $this->fields();

        // Fire event
        $grav->fireEvent('onFormInitialized', new Event(['form' => $this]));

    }

    protected function processFields($fields)
    {
        $types = Grav::instance()['plugins']->formFieldTypes;

        $return = array();
        foreach ($fields as $key => $value) {

            // default to text if not set
            if (!isset($value['type'])) {
                $value['type'] = 'text';
            }

            // manually merging the field types
            if ($types !== null && key_exists($value['type'], $types)) {
                $value += $types[$value['type']];
            }

            // Fix numeric indexes
            if (is_numeric($key) && isset($value['name'])) {
                $key = $value['name'];
            }
            if (isset($value['fields']) && is_array($value['fields'])) {
                $value['fields'] = $this->processFields($value['fields']);
            }
            $return[$key] = $value;
        }
        return $return;
    }

    public function fields() {

        if (is_null($this->fields)) {
            $blueprint = $this->data->blueprints();

            if (method_exists($blueprint, 'load')) {
                // init the form to process directives
                $blueprint->load()->init();

                // fields set to processed blueprint fields
                $this->fields = $blueprint->fields();
            }
        }

        return $this->fields;
    }

    /**
     * Return page object for the form.
     *
     * @return Page
     */
    public function page()
    {
        return Grav::instance()['pages']->dispatch($this->page);
    }

    /**
     * Get value of given variable (or all values).
     * First look in the $data array, fallback to the $values array
     *
     * @param string $name
     *
     * @return mixed
     */
    public function value($name = null, $fallback = false)
    {
        if (!$name) {
            return $this->data;
        }

        if ($this->data->get($name)) {
            return $this->data->get($name);
        }

        if ($fallback) {
            return $this->values->get($name);
        }

        return null;
    }

    /**
     * Set value of given variable in the values array
     *
     * @param string $name
     *
     * @return mixed
     */
    public function setValue($name = null, $value = '')
    {
        if (!$name) {
            return;
        }

        $this->values->set($name, $value);
    }

    /**
     * Get a value from the form
     *
     * @param $name
     * @return mixed
     */
    public function getValue($name)
    {
        return $this->values->get($name);
    }

    /**
     * Get all data
     * 
     * @return Data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set value of given variable in the data array
     *
     * @param string $name
     *
     * @return mixed
     */
    public function setData($name = null, $value = '')
    {
        if (!$name) {
            return false;
        }

        $this->data->set($name, $value);

        return true;
    }

    public function setAllData($array)
    {
        $this->data = new Data($array);
    }

    /**
     * Handles ajax upload for files.
     * Stores in a flash object the temporary file and deals with potential file errors.
     *
     * @return mixed True if the action was performed.
     */
    public function uploadFiles()
    {
        $post = $_POST;
        $grav = Grav::instance();
        $uri = $grav['uri']->url;
        $config = $grav['config'];
        $session = $grav['session'];

        $settings = $this->data->blueprints()->schema()->getProperty($post['name']);
        $settings = (object) array_merge(
            ['destination' => $config->get('plugins.form.files.destination', 'self@'),
             'avoid_overwriting' => $config->get('plugins.form.files.avoid_overwriting', false),
             'random_name' => $config->get('plugins.form.files.random_name', false),
             'accept' => $config->get('plugins.form.files.accept', ['image/*']),
             'limit' => $config->get('plugins.form.files.limit', 10),
             'filesize' => $config->get('plugins.form.files.filesize', 5242880) // 5MB
            ],
            (array) $settings,
            ['name' => $post['name']]
        );

        $upload = $this->normalizeFiles($_FILES['data'], $settings->name);

        // Handle errors and breaks without proceeding further
        if ($upload->file->error != UPLOAD_ERR_OK) {
            // json_response
            return [
                'status' => 'error',
                'message' => sprintf($grav['language']->translate('PLUGIN_FORM.FILEUPLOAD_UNABLE_TO_UPLOAD', null, true), $upload->file->name, $this->upload_errors[$upload->file->error])
            ];
        } else {
            // Remove the error object to avoid storing it
            unset($upload->file->error);

            // we need to move the file at this stage or else
            // it won't be available upon save later on
            // since php removes it from the upload location
            $tmp_dir = $grav['locator']->findResource('tmp://', true, true);
            $tmp_file = $upload->file->tmp_name;
            $tmp = $tmp_dir . '/uploaded-files/' . basename($tmp_file);

            Folder::create(dirname($tmp));
            if (!move_uploaded_file($tmp_file, $tmp)) {
                // json_response
                return [
                    'status' => 'error',
                    'message' => sprintf($grav['language']->translate('PLUGIN_FORM.FILEUPLOAD_UNABLE_TO_MOVE', null, true), '', $tmp)
                ];
            }

            $upload->file->tmp_name = $tmp;
        }

        // Handle file size limits
        $settings->filesize *= 1048576; // 2^20 [MB in Bytes]
        if ($settings->filesize > 0 && $upload->file->size > $settings->filesize) {
            // json_response
            return [
                'status'  => 'error',
                'message' => $grav['language']->translate('PLUGIN_FORM.EXCEEDED_GRAV_FILESIZE_LIMIT')
            ];
        }


        // Handle Accepted file types
        // Accept can only be mime types (image/png | image/*) or file extensions (.pdf|.jpg)
        $accepted = false;
        $errors = [];
        foreach ((array) $settings->accept as $type) {
            // Force acceptance of any file when star notation
            if ($type == '*') {
                $accepted = true;
                break;
            }

            $isMime = strstr($type, '/');
            $find = str_replace('*', '.*', $type);

            $match = preg_match('#'. $find .'$#', $isMime ? $upload->file->type : $upload->file->name);
            if (!$match) {
                $message = $isMime ? 'The MIME type "' . $upload->file->type . '"' : 'The File Extension';
                $errors[] = $message . ' for the file "' . $upload->file->name . '" is not an accepted.';
                $accepted |= false;
            }  else {
                $accepted |= true;
            }
        }

        if (!$accepted) {
            // json_response
            return [
                'status' => 'error',
                'message' => implode('<br />', $errors)
            ];
        }

        // Retrieve the current session of the uploaded files for the field
        // and initialize it if it doesn't exist
        $sessionField = base64_encode($uri);
        $flash = $session->getFlashObject('files-upload');
        if (!$flash) { $flash = []; }
        if (!isset($flash[$sessionField])) { $flash[$sessionField] = []; }
        if (!isset($flash[$sessionField][$upload->field])) { $flash[$sessionField][$upload->field] = []; }

        // Set destination
        $destination = Folder::getRelativePath(rtrim($settings->destination, '/'));
        $destination = $this->getPagePathFromToken($destination);

        // Create destination if needed
        if (!is_dir($destination)) {
            Folder::mkdir($destination);
        }

        // Generate random name if required
        if ($settings->random_name) {
            $extension = pathinfo($upload->file->name)['extension'];
            $upload->file->name = Utils::generateRandomString(15) . '.' . $extension;
        }

        // Handle conflicting name if needed
        if ($settings->avoid_overwriting) {
            if (file_exists($destination . '/' . $upload->file->name)) {
                $upload->file->name = date('YmdHis') . '-' . $upload->file->name;
            }
        }

        // Prepare object for later save
        $path = $destination . '/' . $upload->file->name;
        $upload->file->path = $path;
        // $upload->file->route = $page ? $path : null;

        // Prepare data to be saved later
        $flash[$sessionField][$upload->field][$path] = (array) $upload->file;

        // Finally store the new uploaded file in the field session
        $session->setFlashObject('files-upload', $flash);


        // json_response
        return [
            'status' => 'success',
            'session' => \json_encode([
                'sessionField' => base64_encode($uri),
                'path' => $upload->file->path,
                'field' => $settings->name
            ])
        ];
    }

    /**
     * Handle form processing on POST action.
     */
    public function post()
    {
        $grav = Grav::instance();
        $uri = $grav['uri']->url;
        $session = $grav['session'];

        if (isset($_POST)) {
            $this->values = new Data(isset($_POST) ? (array)$_POST : []);
            $data         = $this->values->get('data');

            // Add post data to form dataset
            if (!$data) {
                $data = $this->values->toArray();
            }

            if (method_exists('Grav\Common\Utils', 'getNonce')) {
                if (!$this->values->get('form-nonce') || !Utils::verifyNonce($this->values->get('form-nonce'), 'form')) {
                    $event = new Event(['form'    => $this,
                                        'message' => $grav['language']->translate('PLUGIN_FORM.NONCE_NOT_VALIDATED')
                    ]);
                    $grav->fireEvent('onFormValidationError', $event);

                    return;
                }
            }

            $i = 0;
            foreach ($this->items['fields'] as $key => $field) {
                $name = isset($field['name']) ? $field['name'] : $key;
                if (!isset($field['name'])) {
                    if (isset($data[$i])) { //Handle input@ false fields
                        $data[$name] = $data[$i];
                        unset($data[$i]);
                    }
                }
                if ($field['type'] == 'checkbox') {
                    $data[$name] = isset($data[$name]) ? true : false;
                }
                $i++;
            }

            $this->data->merge($data);
        }

        // Validate and filter data
        try {
            $this->data->validate();
            $this->data->filter();

            $grav->fireEvent('onFormValidationProcessed', new Event(['form' => $this]));
        } catch (\RuntimeException $e) {
            $event = new Event(['form' => $this, 'message' => $e->getMessage(), 'messages' => $e->getMessages()]);
            $grav->fireEvent('onFormValidationError', $event);
            if ($event->isPropagationStopped()) {
                return;
            }
        }

        // Process previously uploaded files for the current URI
        // and finally store them. Everything else will get discarded
        $queue = $session->getFlashObject('files-upload');
        $queue = $queue[base64_encode($uri)];
        if (is_array($queue)) {
            foreach ($queue as $key => $files) {
                foreach ($files as $destination => $file) {
                    if (!rename($file['tmp_name'], $destination)) {
                        throw new \RuntimeException(sprintf($grav['language']->translate('PLUGIN_FORM.FILEUPLOAD_UNABLE_TO_MOVE', null, true), '"' . $file['tmp_name'] . '"', $destination));
                    }

                    unset($files[$destination]['tmp_name']);
                }

                $this->data->merge([$key => $files]);

            }
        }

        $process = isset($this->items['process']) ? $this->items['process'] : [];
        if (is_array($process)) {
            $event = null;
            foreach ($process as $action => $data) {
                if (is_numeric($action)) {
                    $action = \key($data);
                    $data   = $data[$action];
                }

                $previousEvent = $event;
                $event         = new Event(['form' => $this, 'action' => $action, 'params' => $data]);

                if ($previousEvent) {
                    if (!$previousEvent->isPropagationStopped()) {
                        $grav->fireEvent('onFormProcessed', $event);
                    } else {
                        break;
                    }
                } else {
                    $grav->fireEvent('onFormProcessed', $event);
                }
            }
        }
    }

    public function getPagePathFromToken($path)
    {
        return Utils::getPagePathFromToken($path, $this->page());
    }

    /**
     * Internal method to normalize the $_FILES array
     *
     * @param array  $data $_FILES starting point data
     * @param string $key
     * @return object a new Object with a normalized list of files
     */
    protected function normalizeFiles($data, $key = '') {
        $files = new \stdClass();
        $files->field = $key;
        $files->file = new \stdClass();

        foreach($data as $fieldName => $fieldValue) {
            // Since Files Upload are always happening via Ajax
            // we are not interested in handling `multiple="true"`
            // because they are always handled one at a time.
            // For this reason we normalize the value to string,
            // in case it is arriving as an array.
            $value = (array) Utils::getDotNotation($fieldValue, $key);
            $files->file->{$fieldName} = array_shift($value);
        }

        return $files;
    }

    public static function getNonce()
    {
        $action = 'form-plugin';
        return Utils::getNonce($action);
    }
}
