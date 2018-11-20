<?php
/**
 * Format HTML class
 */
namespace Bolt;

class FormatHTML {
    /*
     * @var
     */
    private $input = null;

    /*
     * @var
     */
    private $output = null;

    /*
     * @var
     */
    private $in_tag = false;

    /*
     * @var
     */
    private $in_comment = false;

    /*
     * @var
     */
    private $in_content = false;

    /*
     * @var
     */
    private $inline_tag = false;

    /*
     * @var
     */
    private $i = 0;

    /*
     * @var
     */
    private $indent_depth = 0;

    /*
     * @var
     */
    private $indent_type = "\t";
    
    /**
     * Static interface
     * - Allows you to call the method witout initialising the class first
     *
     * <code>
     *  // use spaces at 4 length
     *  echo Format::HTML('Unformatted HTML string');
     *
     *  // use spaces at 2 length
     *  echo Format::HTML('Unformatted HTML string', true, 2);
     *
     *  // use tabs
     *  echo Format::HTML('Unformatted HTML string', false);
     * </code>
     *
     * @param  string $input          HTML which is to be processed
     * @param  bool   $use_spaces     Use spaces instead of tabs
     * @param  int    $indent_length  Length of indent spacing
     * @return string
     */
    public static function HTML($input, $use_spaces = true, $indent_length = 4)
    {
        $input = preg_replace('/\s\s+/', " ", $input);
        return (new self)->process($input, $use_spaces, $indent_length);
    }
    
    /**
     * Process/Format HTML
     *
     * <code>
     *  $format = new Format();
     *
     *  // use spaces at 4 length
     *  echo $format->HTML('Unformatted HTML string');
     *
     *  // use spaces at 2 length
     *  echo $format->HTML('Unformatted HTML string', true, 2);
     *
     *  // use tabs
     *  echo $format->HTML('Unformatted HTML string', false);
     * </code>
     *
     * @param  string $input          HTML which is to be processed
     * @param  bool   $use_spaces     Use spaces instead of tabs
     * @param  int    $indent_length  Length of indent spacing
     * @return string
     */
    private function process($input, $use_spaces = true, $indent_length = 4)
    {
        if (!is_string($input)) {
            throw new \InvalidArgumentException('1st argument must be a string');
        }

        if (!is_int($indent_length)) {
            throw new \InvalidArgumentException('3rd argument must be an integer');
        }

        if ($indent_length < 0) {
            throw new \InvalidArgumentException('3rd argument must be greater or equals 0');
        }

        if ($use_spaces) {
            $this->indent_type = str_repeat(' ', $indent_length);
        }

        $this->input = $input;
        $this->output = null;

        $i = 0;

        if (preg_match('/<\!doctype/i', $this->input)) {
            $i = strpos($this->input, '>') + 1;
            $this->output .= substr($this->input, 0, $i);
        }

        for ($this->i = $i; $this->i < strlen($this->input); $this->i++) {
            if ($this->in_comment) {
                $this->parse_comment();
            } elseif ($this->in_tag) {
                $this->parse_inner_tag();
            } elseif ($this->inline_tag) {
                $this->parse_inner_inline_tag();
            } else {
                if (preg_match('/[\r\n\t]/', $this->input[$this->i])) {
                    continue;
                } elseif ($this->input[$this->i] == '<') {
                    if (!$this->is_inline_tag()) {
                        $this->in_content = false;
                    }
                    $this->parse_tag();
                } elseif (!$this->in_content) {
                    if (!$this->inline_tag) {
                        $this->output .= "\n" . str_repeat($this->indent_type, $this->indent_depth);
                    }
                    $this->in_content = true;
                }
                $this->output .= $this->input[$this->i];
            }
        }

        return $this->output;
    }

    /**
     * @return void
     */
    private function parse_comment()
    {
        if ($this->is_end_comment()) {
            $this->in_comment = false;
            $this->output .= '-->';
            $this->i += 3;
        } else {
            $this->output .= $this->input[$this->i];
        }
    }

    /**
     * @return void
     */
    private function parse_inner_tag()
    {
        if ($this->input[$this->i] == '>') {
            $this->in_tag = false;
            $this->output .= '>';
        } else {
            $this->output .= $this->input[$this->i];
        }
    }

    /**
     * @return void
     */
    private function parse_inner_inline_tag()
    {
        if ($this->input[$this->i] == '>') {
            $this->inline_tag = false;
            $this->decrement_tabs();
            $this->output .= '>';
        } else {
            $this->output .= $this->input[$this->i];
        }
    }

