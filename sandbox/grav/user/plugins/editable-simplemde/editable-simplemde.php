<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;
use Grav\Common\Markdown\Parsedown;
use Grav\Common\Markdown\ParsedownExtra;

/**
 * Class EditableSimpleMDEPlugin
 * @package Grav\Plugin
 */
class EditableSimpleMDEPlugin extends Plugin
{

    protected $myName = 'editable-simplemde';
    protected $myNameFull = 'Editable with SimpleMDE';

    /**
     * Add ContentTools code and styles to the page
     */
    public function addAssets()
    {
        // Get assets objects
        $assets = $this->grav['assets'];
        // Add SimpleMDE Markdown Editor
        $assets->addCss('//cdn.jsdelivr.net/simplemde/latest/simplemde.min.css', 1);
        $assets->addJs('//cdn.jsdelivr.net/simplemde/latest/simplemde.min.js', 1);
        // Add custom styles
        $assets->addCss('plugin://' . $this->myName . '/css/customstyles.css', 1);
        // Add editor configuration
        $assets->addJs('plugin://' . $this->myName . '/js/main.js', 1);
        // Add extra utilities
        $assets->addJs('plugin://' . $this->myName . '/vendor/FastMD5-master/build/md5.min.js', 1);
        $assets->addJs('plugin://' . $this->myName . '/js/simpleUpload.min.js', 1);
        // Set a Javascript variable to point to the current page
        $assets->addInlineJs('grav_page_route = "' . $this->grav['uri']->baseIncludingLanguage() . $this->grav['uri']->route() . '";' . PHP_EOL, 1);
    }

    /**
     * Remove all media (i.e. uploaded files) which are not referenced in the page content
     */
    public function collectGarbage($page)
    {
        $pageMedia = $page->media()->toArray();
        foreach ($pageMedia as $medium) {
            if (!strpos($page->rawMarkdown(), $medium['filename'])) {
                unlink($medium['filepath']);
            }
        }
    }

    /**
     * @return array
     *
     * The getSubscribedEvents() gives the core a list of events
     *     that the plugin wants to listen to. The key of each
     *     array section is the event that the plugin listens to
     *     and the value (in the form of an array) contains the
     *     callable (or function) as well as the priority. The
     *     higher the number the higher the priority.
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }

    public function onPageInitialized()
    {
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            $this->active = false;
            return;
        }

        $page = $this->grav['page'];

        $username = $this->grav['user']->get('username');

        // Change this normal! page into an editable one when user is permitted
        if ($page->modular()) {
            $this->grav['log']->warning($this->myNameFull . ' can\'t act on modular pages');
            return;
        }
        else {
            $config = $this->mergeConfig($page);
            $editable_self = $config->get('self');
            if ($editable_self) {
                $this->addAssets();
                $name = 'editable' . str_replace('/', '___', $page->route());
                $this->config->set('plugins' . $this->myName . 'id', $name);
                $content = $this->processTemplate($page->rawMarkdown(), $this->myName . '.html.twig');
                $page->setRawContent($content);
            }
        }
    }

    /**
     * Pass valid actions (via AJAX requests) on to the editor resource to handle
     *
     * @return the output of the editor resource
     */
    public function onPagesInitialized()
    {
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            $this->active = false;
            return;
        }

        // Do not act upon empty POST payload
        $post = $_POST;
        if (!$post) {
            return;
        }

        // Check whether it's a non modular page and actions on this page are allowed
        $page = $this->grav['page'];
        if ($page->modular()) {
            $this->grav['log']->warning($myNameFull . ' can\'t act on modular pages');
            return;
        }

        switch ($post['action']) {
            case 'saveContent': // Save markdown content
                $output = $this->saveContent($page, $post);
                $this->setHeaders();
                echo json_encode($output);
                break;
            case 'previewContent': // Render received markdown and return HTML
                $output = $this->processMarkdown($page, $post);
                $this->setHeaders();
                echo json_encode($output);
                break;
            case 'fileUpload': // Handle a file (or image) upload
                $output = $this->saveFile($page, $post);
                $this->setHeaders();
                echo json_encode($output);
                break;
            default:
                return;
        }
        exit;
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized()
    {
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            return;
        }

        // Check for a logged in user
        $userAuthorized = $this->grav['user']->authorize('site.editable');

        if (!$userAuthorized) {
            return;
        }

