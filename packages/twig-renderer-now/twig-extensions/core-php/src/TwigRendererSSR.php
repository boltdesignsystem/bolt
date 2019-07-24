<?php

namespace Bolt;

use Bolt;
use Sabberworm\CSS\Parser as CSSParser;
require 'vendor/autoload.php';

/**
 * Server side renders Twig Components in an HTML string.
 */
class TwigRendererSSR
{
    /**
     * @var \Twig\Environment
     *   The Twig Environment.
     */
    public $twigEnvironment;

    /**
     * @var string[]
     *   An associative array mapping tag names to template names.
     */
    protected $tagTemplates;

    /**
     * @var string[]
     *   An array of CSS styles keyed by tag name for the current render.
     */
    protected $styleRegistry;

    /**
     * @var string[]
     *   An array tags names that were rendered in the last ::render call.
     */
    protected $renderedTags;

    /**
     * TwigComponentsSSR constructor.
     *
     * @param string[] $tag_templates
     *   An associative array mapping tag names to template names.
     * @param \Twig\Environment $environment
     *   A Twig environment, with templates that map to component names.
     */
    public function __construct($tag_templates, \Twig\Environment $environment)
    {
        $this->twigEnvironment = $environment;
        $this->tagTemplates = $tag_templates;
        // $this->styleRegistry = [];
        $this->renderedTags = [];
    }

    /**
     * Renders Twig Components in an HTML string.
     *
     * @param  string $html
     *   An HTML string.
     * @return string
     *   The HTML string with rendered Twig Components.
     */
    public function render($html)
    {
        // $this->styleRegistry = [];
        $this->renderedTags = [];
        $document = $this->createDocument($html, false);
        $xpath = new \DOMXPath($document);
        /** @var \DOMElement $node */
        foreach ($xpath->query('//*[@data-ssr-content]') as $node) {
            $node->removeAttribute('data-ssr-content');
        }
        $this->renderTwigComponents($document);
        // $this->appendComputedStyles($document);

        return trim($document->saveHTML());
    }

    /**
     * Returns an array tags names that were rendered in the last render call.
     *
     * @return string[]
     *   An array tags names.
     */
    public function getRenderedTags()
    {
        return $this->renderedTags;
    }

    /**
     * Creates a DOMDocument from HTML.
     *
     * @param string $html
     *   HTML to append to the DOMNode.
     * @param boolean $wrapper
     *   Whether or not to wrap the HTML string. Defaults to TRUE.
     * @return \DOMDocument
     *   The DOMDocument.
     */
    protected function createDocument($html, $wrapper = true)
    {
        if ($wrapper) {
            $html = '<wrapper>' . $html . '</wrapper>';
        }

        $document = new \DOMDocument();
        // $document = new IvoPetkov\HTML5DOMDocument();
        $document->formatOutput = false;
        $document->strictErrorChecking = false;


        // $document = new \IvoPetkov\HTML5DOMDocument();
        // @$document->loadHTML($html, LIBXML_NOWARNING | LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED | LIBXML_NOERROR);
        //

        @$document->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        // @$document->loadHTML($html);

        return $document;
    }

    /**
     * Appends arbitrary HTML to a given DOMNode.
     *
     * @param string $html
     *   HTML to append to the DOMNode.
     * @param \DOMNode &$node
     *   The DOMNode
     */
    protected function appendHTML($html, &$node)
    {
        $tempDocument = $this->createDocument($html);
        /** @var \DOMNode $child */
        foreach ($tempDocument->firstChild->childNodes as $child) {
            $node->appendChild($node->ownerDocument->importNode($child, true));
        }
    }

    /**
     * Prepends computed component styles to a document.
     *
     * @param \DOMDocument $document
     *   The DOMDocument.
     */
    protected function appendComputedStyles($document)
    {
        $css = implode("\n", $this->styleRegistry);
        if (!empty($css)) {
            $styles = $document->createElement('style', $css);
            $head = $document->getElementsByTagName('head');
            $body = $document->getElementsByTagName('body');
            if ($head->length) {
                $head->item(0)->appendChild($styles);
            } elseif ($body->length) {
                $document->insertBefore($styles, $body->item(0)->firstChild);
            } else {
                $document->firstChild->insertBefore($styles, $document->firstChild->firstChild);
            }
        }
    }

    /**
     * Renders Twig Components recursively based on a DOM entrypoint.
     *
     * @param \DOMElement|\DOMDocument &$element
     *   The element to parse and traverse.
     */
    protected function renderTwigComponents(&$element)
    {
        foreach ($this->tagTemplates as $tag_name => $template_name) {
            /** @var \DOMElement $tag */
            foreach ($element->getElementsByTagName($tag_name) as $tag) {
                $this->renderedTags[$tag_name] = $tag_name;
                if ($tag->hasAttribute('data-ssr')) {
                    continue;
                }
                $context = $this->getContext($tag);
                $render = $this->twigEnvironment->render($template_name, $context);
                $this->preserveChildNodes($tag);
                $original_tag = $tag->cloneNode(true);
                $tag->textContent = '';
                $this->appendHTML($render, $tag);
                $this->renderSlots($tag, $original_tag);
                // $this->renderStyles($tag);
                $tag->setAttribute('data-ssr', 'true');
                $this->renderTwigComponents($tag);
            }
        }
    }