    /**
     * @return void
     */
    private function parse_tag()
    {
        if ($this->is_comment()) {
            $this->output .= "\n" . str_repeat($this->indent_type, $this->indent_depth);
            $this->in_comment = true;
        } elseif ($this->is_end_tag()) {
            $this->in_tag = true;
            $this->inline_tag = false;
            $this->decrement_tabs();
            if (!$this->is_inline_tag() && !$this->is_tag_empty()) {
                $this->output .= "\n" . str_repeat($this->indent_type, $this->indent_depth);
            }
        } else {
            $this->in_tag = true;
            if (!$this->in_content && !$this->inline_tag) {
                $this->output .= "\n" . str_repeat($this->indent_type, $this->indent_depth);
            }
            if (!$this->is_closed_tag()) {
                $this->indent_depth++;
            }
            if ($this->is_inline_tag()) {
                $this->inline_tag = true;
            }
        }
    }

    /**
     * @return bool
     */
    private function is_end_tag()
    {
        for ($i = $this->i; $i < strlen($this->input); $i++) {
            if ($this->input[$i] == '<' && $this->input[$i + 1] == '/') {
                return true;
            } elseif ($this->input[$i] == '<' && $this->input[$i + 1] == '!') {
                return true;
            } elseif ($this->input[$i] == '>') {
                return false;
            }
        }
        return false;
    }

    /**
     * @return void
     */
    private function decrement_tabs()
    {
        $this->indent_depth--;
        if ($this->indent_depth < 0) {
            $this->indent_depth = 0;
        }
    }

    /**
     * @return bool
     */
    private function is_comment()
    {
        if (
            $this->input[$this->i] == '<' &&
            $this->input[$this->i + 1] == '!' &&
            $this->input[$this->i + 2] == '-' &&
            $this->input[$this->i + 3] == '-'
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return bool
     */
    private function is_end_comment()
    {
        if (
            $this->input[$this->i] == '-' &&
            $this->input[$this->i + 1] == '-' &&
            $this->input[$this->i + 2] == '>'
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return bool
     */
    private function is_tag_empty()
    {
        $tag = $this->get_current_tag($this->i + 2);
        $in_tag = false;

        for ($i = $this->i - 1; $i >= 0; $i--) {
            if (!$in_tag) {
                if ($this->input[$i] == '>') {
                    $in_tag = true;
                } elseif (!preg_match('/\s/', $this->input[$i])) {
                    return false;
                }
            } else {
                if ($this->input[$i] == '<') {
                    if ($tag == $this->get_current_tag($i + 1)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * @param  int    $i String index of input
     * @return string
     */
    private function get_current_tag($i)
    {
        $tag = '';

        for ($i; $i < strlen($this->input); $i++) {
            if ($this->input[$i] == '<') {
                continue;
            } elseif ($this->input[$i] == '>' or preg_match('/\s/', $this->input[$i])) {
                return $tag;
            } else {
                $tag .= $this->input[$i];
            }
        }

        return $tag;
    }

    /**
     * @return bool
     */
    private function is_closed_tag()
    {
        $tags = array(
            'meta', 'link', 'img', 'hr', 'br', 'input',
        );

        $tag = '';

        for ($i = $this->i; $i < strlen($this->input); $i++) {
            if ($this->input[$i] == '<') {
                continue;
            } elseif (preg_match('/\s/', $this->input[$i])) {
                break;
            } else {
                $tag .= $this->input[$i];
            }
        }

        if (in_array($tag, $tags)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return bool
     */
    private function is_inline_tag()
    {
        $tags = array(
            'title',
            'a',
            'span',
            'abbr',
            'acronym',
            'b',
            'basefont',
            'bdo',
            'big',
            'cite',
            'code',
            'dfn',
            'em',
            'font',
            'i',
            'kbd',
            'q',
            's',
            'samp',
            'small',
            'strike',
            'strong',
            'sub',
            'sup',
            'textarea',
            'tt',
            'u',
            'var',
            'del',
            'pre'
        );

        $tag = '';

        for ($i = $this->i; $i < strlen($this->input); $i++) {
            if ($this->input[$i] == '<' or $this->input[$i] == '/') {
                continue;
            } elseif (preg_match('/\s/', $this->input[$i]) or $this->input[$i] == '>') {
                break;
            } else {
                $tag .= $this->input[$i];
            }
        }

        if (in_array($tag, $tags)) {
            return true;
        } else {
            return false;
        }
    }
}