        // Enable the events we are interested in
        $this->enable([
            'onPageInitialized' => ['onPageInitialized', 0],
            'onPagesInitialized' => ['onPagesInitialized', 0],
            'onTwigTemplatePaths' => ['onTwigTemplatePaths', 0]
        ]);
    }

    /**
     * Add current directory to Twig lookup paths.
     */
    public function onTwigTemplatePaths()
    {
        // Add local templates folder to the Twig templates search path
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Process the Markdown content. Uses Parsedown or Parsedown Extra depending on configuration
     * Taken from Grav/Common/Page/Page.php and modified to process a supplied page
     *
     * @return string containing HTML
     */
    public function processMarkdown($page, $params)
    {
        /** @var Config $config */
        $config = $this->grav['config'];
        $defaults = (array)$config->get('system.pages.markdown');
        
        if (isset($page->header()->markdown)) {
            $defaults = array_merge($defaults, $page->header()->markdown);
        }

        if (isset($this->header->markdown_extra)) {
            $markdown_extra = (bool)$this->header->markdown_extra;
        }

        // pages.markdown_extra is deprecated, but still check it...
        if (!isset($defaults['extra']) && (isset($markdown_extra) || $config->get('system.pages.markdown_extra') !== null)) {
            $defaults['extra'] = $markdown_extra ?: $config->get('system.pages.markdown_extra');
        }
        // Initialize the preferred variant of Parsedown
        if ($defaults['extra']) {
            $parsedown = new ParsedownExtra($this, $defaults);
        } else {
            $parsedown = new Parsedown($this, $defaults);
        }

        $language = trim(basename($page->extension(), 'md'), '.') ?: null;
        $filename = str_replace($language, $params['lang'], $page->name());
        $path = $page->path() . DS . $filename;
        $page->filePath($path);
        $page->rawMarkdown($params['content']);
        $html = $parsedown->text($page->content());
        return $html;
    }


    public function processTemplate($content, $template)
    {
        return $this->grav['twig']->processTemplate($template, [
            'content' => $content,
        ]);
    }


    /**
     * Sanitize a string into a safe filename or slug
     *
     * @param string $f
     *
     * @return string
     */
    public function sanitize($f, $type = 'file') {
        /*  A combination of various methods to sanitize a string while retaining
            the "essence" of the original file name as much as possible.
            Note: unsuitable for file paths as '/' and '\' are filtered out.
            Sources:
                http://www.house6.com/blog/?p=83
            and
                http://stackoverflow.com/a/24984010
        */
        $replace_chars = array(
            '&amp;' => '-and-', '@' => '-at-', '©' => 'c', '®' => 'r', 'À' => 'a',
            'Á' => 'a', 'Â' => 'a', 'Ä' => 'a', 'Å' => 'a', 'Æ' => 'ae','Ç' => 'c',
            'È' => 'e', 'É' => 'e', 'Ë' => 'e', 'Ì' => 'i', 'Í' => 'i', 'Î' => 'i',
            'Ï' => 'i', 'Ò' => 'o', 'Ó' => 'o', 'Ô' => 'o', 'Õ' => 'o', 'Ö' => 'o',
            'Ø' => 'o', 'Ù' => 'u', 'Ú' => 'u', 'Û' => 'u', 'Ü' => 'u', 'Ý' => 'y',
            'ß' => 'ss','à' => 'a', 'á' => 'a', 'â' => 'a', 'ä' => 'a', 'å' => 'a',
            'æ' => 'ae','ç' => 'c', 'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e',
            'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 'ò' => 'o', 'ó' => 'o',
            'ô' => 'o', 'õ' => 'o', 'ö' => 'o', 'ø' => 'o', 'ù' => 'u', 'ú' => 'u',
            'û' => 'u', 'ü' => 'u', 'ý' => 'y', 'þ' => 'p', 'ÿ' => 'y', 'Ā' => 'a',
            'ā' => 'a', 'Ă' => 'a', 'ă' => 'a', 'Ą' => 'a', 'ą' => 'a', 'Ć' => 'c',
            'ć' => 'c', 'Ĉ' => 'c', 'ĉ' => 'c', 'Ċ' => 'c', 'ċ' => 'c', 'Č' => 'c',
            'č' => 'c', 'Ď' => 'd', 'ď' => 'd', 'Đ' => 'd', 'đ' => 'd', 'Ē' => 'e',
            'ē' => 'e', 'Ĕ' => 'e', 'ĕ' => 'e', 'Ė' => 'e', 'ė' => 'e', 'Ę' => 'e',
            'ę' => 'e', 'Ě' => 'e', 'ě' => 'e', 'Ĝ' => 'g', 'ĝ' => 'g', 'Ğ' => 'g',
            'ğ' => 'g', 'Ġ' => 'g', 'ġ' => 'g', 'Ģ' => 'g', 'ģ' => 'g', 'Ĥ' => 'h',
            'ĥ' => 'h', 'Ħ' => 'h', 'ħ' => 'h', 'Ĩ' => 'i', 'ĩ' => 'i', 'Ī' => 'i',
            'ī' => 'i', 'Ĭ' => 'i', 'ĭ' => 'i', 'Į' => 'i', 'į' => 'i', 'İ' => 'i',
            'ı' => 'i', 'Ĳ' => 'ij','ĳ' => 'ij','Ĵ' => 'j', 'ĵ' => 'j', 'Ķ' => 'k',
            'ķ' => 'k', 'ĸ' => 'k', 'Ĺ' => 'l', 'ĺ' => 'l', 'Ļ' => 'l', 'ļ' => 'l',
            'Ľ' => 'l', 'ľ' => 'l', 'Ŀ' => 'l', 'ŀ' => 'l', 'Ł' => 'l', 'ł' => 'l',
            'Ń' => 'n', 'ń' => 'n', 'Ņ' => 'n', 'ņ' => 'n', 'Ň' => 'n', 'ň' => 'n',
            'ŉ' => 'n', 'Ŋ' => 'n', 'ŋ' => 'n', 'Ō' => 'o', 'ō' => 'o', 'Ŏ' => 'o',
            'ŏ' => 'o', 'Ő' => 'o', 'ő' => 'o', 'Œ' => 'oe','œ' => 'oe','Ŕ' => 'r',
            'ŕ' => 'r', 'Ŗ' => 'r', 'ŗ' => 'r', 'Ř' => 'r', 'ř' => 'r', 'Ś' => 's',
            'ś' => 's', 'Ŝ' => 's', 'ŝ' => 's', 'Ş' => 's', 'ş' => 's', 'Š' => 's',
            'š' => 's', 'Ţ' => 't', 'ţ' => 't', 'Ť' => 't', 'ť' => 't', 'Ŧ' => 't',
            'ŧ' => 't', 'Ũ' => 'u', 'ũ' => 'u', 'Ū' => 'u', 'ū' => 'u', 'Ŭ' => 'u',
            'ŭ' => 'u', 'Ů' => 'u', 'ů' => 'u', 'Ű' => 'u', 'ű' => 'u', 'Ų' => 'u',
            'ų' => 'u', 'Ŵ' => 'w', 'ŵ' => 'w', 'Ŷ' => 'y', 'ŷ' => 'y', 'Ÿ' => 'y',
            'Ź' => 'z', 'ź' => 'z', 'Ż' => 'z', 'ż' => 'z', 'Ž' => 'z', 'ž' => 'z',
            'ſ' => 'z', 'Ə' => 'e', 'ƒ' => 'f', 'Ơ' => 'o', 'ơ' => 'o', 'Ư' => 'u',
            'ư' => 'u', 'Ǎ' => 'a', 'ǎ' => 'a', 'Ǐ' => 'i', 'ǐ' => 'i', 'Ǒ' => 'o',
            'ǒ' => 'o', 'Ǔ' => 'u', 'ǔ' => 'u', 'Ǖ' => 'u', 'ǖ' => 'u', 'Ǘ' => 'u',
            'ǘ' => 'u', 'Ǚ' => 'u', 'ǚ' => 'u', 'Ǜ' => 'u', 'ǜ' => 'u', 'Ǻ' => 'a',
            'ǻ' => 'a', 'Ǽ' => 'ae','ǽ' => 'ae','Ǿ' => 'o', 'ǿ' => 'o', 'ə' => 'e',
            'Ё' => 'jo','Є' => 'e', 'І' => 'i', 'Ї' => 'i', 'А' => 'a', 'Б' => 'b',
            'В' => 'v', 'Г' => 'g', 'Д' => 'd', 'Е' => 'e', 'Ж' => 'zh','З' => 'z',
            'И' => 'i', 'Й' => 'j', 'К' => 'k', 'Л' => 'l', 'М' => 'm', 'Н' => 'n',
            'О' => 'o', 'П' => 'p', 'Р' => 'r', 'С' => 's', 'Т' => 't', 'У' => 'u',
            'Ф' => 'f', 'Х' => 'h', 'Ц' => 'c', 'Ч' => 'ch','Ш' => 'sh','Щ' => 'sch',
            'Ъ' => '-', 'Ы' => 'y', 'Ь' => '-', 'Э' => 'je','Ю' => 'ju','Я' => 'ja',
            'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e',
            'ж' => 'zh','з' => 'z', 'и' => 'i', 'й' => 'j', 'к' => 'k', 'л' => 'l',
            'м' => 'm', 'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's',
            'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'c', 'ч' => 'ch',
            'ш' => 'sh','щ' => 'sch','ъ' => '-','ы' => 'y', 'ь' => '-', 'э' => 'je',
            'ю' => 'ju','я' => 'ja','ё' => 'jo','є' => 'e', 'і' => 'i', 'ї' => 'i',
            'Ґ' => 'g', 'ґ' => 'g', 'א' => 'a', 'ב' => 'b', 'ג' => 'g', 'ד' => 'd',
            'ה' => 'h', 'ו' => 'v', 'ז' => 'z', 'ח' => 'h', 'ט' => 't', 'י' => 'i',
            'ך' => 'k', 'כ' => 'k', 'ל' => 'l', 'ם' => 'm', 'מ' => 'm', 'ן' => 'n',
            'נ' => 'n', 'ס' => 's', 'ע' => 'e', 'ף' => 'p', 'פ' => 'p', 'ץ' => 'C',
            'צ' => 'c', 'ק' => 'q', 'ר' => 'r', 'ש' => 'w', 'ת' => 't', '™' => 'tm',
            'Ã' => 'A', 'Ð' => 'Dj', 'Ê' => 'E', 'Ñ' => 'N', 'Þ' => 'B', 'ã' => 'a',
            'ð' => 'o', 'ñ' => 'n', '#' => '-nr-' );
        // "Translate" multi byte characters to 'corresponding' ASCII characters
        $f = strtr($f, $replace_chars);
        // Convert special characters to a hyphen
        $f = str_replace(array(
            ' ', '!', '\\', '/', '\'', '`', '"', '~', '%', '|',
            '*', '$', '^', '(' ,')', '[', ']', '{', '}',
            '+', ',', ':' ,';', '<', '=', '>', '?', '|'), '-', $f); 
        // Remove any non ASCII characters
        $f = preg_replace('/[^(\x20-\x7F)]*/','', $f);
        if ($type == 'file') {
            // Remove non-word chars (leaving hyphens and periods)
            $f = preg_replace('/[^\w\-\.]+/', '', $f);
            // Convert multiple adjacent dots into a single one
            $f = preg_replace('/[\.]+/', '.', $f);
        }
        else { // Do not allow periods, for instance for a Grav slug
            // Convert period to hyphen
            $f = str_replace('.', '-', $f);
            // Remove non-word chars (leaving hyphens)
            $f = preg_replace('/[^\w\-]+/', '', $f);
        }
        // Convert multiple adjacent hyphens into a single one
        $f = preg_replace('/[\-]+/', '-', $f);
        // Change into a lowercase string; BTW no need to use mb_strtolower() here ;)
        $f = strtolower($f);
        return $f;
    }

    /**
     * Saves submitted content to a page
     *
     * @return string
     */
    public function saveContent($page, $params)
    {
        $page->rawMarkdown(urldecode($params['content']));

        // Do the actual save action
        $page->save();

        // Delete unreferenced uploaded files
        $this->collectGarbage($page);

        return 'ok';
    }

    /**
     * Handle a file upload
     * Taken from admincontroller.php and modified for use in the front-end
     *
     * @return string containing HTML
     */
    public function saveFile($page, $params)
    {
        /** @var Config $config */
        $config = $this->grav['config'];

        if (!isset($_FILES['file']['error']) || is_array($_FILES['file']['error'])) {

            return false;
        }

        // Check $_FILES['file']['error'] value.
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:

                return false;
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:

                return false;
            case UPLOAD_ERR_NO_TMP_DIR:

                return false;
            default:

                return false;
        }

        $grav_limit = $config->get('system.media.upload_limit', 0);
        // You should also check filesize here.
        if ($grav_limit > 0 && $_FILES['file']['size'] > $grav_limit) {

            return false;
        }


        // Check extension
        $fileParts = pathinfo($_FILES['file']['name']);

        $fileExt = '';
        if (isset($fileParts['extension'])) {
            $fileExt = strtolower($fileParts['extension']);
        }

        // If not a supported type, return
        if (!$fileExt || !$config->get("media.types.{$fileExt}")) {

            return false;
        }

        // Upload it
        $safeName = $this->sanitize($_FILES['file']['name']);
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $page->path() . DS . $safeName)) {
            return false;
        }

        // All is well, return uploaded filename
        return $safeName;
    }


    public function setHeaders()
    {
        header('Content-type: application/json');

        // Calculate Expires Headers if set to > 0
        $expires = $this->grav['config']->get('system.pages.expires');
        if ($expires > 0) {
            $expires_date = gmdate('D, d M Y H:i:s', time() + $expires) . ' GMT';
            header('Cache-Control: max-age=' . $expires);
            header('Expires: '. $expires_date);
        }
    }

}