    /**
     * Removes inline style tags, storing their rules for later rendering.
     *
     * @param \DOMElement &$node
     *   The rendered Twig template as a DOMNode.
     */
    protected function renderStyles($node)
    {
        $styles = '';
        /** @var \DOMNode $style */
        foreach ($node->getElementsByTagName('style') as $style) {
            $parser = new CSSParser($style->textContent);
            $css = $parser->parse();
            /** @var \Sabberworm\CSS\RuleSet\DeclarationBlock $block */
            foreach ($css->getAllDeclarationBlocks() as $block) {
                /** @var \Sabberworm\CSS\Rule\Rule $rule */
                foreach ($block->getRules() as $rule) {
                    $rule->setIsImportant(true);
                }
                /** @var \Sabberworm\CSS\Property\Selector $selector */
                foreach ($block->getSelectors() as $selector) {
                    $selector_string = $selector->getSelector();
                    if (preg_match('/^:host/', $selector_string) !== 0) {
                        $new_selector = preg_replace('/^:host\(([^)]+)\)/', $node->tagName . '$1', $selector_string);
                        $new_selector = preg_replace('/^:host/', $node->tagName, $new_selector);
                    } else {
                        $new_selector = $node->tagName . ' ' . $selector_string;
                    }
                    $selector->setSelector($new_selector);
                }
            }
            $styles .= $css->render();
            $style->parentNode->removeChild($style);
        }
        if (!empty($styles) && !isset($this->styleRegistry[$node->tagName])) {
            $this->styleRegistry[$node->tagName] = $styles;
        }
    }

    /**
     * Replaces slots form a rendered template with existing content.
     *
     * @param \DOMNode &$node
     *   The rendered Twig template as a DOMNode.
     * @param \DOMNode &$original_node
     *   The unmodified DOMNode.
     */
    protected function renderSlots($node, $original_node)
    {
        $xpath = new \DOMXPath($original_node->ownerDocument);
        $oldContent = $original_node->cloneNode(true);
        $default_slot = false;
        /** @var \DOMNode $slot */
        foreach ($xpath->query('.//slot', $node) as $slot) {
            if (!isset($slot->attributes['name'])) {
                $default_slot = $default_slot ?: $slot;
                continue;
            }
            $expression = './/*[@slot="' . $slot->attributes['name']->value . '"]';
            $replacement = $original_node->ownerDocument->createDocumentFragment();
            $matches = $xpath->query($expression, $oldContent);
            /** @var \DOMNode $match */
            foreach ($matches as $match) {
                $replacement->appendChild($match->cloneNode(true));
                $match->parentNode->removeChild($match);
            }
            if (!$replacement->hasChildNodes()) {
                $this->appendHTML($this->getChildHTML($slot), $replacement);
            }
            $slot->parentNode->replaceChild($replacement->cloneNode(true), $slot);
        }
        $replacement = $original_node->ownerDocument->createDocumentFragment();
        $this->appendHTML($this->getChildHTML($oldContent), $replacement);
        if ($default_slot) {
            if (!$replacement->hasChildNodes()) {
                $this->appendHTML($this->getChildHTML($default_slot), $replacement);
            }
            $default_slot->parentNode->replaceChild($replacement->cloneNode(true), $default_slot);
        }
        foreach ($xpath->query('.//slot', $node) as $slot) {
            $slot->parentNode->removeChild($slot);
        }
    }

    /**
     * Gets the HTML content of a DOMNode's children.
     *
     * @param \DOMNode $node
     *   The DOMNode
     *
     * @return string
     *   The HTML of all the child nodes.
     */
    protected function getChildHTML($node)
    {
        $html = '';
        foreach ($node->childNodes as $child) {
            $html .= $node->ownerDocument->saveHTML($child);
        }
        return $html;
    }

    /**
     * Ensures that child nodes of a component are preserved in an attribute.
     *
     * @param \DOMElement &$tag
     *   The DOMElement tag.
     */
    protected function preserveChildNodes(&$tag)
    {
        $original_content = $this->getChildHTML($tag);
        $tag->setAttribute('data-ssr-content', json_encode($original_content));
    }

    /**
     * Parses Twig template context from a DOM element's attributes.
     *
     * @param \DOMElement $tag
     *   The DOMElement tag.
     * @return array
     *   An array of template context.
     */
    protected function getContext($tag)
    {
        $context = [];
        /** @var \DOMAttr $attribute */
        foreach ($tag->attributes as $attribute) {
            $attribute_name = str_replace('-', '_', $attribute->name);
            $context[$attribute_name] = $attribute->value;
        }
        return $context;
    }
}