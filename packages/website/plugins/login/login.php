<?php
namespace Grav\Plugin;

use Grav\Plugin\Admin;
use Grav\Common\Grav;
use Grav\Common\Language\Language;
use Grav\Common\Page\Page;
use Grav\Common\Page\Pages;
use Grav\Common\Plugin;
use Grav\Common\Twig\Twig;
use Grav\Common\User\User;
use Grav\Common\Utils;
use Grav\Common\Uri;
use Grav\Plugin\Login\Login;
use Grav\Plugin\Login\Controller;
use Grav\Plugin\Form;
use RocketTheme\Toolbox\Event\Event;
use RocketTheme\Toolbox\Session\Message;

/**
 * Class LoginPlugin
 * @package Grav\Plugin
 */
class LoginPlugin extends Plugin
{
    /** @var string */
    protected $route;

    /** @var string */
    protected $route_register;

    /** @var string */
    protected $route_forgot;

    /** @var bool */
    protected $authenticated = true;

    /** @var bool */
    protected $authorized = true;

    /** @var Login */
    protected $login;

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => [['initializeSession', 10000], ['initializeLogin', 1000]],
            'onTask.login.login'   => ['loginController', 0],
            'onTask.login.forgot'  => ['loginController', 0],
            'onTask.login.logout'  => ['loginController', 0],
            'onTask.login.reset'   => ['loginController', 0],
            'onPagesInitialized'   => ['storeReferrerPage', 0],
            'onPageInitialized'    => ['authorizePage', 0],
            'onPageFallBackUrl'    => ['authorizeFallBackUrl', 0],
            'onTwigTemplatePaths'  => ['onTwigTemplatePaths', 0],
            'onTwigSiteVariables'  => ['onTwigSiteVariables', -100000],
            'onFormProcessed'      => ['onFormProcessed', 0]
        ];
    }

    /**
     * Initialize login plugin if path matches.
     */
    public function initializeSession()
    {
        // Check to ensure sessions are enabled.
        if ($this->grav['config']->get('system.session.enabled') === false) {
            throw new \RuntimeException('The Login plugin requires "system.session" to be enabled');
        }

        // Autoload classes
        $autoload = __DIR__ . '/vendor/autoload.php';
        if (!is_file($autoload)) {
            throw new \Exception('Login Plugin failed to load. Composer dependencies not met.');
        }
        require_once $autoload;

        // Define current user service.
        $this->grav['user'] = function ($c) {
            /** @var Grav $c */

            $session = $c['session'];

            if (!isset($session->user)) {
                $session->user = new User;

                if ($c['config']->get('plugins.login.rememberme.enabled')) {
                    $controller = new Controller($c, '');
                    $rememberMe = $controller->rememberMe();

                    // If we can present the correct tokens from the cookie, we are logged in
                    $username = $rememberMe->login();
                    if ($username) {
                        // Normal login process
                        $user = User::load($username);
                        if ($user->exists()) {
                            // There is a chance that an attacker has stolen
                            // the login token, so we store the fact that
                            // the user was logged in via RememberMe
                            // (instead of login form)
                            $session->remember_me = $rememberMe;
                            $session->user = $user;
                        }
                    }

                    // Check if the token was invalid
                    if ($rememberMe->loginTokenWasInvalid()) {
                        $controller->setMessage($c['language']->translate('PLUGIN_LOGIN.REMEMBER_ME_STOLEN_COOKIE'));
                    }
                }
            }

            return $session->user;
        };
    }

    /**
     * Initialize login plugin if path matches.
     */
    public function initializeLogin()
    {
        /** @var Uri $uri */
        $uri = $this->grav['uri'];

        //Initialize Login Object
        $this->login = new Login($this->grav);

        //Store Login Object in Grav
        $this->grav['login'] = $this->login;

        // Admin has its own login; make sure we're not in admin.
        if (!isset($this->grav['admin'])) {
            $this->route = $this->config->get('plugins.login.route');
        }

        // Register route to login page if it has been set.
        if ($this->route && $this->route == $uri->path()) {
            $this->enable([
                'onPagesInitialized' => ['addLoginPage', 0],
            ]);
            return;
        }

        if ($uri->path() == $this->config->get('plugins.login.route_forgot')) {
            $this->enable([
                'onPagesInitialized' => ['addForgotPage', 0],
            ]);
            return;
        }

        if ($uri->path() == $this->config->get('plugins.login.route_reset')) {
            $this->enable([
                'onPagesInitialized' => ['addResetPage', 0],
            ]);
            return;
        }

        if ($uri->path() == $this->config->get('plugins.login.route_register')) {
            if ($this->config->get('plugins.login.user_registration.enabled')) {
                $this->enable([
                    'onPagesInitialized' => ['addRegisterPage', 0],
                ]);
            } else {
                throw new \RuntimeException($this->grav['language']->translate('PLUGIN_LOGIN.REGISTRATION_DISABLED'), 404);
            }
            return;
        }

        if ($uri->path() == $this->config->get('plugins.login.route_activate')) {
            $this->enable([
                'onPagesInitialized' => ['handleUserActivation', 0],
            ]);
            return;
        }

        if ($uri->path() == $this->config->get('plugins.login.route_profile')) {
            $this->enable([
                'onPagesInitialized' => ['addProfilePage', 0],
            ]);
            return;
        }
    }

    public function storeReferrerPage()
    {
        $invalid_redirect_routes = [
            $this->config->get('plugins.login.route') ?: '/login',
            $this->config->get('plugins.login.route_register') ?: '/register',
            $this->config->get('plugins.login.route_activate') ?: '/activate_user',
            $this->config->get('plugins.login.route_forgot') ?: '/forgot_password',
            $this->config->get('plugins.login.route_reset') ?: '/reset_password',
        ];
        $current_route = $this->grav['uri']->route();


        if (!in_array($current_route, $invalid_redirect_routes)) {

            $allowed = true;
            $page = $this->grav['pages']->dispatch($current_route);

            if ($page) {
                $header = $page->header();
                if (isset($header->login_redirect_here) && $header->login_redirect_here == false) {
                    $allowed = false;
                }

                if ($allowed && $page->routable()) {
                    $this->grav['session']->redirect_after_login = $page->route() . $this->grav['uri']->params() ?: '';
                }
            }

        }
    }

    /**
     * Add Login page
     */
    public function addLoginPage()
    {
        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($this->route);

        if (!$page) {
            // Only add login page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . "/pages/login.md"));
            $page->slug(basename($this->route));

            $pages->addPage($page, $this->route);
        }
    }

    /**
     * Add Login page
     */
    public function addForgotPage()
    {
        $route = $this->config->get('plugins.login.route_forgot');
        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            // Only add forgot page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . "/pages/forgot.md"));
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Add Reset page
     */
    public function addResetPage()
    {
        $route = $this->config->get('plugins.login.route_reset');

        $uri = $this->grav['uri'];
        $token = $uri->param('token');
        $user = $uri->param('user');

        if (!$user || !$token) {
            return;
        }

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            // Only add login page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . "/pages/reset.md"));
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Add Register page
     */
    public function addRegisterPage()
    {
        $route = $this->config->get('plugins.login.route_register');

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . "/pages/register.md"));
            $page->template('form');
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Handle user activation
     */
    public function handleUserActivation()
    {
        /** @var Uri $uri */
        $uri = $this->grav['uri'];

        /** @var Message $messages */
        $messages = $this->grav['messages'];

        $username = $uri->param('username');

        $nonce = $uri->param('nonce');
        if (!isset($nonce) || !Utils::verifyNonce($nonce, 'user-activation')) {
            $message = $this->grav['language']->translate('PLUGIN_LOGIN.INVALID_REQUEST');
            $messages->add($message, 'error');
            $this->grav->redirect('/');

            return;
        }

        $token = $uri->param('token');
        $user = User::load($username);

        if (!$user->activation_token) {
            $message = $this->grav['language']->translate('PLUGIN_LOGIN.INVALID_REQUEST');
            $messages->add($message, 'error');
        } else {
            list($good_token, $expire) = explode('::', $user->activation_token);

            if ($good_token === $token) {
                if (time() > $expire) {
                    $message = $this->grav['language']->translate('PLUGIN_LOGIN.ACTIVATION_LINK_EXPIRED');
                    $messages->add($message, 'error');
                } else {
                    $user['state'] = 'enabled';
                    $user->save();
                    $message = $this->grav['language']->translate('PLUGIN_LOGIN.USER_ACTIVATED_SUCCESSFULLY');
                    $messages->add($message, 'info');

                    if ($this->config->get('plugins.login.user_registration.options.send_welcome_email', false)) {
                        $this->login->sendWelcomeEmail($user);
                    }
                    if ($this->config->get('plugins.login.user_registration.options.send_notification_email', false)) {
                        $this->login->sendNotificationEmail($user);
                    }

                    if ($this->config->get('plugins.login.user_registration.options.login_after_registration', false)) {
                        //Login user
                        $this->grav['session']->user = $user;
                        unset($this->grav['user']);
                        $this->grav['user'] = $user;
                        $user->authenticated = $user->authorize('site.login');
                    }
                }
            } else {
                $message = $this->grav['language']->translate('PLUGIN_LOGIN.INVALID_REQUEST');
                $messages->add($message, 'error');
            }
        }

        $redirect_route = $this->config->get('plugins.login.user_registration.redirect_after_activation', '/');
        $this->grav->redirect($redirect_route);
    }

    /**
     * Add Profile page
     */
    public function addProfilePage()
    {
        $route = $this->config->get('plugins.login.route_profile');
        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            // Only add forgot page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . "/pages/profile.md"));
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Initialize login controller
     */
    public function loginController()
    {
        /** @var Uri $uri */
        $uri = $this->grav['uri'];
        $task = !empty($_POST['task']) ? $_POST['task'] : $uri->param('task');
        $task = substr($task, strlen('login.'));
        $post = !empty($_POST) ? $_POST : [];

        if (method_exists('Grav\Common\Utils', 'getNonce')) {
            switch ($task) {
                case 'login':
                    if (!isset($post['login-form-nonce']) || !Utils::verifyNonce($post['login-form-nonce'], 'login-form')) {
                        $this->grav['messages']->add($this->grav['language']->translate('PLUGIN_LOGIN.ACCESS_DENIED'),
                            'info');
                        $this->authenticated = false;
                        $twig = $this->grav['twig'];
                        $twig->twig_vars['notAuthorized'] = true;

                        return;
                    }
                    break;

                case 'logout':
                    $nonce = $this->grav['uri']->param('logout-nonce');
                    if (!isset($nonce) || !Utils::verifyNonce($nonce, 'logout-form')) {
                        return;
                    }
                    break;

                case 'forgot':
                    if (!isset($post['forgot-form-nonce']) || !Utils::verifyNonce($post['forgot-form-nonce'], 'forgot-form')) {
                        $this->grav['messages']->add($this->grav['language']->translate('PLUGIN_LOGIN.ACCESS_DENIED'),'info');
                        return;
                    }
                    break;

                case 'reset':
                    if(!isset($post['reset-form-nonce']) || !Utils::verifyNonce($post['reset-form-nonce'], 'reset-form')) {
                        //$this->grav['messages']->add($this->grav['language']->translate('PLUGIN_LOGIN.ACCESS_DENIED'), 'info');
                        //return;
                    }
                    break;
            }
        }

        $controller = new Controller($this->grav, $task, $post);
        $controller->execute();
        $controller->redirect();
    }

    /**
     * Authorize the Page fallback url (page media accessed through the page route)
     */
    public function authorizeFallBackUrl()
    {
        if ($this->config->get('plugins.login.protect_protected_page_media', false)) {
            $page_url = dirname($this->grav['uri']->path());
            $page = $this->grav['pages']->find($page_url);
            $this->grav['page'] = $page;
            $this->authorizePage();
        }
    }

    /**
     * Authorize Page
     */
    public function authorizePage()
    {
        /** @var User $user */
        $user = $this->grav['user'];
        if (!$user->get('access')) {
            $user = User::load($user->get('username'));
        }

        /** @var Page $page */
        $page = $this->grav['page'];

        if (!$page) {
            return;
        }

        $header = $page->header();
        $rules = isset($header->access) ? (array)$header->access : [];

        $config = $this->mergeConfig($page);

        if ($config->get('parent_acl')) {
            // If page has no ACL rules, use its parent's rules
            if (!$rules) {
                $parent = $page->parent();
                while (!$rules and $parent) {
                    $header = $parent->header();
                    $rules = isset($header->access) ? (array)$header->access : [];
                    $parent = $parent->parent();
                }
            }
        }

        // Continue to the page if it has no ACL rules.
        if (!$rules) {
            return;
        }

        // Continue to the page if user is authorized to access the page.
        foreach ($rules as $rule => $value) {
            if (is_array($value)) {
                foreach ($value as $nested_rule => $nested_value) {
                    if ($user->authorize($rule . '.' . $nested_rule) == $nested_value) {
                        return;
                    }
                }
            } else {
                if ($user->authorize($rule) == $value) {
                    return;
                }
            }
        }

        // User is not logged in; redirect to login page.
        if ($this->route && !$user->authenticated) {
            $this->grav->redirect($this->route, 302);
        }

        /** @var Language $l */
        $l = $this->grav['language'];

        // Reset page with login page.
        if (!$user->authenticated) {
            $page = new Page;

//            $this->grav['session']->redirect_after_login = $this->grav['uri']->path() . ($this->grav['uri']->params() ?: '');

            // Get the admin Login page is needed, else teh default
            if ($this->isAdmin()) {
                $login_file = $this->grav['locator']->findResource("plugins://admin/pages/admin/login.md");
                $page->init(new \SplFileInfo($login_file));
            } else {
                $page->init(new \SplFileInfo(__DIR__ . "/pages/login.md"));
            }

            $page->slug(basename($this->route));
            $this->authenticated = false;

            unset($this->grav['page']);
            $this->grav['page'] = $page;
        } else {
            $this->grav['messages']->add($l->translate('PLUGIN_LOGIN.ACCESS_DENIED'), 'error');
            $this->authenticated = false;

            $twig = $this->grav['twig'];
            $twig->twig_vars['notAuthorized'] = true;
        }
    }


    /**
     * Add twig paths to plugin templates.
     */
    public function onTwigTemplatePaths()
    {
        $twig = $this->grav['twig'];
        $twig->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Set all twig variables for generating output.
     */
    public function onTwigSiteVariables()
    {
        /** @var Twig $twig */
        $twig = $this->grav['twig'];

        $this->grav->fireEvent('onLoginPage');

        $extension = $this->grav['uri']->extension();
        $extension = $extension ?: 'html';

        if (!$this->authenticated) {
            $twig->template = "login." . $extension . ".twig";
        }

        // add CSS for frontend if required
        if (!$this->isAdmin() && $this->config->get('plugins.login.built_in_css')) {
            $this->grav['assets']->add('plugin://login/css/login.css');
        }

        $task = $this->grav['uri']->param('task');
        $task = substr($task, strlen('login.'));
        if ($task == 'reset') {
            $username = $this->grav['uri']->param('user');
            $token = $this->grav['uri']->param('token');

            if (!empty($username) && !empty($token)) {
                $twig->twig_vars['username'] = $username;
                $twig->twig_vars['token'] = $token;
            }

        }
    }

    /**
     * Process the user registration, triggered by a registration form
     *
     * @param Form $form
     */
    private function processUserRegistration($form, Event $event)
    {
        if (!$this->config->get('plugins.login.enabled')) {
        throw new \RuntimeException($this->grav['language']->translate('PLUGIN_LOGIN.PLUGIN_LOGIN_DISABLED'));
        }

        if (!$this->config->get('plugins.login.user_registration.enabled')) {
            throw new \RuntimeException($this->grav['language']->translate('PLUGIN_LOGIN.USER_REGISTRATION_DISABLED'));
        }

        $data = [];
        $username = $form->value('username');
        $data['username'] = $username;

        if (file_exists($this->grav['locator']->findResource('account://' . $username . YAML_EXT))) {
            $this->grav->fireEvent('onFormValidationError', new Event([
                'form'    => $form,
                'message' => $this->grav['language']->translate([
                    'PLUGIN_LOGIN.USERNAME_NOT_AVAILABLE',
                    $username
                ])
            ]));
            $event->stopPropagation();

            return;
        }

        if ($this->config->get('plugins.login.user_registration.options.validate_password1_and_password2',
            false)
        ) {
            if ($form->value('password1') != $form->value('password2')) {
                $this->grav->fireEvent('onFormValidationError', new Event([
                    'form'    => $form,
                    'message' => $this->grav['language']->translate('PLUGIN_LOGIN.PASSWORDS_DO_NOT_MATCH')
                ]));
                $event->stopPropagation();

                return;
            }
            $data['password'] = $form->value('password1');
        }

        $fields = $this->config->get('plugins.login.user_registration.fields', []);

        foreach ($fields as $field) {
            // Process value of field if set in the page process.register_user
            $default_values = $this->config->get('plugins.login.user_registration.default_values');
            if ($default_values) {
                foreach ($default_values as $key => $param) {
                    $values = explode(',', $param);

                    if ($key == $field) {
                        $data[$field] = $values;
                    }
                }
            }

            if (!isset($data[$field]) && $form->value($field)) {
                $data[$field] = $form->value($field);
            }
        }

        if ($this->config->get('plugins.login.user_registration.options.validate_password1_and_password2',
            false)
        ) {
            unset($data['password1']);
            unset($data['password2']);
        }

        if ($this->config->get('plugins.login.user_registration.options.set_user_disabled', false)) {
            $data['state'] = 'disabled';
        } else {
            $data['state'] = 'enabled';
        }

        $user = $this->login->register($data);

        if ($this->config->get('plugins.login.user_registration.options.send_activation_email', false)) {
            $this->login->sendActivationEmail($user);
        } else {
            if ($this->config->get('plugins.login.user_registration.options.send_welcome_email', false)) {
                $this->login->sendWelcomeEmail($user);
            }
            if ($this->config->get('plugins.login.user_registration.options.send_notification_email', false)) {
                $this->login->sendNotificationEmail($user);
            }
        }

        $redirect = $this->config->get('plugins.login.user_registration.redirect_after_registration', false);
        if ($redirect) {
            $this->grav->redirect($redirect);
        }
    }

    /**
     * Save user profile information
     *
     * @param $form
     * @param $event
     * @return bool
     */
    private function processUserProfile($form, $event)
    {

        $user = $this->grav['user'];
        $user->merge($form->getData()->toArray());

        try {
            $user->save();
        } catch (\Exception $e) {
            $form->setMessage($e->getMessage(), 'error');
            return false;
        }
    }

    /**
     * Process a registration form. Handles the following actions:
     *
     * - register_user: registers a user
     *
     * @param Event $event
     */
    public function onFormProcessed(Event $event)
    {
        $form = $event['form'];
        $action = $event['action'];

        switch ($action) {
            case 'register_user':
                $this->processUserRegistration($form, $event);
                break;
            case 'update_user':
                $this->processUserProfile($form, $event);
                break;
        }
    }

}
