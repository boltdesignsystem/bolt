<?php

namespace Bolt\Layout;

use Bolt\Layout\GridTagNode;

/**
 * @author Salem Ghoweri
 */

class GridTagTokenParser extends \Twig_TokenParser {

   public function parse(\Twig_Token $token) {

    $lineno = $token->getLine();
    $stream = $this->parser->getStream();
    $continue = true;


    $inheritanceIndex = 1;

    $stream = $this->parser->getStream();

    $nodes = array();
    $classes = array();
    $returnNode = null;


    // recovers all inline parameters close to your tag name
    $params = array_merge(array (), $this->getInlineParams($token));

    while ($continue) {
      // create subtree until the decideMyTagFork() callback returns true
      $body = $this->parser->subparse(array ($this, 'decideMyTagFork'));

      // I like to put a switch here, in case you need to add middle tags, such
      // as: {% mytag %}, {% nextmytag %}, {% endmytag %}.
      $tag = $stream->next()->getValue();

      switch ($tag){
        case 'endgrid':
          $continue = false;
          break;
        default:
          throw new \Twig_Error_Syntax(sprintf('Unexpected end of template. Twig was looking for the following tags "endgrid" to close the "grid" block started at line %d)', $lineno), -1);
      }

      // you want $body at the beginning of your arguments
      array_unshift($params, $body);

      // if your endmytag can also contains params, you can uncomment this line:
      // $params = array_merge($params, $this->getInlineParams($token));
      // and comment this one:
      $stream->expect(\Twig_Token::BLOCK_END_TYPE);
    }

    return new GridTagNode(new \Twig_Node($params), $lineno, $this->getTag());
  }

      /**
    * Recovers all tag parameters until we find a BLOCK_END_TYPE ( %} )
    *
    * @param \Twig_Token $token
    * @return array
    */
   public function getInlineParams(\Twig_Token $token) {
      $stream = $this->parser->getStream();
      $params = array ();
      while (!$stream->test(\Twig_Token::BLOCK_END_TYPE)) {
        $params[] = $this->parser->getExpressionParser()->parseExpression();
      }
      $stream->expect(\Twig_Token::BLOCK_END_TYPE);
      return $params;
   }


   public function getTag() {
       return "grid";
   }

   /**
    * Callback called at each tag name when subparsing, must return
    * true when the expected end tag is reached.
    *
    * @param \Twig_Token $token
    * @return bool
    */
   public function decideMyTagFork(\Twig_Token $token) {
      return $token->test(array("grid", "endgrid"));
   }
}