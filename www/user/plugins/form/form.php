<?php
namespace Grav\Plugin;

use Grav\Common\Data\ValidationException;
use Grav\Common\Page\Page;
use Grav\Common\Page\Pages;
use Grav\Common\Plugin;
use Grav\Common\Twig\Twig;
use Grav\Common\Utils;
use Grav\Common\Uri;
use Symfony\Component\Yaml\Yaml;
use RocketTheme\Toolbox\File\File;
use RocketTheme\Toolbox\Event\Event;

/**
 * Class FormPlugin
 * @package Grav\Plugin
 */
class FormPlugin extends Plugin
{
    public $features = [
        'blueprints' => 1000
    ];

    /**
     * @var Form
     */
    protected $form;

    protected $forms = [];

    protected $flat_forms = [];

    protected $json_response = [];

    protected $recache_forms = false;


    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized'   => ['onPluginsInitialized', 0],
            'onTwigTemplatePaths'    => ['onTwigTemplatePaths', 0]
        ];
    }

    /**
     * Initialize forms from cache if possible
     */
    public function onPluginsInitialized()
    {
        require_once(__DIR__ . '/classes/form.php');

        if ($this->isAdmin()) {
            $this->enable([
                'onPagesInitialized'     => ['onPagesInitialized', 0]
            ]);
            return;
        }

        $this->enable([
            'onPageProcessed'           => ['onPageProcessed', 0],
            'onPagesInitialized'        => ['onPagesInitialized', 0],
            'onTwigInitialized'         => ['onTwigInitialized', 0],
            'onTwigPageVariables'       => ['onTwigVariables', 0],
            'onTwigSiteVariables'       => ['onTwigVariables', 0],
            'onFormValidationProcessed' => ['onFormValidationProcessed', 0],
        ]);
    }

    /**
     * Process forms after page header processing, but before caching
     *
     * @param Event $e
     */
    public function onPageProcessed(Event $e)
    {
        /** @var Page $page */
        $page = $e['page'];
        $page_route = $page->route();

        if ($page->home()) {
            $page_route = '/';
        }

        $header = $page->header();

        //call event to allow filling the page header form dynamically (e.g. use case: Comments plugin)
        $this->grav->fireEvent('onFormPageHeaderProcessed', new Event(['header' => $header]));

        if ((isset($header->forms) && is_array($header->forms)) ||
            (isset($header->form) && is_array($header->form))) {

            $page_forms = [];

            // Force never_cache_twig if modular form
            if ($page->modular()) {
                $header->never_cache_twig = true;
            }

            // Get the forms from the page headers
            if (isset($header->forms)) {
                $page_forms = $header->forms;
            } elseif (isset($header->form)) {
                $page_forms[] = $header->form;
            }

            // Store the page forms in the forms instance
            foreach ($page_forms as $name => $page_form) {
                $form = new Form($page, $name, $page_form);
                $form_array = [$form['name'] => $form];
                if (array_key_exists($page_route, $this->forms)) {
                    $this->forms[$page_route] = array_merge($this->forms[$page_route], $form_array);
                } else {
                    $this->forms[$page_route] = $form_array;
                }

            }

            $this->recache_forms = true;
        }
    }

    /**
     * Initialize form if the page has one. Also catches form processing if user posts the form.
     */
    public function onPagesInitialized()
    {
        $submitted = false;
        $this->json_response = [];
        $cache_id = $this->grav['pages']->getPagesCacheId() . '-form-plugin';

        // Get and set the cache of forms if it exists
        list($forms, $flat_forms) = $this->grav['cache']->fetch($cache_id);

        // Only store the forms if they are an array
        if (is_array($forms)) {
            $this->forms = $forms;
        }

        // Only store the flat_forms if they are an array
        if (is_array($flat_forms)) {
            $this->flat_forms = $flat_forms;
        }

        // No forms in pages, try the current one in the page
        if (empty($this->forms)) {

            $page = $this->grav['page'];
            if (!$page) {
                return;
            }

            // Create form from page
            $header = $page->header();
            if (isset($header->form) && is_array($header->form)) {
                $this->form = new Form($page);
            }

        } else {
            // Regenerate list of flat_forms if not already populated
            if (empty($this->flat_forms)) {
                $this->flat_forms = Utils::arrayFlatten($this->forms);
            }

            // Save the current state of the forms to cache
            if ($this->recache_forms) {
                $this->grav['cache']->save($cache_id, [$this->forms, $this->flat_forms]);
            }
        }

        // Enable form events if there's a POST
        if ($this->shouldProcessForm()) {
            $this->enable([
                'onFormProcessed' => ['onFormProcessed', 0],
                'onFormValidationError' => ['onFormValidationError', 0],
                'onFormFieldTypes'       => ['onFormFieldTypes', 0],
            ]);

            // Post the form
            if ($this->form()) {
                if ($this->grav['uri']->extension() === 'json' && isset($_POST['__form-file-uploader__'])) {
                    $this->json_response = $this->form->uploadFiles();
                } else {
                    $this->form->post();
                    $submitted = true;
                }
            }

            // Clear flash objects for previously uploaded files
            // whenever the user switches page / reloads
            // ignoring any JSON / extension call
            if (is_null($this->grav['uri']->extension()) && !$submitted) {
                // Discard any previously uploaded files session.
                // and if there were any uploaded file, remove them from the filesystem
                if ($flash = $this->grav['session']->getFlashObject('files-upload')) {
                    $flash = new \RecursiveIteratorIterator(new \RecursiveArrayIterator($flash));
                    foreach ($flash as $key => $value) {
                        if ($key !== 'tmp_name') {
                            continue;
                        }
                        @unlink($value);
                    }
                }
            }
        }
    }

    /**
     * Add simple `forms()` Twig function
     */
    public function onTwigInitialized()
    {
        $this->grav['twig']->twig()->addFunction(
            new \Twig_SimpleFunction('forms', [$this, 'getForm'])
        );
    }

    /**
     * Add current directory to twig lookup paths.
     */
    public function onTwigTemplatePaths()
    {
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Make form accessible from twig.
     *
     * @param Event $event
     */
    public function onTwigVariables(Event $event =  null)
    {
        if ($event && isset($event['page'])) {
            $page = $event['page'];
        } else {
            $page = $this->grav['page'];
        }

        $header = $page->header();

        // get route to calculated page
        $page_route = $page->route();
        // get route to current page
        $current_page_route = $this->getCurrentPageRoute();
        $found_forms = [];

        $twig = $this->grav['twig'];

        if (!isset($twig->twig_vars['form'])) {
            if (isset($this->form)) {
                $twig->twig_vars['form'] = $this->form;
            } else {
                if (isset($this->forms[$page_route])) {
                    $found_forms = $this->forms[$page_route];
                } elseif (isset($this->forms[$current_page_route])) {
                    $found_forms = $this->forms[$current_page_route];
                } elseif (isset($header->form)) {
                    $found_forms = [new Form($page)];
                }
                $twig->twig_vars['form'] = array_shift($found_forms);
            }
        }

        if ($this->config->get('plugins.form.built_in_css')) {
            $this->grav['assets']->addCss('plugin://form/assets/form-styles.css');
        }

        $twig->twig_vars['form_json_response'] = $this->json_response;
    }

    /**
     * Handle form processing instructions.
     *
     * @param Event $event
     */
    public function onFormProcessed(Event $event)
    {
        $form = $event['form'];
        $action = $event['action'];
        $params = $event['params'];

        $this->process($form);

        switch ($action) {
            case 'captcha':
                if (isset($params['recaptcha_secret'])) {
                    $recaptchaSecret = $params['recaptcha_secret'];
                } else if (isset($params['recatpcha_secret'])) {
                    // Included for backwards compatibility with typo (issue #51)
                    $recaptchaSecret = $params['recatpcha_secret'];
                } else {
                    $recaptchaSecret = $this->config->get('plugins.form.recaptcha.secret_key');
                }

                // Validate the captcha
                $query = http_build_query([
                    'secret'   => $recaptchaSecret,
                    'response' => $form->value('g-recaptcha-response', true)
                ]);
                $url = 'https://www.google.com/recaptcha/api/siteverify?' . $query;
                $response = json_decode(file_get_contents($url), true);

                if (!isset($response['success']) || $response['success'] !== true) {
                    $this->grav->fireEvent('onFormValidationError', new Event([
                        'form'    => $form,
                        'message' => $this->grav['language']->translate('PLUGIN_FORM.ERROR_VALIDATING_CAPTCHA')
                    ]));
                    $event->stopPropagation();

                    return;
                }
                break;
            case 'ip':
                $label = isset($params['label']) ? $params['label'] : 'User IP';
                $blueprint = $form->value()->blueprints();
                $blueprint->set('form/fields/ip', ['name'=>'ip', 'label'=> $label]);
                $form->setFields($blueprint->fields());
                $form->setData('ip', Uri::ip());
                break;
            case 'message':
                $translated_string = $this->grav['language']->translate($params);
                $vars = array(
                    'form' => $form
                );

                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $processed_string = $twig->processString($translated_string, $vars);

                $form->message = $processed_string;
                break;
            case 'redirect':
                $this->grav['session']->setFlashObject('form', $form);
                $url = ((string)$params);
                $vars = array(
                    'form' => $form
                );
                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $url = $twig->processString($url, $vars);
                $this->grav->redirect($url);
                break;
            case 'reset':
                if (Utils::isPositive($params)) {
                    $form->reset();
                }
                break;
            case 'display':
                $route = (string)$params;
                if (!$route || $route[0] != '/') {
                    /** @var Uri $uri */
                    $uri = $this->grav['uri'];
                    $route = rtrim($uri->route(), '/'). '/' . ($route ?: '');
                }

                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $twig->twig_vars['form'] = $form;

                /** @var Pages $pages */
                $pages = $this->grav['pages'];
                $page = $pages->dispatch($route, true);

                if (!$page) {
                    throw new \RuntimeException('Display page not found. Please check the page exists.', 400);
                }

                unset($this->grav['page']);
                $this->grav['page'] = $page;
                break;
            case 'save':
                $prefix = !empty($params['fileprefix']) ? $params['fileprefix'] : '';
                $format = !empty($params['dateformat']) ? $params['dateformat'] : 'Ymd-His-u';
                $ext = !empty($params['extension']) ? '.' . trim($params['extension'], '.') : '.txt';
                $filename = !empty($params['filename']) ? $params['filename'] : '';
                $operation = !empty($params['operation']) ? $params['operation'] : 'create';

                if (!$filename) {
                    $filename = $prefix . $this->udate($format) . $ext;
                }

                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $vars = [
                    'form' => $form
                ];

                // Process with Twig
                $filename = $twig->processString($filename, $vars);

                $locator = $this->grav['locator'];
                $path = $locator->findResource('user://data', true);
                $dir = $path . DS . $form->name();
                $fullFileName = $dir. DS . $filename;

                $file = File::instance($fullFileName);

                if ($operation == 'create') {
                    $body = $twig->processString(!empty($params['body']) ? $params['body'] : '{% include "forms/data.txt.twig" %}',
                        $vars);
                    $file->save($body);
                } elseif ($operation == 'add') {
                    if (!empty($params['body'])) {
                        // use body similar to 'create' action and append to file as a log
                        $body = $twig->processString($params['body'], $vars);

                        // create folder if it doesn't exist
                        if (!file_exists($dir)) {
                            mkdir($dir);
                        }

                        // append data to existing file
                        file_put_contents($fullFileName, $body, FILE_APPEND | LOCK_EX);
                    } else {
                        // serialize YAML out to file for easier parsing as data sets
                        $vars = $vars['form']->value()->toArray();

                        foreach ($form->fields as $field) {
                            if (isset($field['process']) && isset($field['process']['ignore']) && $field['process']['ignore']) {
                                unset($vars[$field['name']]);
                            }
                        }

                        if (file_exists($fullFileName)) {
                            $data = Yaml::parse($file->content());
                            if (count($data) > 0) {
                                array_unshift($data, $vars);
                            } else {
                                $data[] = $vars;
                            }
                        } else {
                            $data[] = $vars;
                        }

                        $file->save(Yaml::dump($data));
                    }

                }
                break;
        }
    }

    /**
     * Custom field logic can go in here
     *
     * @param Event $event
     */
    public function onFormValidationProcessed(Event $event)
    {
        // special check for honeypot field
        if (!empty($event['form']->value('honeypot'))) {
            throw new ValidationException('Are you a bot?');
        }
    }

    /**
     * Handle form validation error
     *
     * @param  Event $event An event object
     */
    public function onFormValidationError(Event $event)
    {
        $form = $event['form'];
        if (isset($event['message'])) {
            $form->message_color = 'red';
            $form->message = $event['message'];
            $form->messages = $event['messages'];
        }

        $uri = $this->grav['uri'];
        $route = $uri->route();

        /** @var Twig $twig */
        $twig = $this->grav['twig'];
        $twig->twig_vars['form'] = $form;

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route, true);

        if ($page) {
            unset($this->grav['page']);
            $this->grav['page'] = $page;
        }

        $event->stopPropagation();
    }

    /**
     * Get list of form field types specified in this plugin. Only special types needs to be listed.
     *
     * @return array
     */
    public function getFormFieldTypes()
    {
        return [
            'display' => [
                'input@' => false
            ],
            'spacer'  => [
                'input@' => false
            ],
            'captcha' => [
                'input@' => false
            ]
        ];
    }

    /**
     * Process a form
     *
     * Currently available processing tasks:
     *
     * - fillWithCurrentDateTime
     *
     * @param Form $form
     *
     * @return bool
     */
    protected function process($form)
    {
        foreach ($form->fields as $field) {
            if (isset($field['process'])) {
                if (isset($field['process']['fillWithCurrentDateTime']) && $field['process']['fillWithCurrentDateTime']) {
                    $form->setData($field['name'], gmdate('D, d M Y H:i:s', time()));
                }
            }
        }
    }

    /**
     * Create unix timestamp for storing the data into the filesystem.
     *
     * @param string $format
     * @param int    $utimestamp
     *
     * @return string
     */
    private function udate($format = 'u', $utimestamp = null)
    {
        if (is_null($utimestamp)) {
            $utimestamp = microtime(true);
        }

        $timestamp = floor($utimestamp);
        $milliseconds = round(($utimestamp - $timestamp) * 1000000);

        return date(preg_replace('`(?<!\\\\)u`', \sprintf('%06d', $milliseconds), $format), $timestamp);
    }

    /**
     * @param Page $page
     * @return mixed
     */
    private function getFormName(Page $page)
    {
        $name = filter_input(INPUT_POST, '__form-name__');

        if (!$name) {
            $name = $page->slug();
        }

        return $name;
    }

    /**
     * function to get a specific form
     *
     * @param null|array $data optional form `name`
     *
     * @return null|Form
     */
    public function getForm($data = null)
    {
        $page_route = null;
        $form_name = null;

        if (is_array($data)) {
            if (isset($data['name'])) {
                $form_name = $data['name'];
            }
            if (isset($data['route'])) {
                $page_route = $data['route'];
            }
        } elseif (is_string($data)) {
            $form_name = $data;
        }

        // if no form name, use the first form found in the page
        if (!$form_name) {

            // If page route not provided, use the current page
            if (!$page_route) {
                // Get page route
                $page_route = $this->grav['page']->route();

                // fallback using current URI if page not initialized yet
                if (!$page_route) {
                    $page_route = $this->getCurrentPageRoute();
                }
            }

            if (isset($this->forms[$page_route])) {
                $forms = $this->forms[$page_route];
                $first_form = array_shift($forms);
                $form_name = $first_form['name'];
            } else {
                //No form on this route. Try looking up in the current page first
                return new Form($this->grav['page']);
            }
        }

        // return the form you are looking for if available
        $form = $this->getFormByName($form_name);

        return $form;
    }

    /**
     * Get current page's route
     *
     * @return mixed
     */
    protected function getCurrentPageRoute()
    {
        $path = $this->grav['uri']->route();
        $path = $path ?: '/';
        return $path;
    }

    /**
     * Retrieve a form based on the form name
     *
     * @param $form_name
     * @return mixed
     */
    protected function getFormByName($form_name)
    {
        if (array_key_exists($form_name, $this->flat_forms)) {
            $form = $this->flat_forms[$form_name];
            return $form;
        }
        return null;
    }

    protected function shouldProcessForm()
    {
        $status = isset($_POST) && isset($_POST['form-nonce']);
        $refresh_prevention = null;

        if ($status && $this->form()) {

            // Set page template if passed by form
            if (isset($this->form->template)) {
                $this->grav['page']->template($this->form->template);
            }

            if (!is_null($this->form->refresh_prevention)) {
                $refresh_prevention = (bool) $this->form->refresh_prevention;
            } else {
                $refresh_prevention = $this->config->get('plugins.form.refresh_prevention', false);
            }

            $unique_form_id = filter_input(INPUT_POST, '__unique_form_id__', FILTER_SANITIZE_STRING);

            if ($refresh_prevention && $unique_form_id) {
                if(($this->grav['session']->unique_form_id != $unique_form_id)) {
                    $this->grav['session']->unique_form_id = $unique_form_id;
                } else {
                    $status = false;
                    $this->form->message = $this->grav['language']->translate('PLUGIN_FORM.FORM_ALREADY_SUBMITTED');
                    $this->form->message_color = 'red';
                }
            }
        }

        return $status;
    }

    protected function form()
    {
        if (!isset($this->form)) {
            $current_form_name = $this->getFormName($this->grav['page']);
            $this->form = $this->getFormByName($current_form_name);
        }
        return $this->form;
    }
}
