<?php

// these files are loaded three times and we can't re-set a class
if (!class_exists("Project_grid_Node", false)) {

    class Project_grid_Node extends Twig_Node {

      private $class = "";

      public function setClass($class){
          $this->class = $class;
      }


      public function compile(Twig_Compiler $compiler){
        // $compiler->addDebugInfo($this);
        // $compiler->write("echo \"<div class='o-grid'>\";")->raw(PHP_EOL);
        // parent::compile($compiler);
        // $compiler->write("echo \"</div>\";")->raw(PHP_EOL);


        $compiler->addDebugInfo($this);
        $compiler->write("echo \"<div class='o-grid ");

        $class = " ";
        if($this->class instanceof \Twig_Node_Expression_Constant) {
            $class = preg_replace("/\b(lg|md|sm|xs)([0-9]+)\b/", 'col-$1-$2', $this->class->getAttribute("value"));
        }
        $compiler->raw($class);

        $compiler->raw("'>\";")->raw(PHP_EOL);
        parent::compile($compiler);
        $compiler->write("echo \"</div>\";")->raw(PHP_EOL);

      }

    }

}

// these files are loaded three times and we can't re-set a class
if (!class_exists("Project_grid_TokenParser", false)) {

    class Project_grid_TokenParser extends Twig_TokenParser {

      public function parse(Twig_Token $token)
   {


      //  $stream = $this->parser->getStream();
      //  $stream->expect(Twig_Token::BLOCK_END_TYPE);
      //  $inheritanceIndex = 1;
      //  $nodes = array();
      //  $classes = array();
      //  $returnNode = null;
      $inheritanceIndex = 1;

      $stream = $this->parser->getStream();

      $nodes = array();
      $classes = array();
      $returnNode = null;



       if($stream->test(Twig_Token::STRING_TYPE)) {
           $classes[$inheritanceIndex] = $this->parser->getExpressionParser()->parseStringExpression();
       } else {
           $classes[$inheritanceIndex] = "col-md-12";
       }

       $stream->expect(Twig_Token::BLOCK_END_TYPE);
       $continue = true;



       while($continue) {

           $content = $this->parser->subparse(array($this, 'decideMyTagFork'));
           $nodes[$inheritanceIndex][] = $content;
           $tag = $stream->next()->getValue();
          //  $stream->expect(Twig_Token::BLOCK_END_TYPE);
           switch($tag) {
               case "grid":
                  //  $inheritanceIndex++;
                   //
                  //  if($stream->test(Twig_Token::STRING_TYPE)) {
                  //      $classes[$inheritanceIndex] = $this->parser->getExpressionParser()->parseStringExpression();
                  //  } else {
                  //      $classes[$inheritanceIndex] = "col-md-12";
                  //  }
                   //
                  //  break;
                  $inheritanceIndex++;
                  if($stream->test(Twig_Token::STRING_TYPE)) {
                      $classes[$inheritanceIndex] = $this->parser->getExpressionParser()->parseStringExpression();
                  } else {
                      $classes[$inheritanceIndex] = "col-md-12";
                  }
                  break;
               case "endgrid":
                  //  $currentNodes = $nodes[$inheritanceIndex];
                  //  $class = $classes[$inheritanceIndex];
                  //  unset($nodes[$inheritanceIndex]);
                  //  unset($classes[$inheritanceIndex]);
                  //  $inheritanceIndex--;
                  //  if($inheritanceIndex == 0) {
                  //      $returnNode = new Project_grid_Node($currentNodes);
                  //     $returnNode->setClass($class);
                  //     $continue = false;
                  //     //  break 2;
                  //  } else {
                  //      $nodes[$inheritanceIndex][] = new Project_grid_Node($currentNodes);
                  //      $node->setClass($class);
                  //      $nodes[$inheritanceIndex][] = $node;
                  //  }
                  //  break;
                  $currentNodes = $nodes[$inheritanceIndex];
                  $class = $classes[$inheritanceIndex];
                  unset($nodes[$inheritanceIndex]);
                  unset($classes[$inheritanceIndex]);
                  $inheritanceIndex--;
                  if($inheritanceIndex == 0) {
                      $returnNode = new Project_grid_Node($currentNodes);
                      $returnNode->setClass($class);
                      $continue = false;
                  } else {
                      $node = new Project_grid_Node($currentNodes);
                      $node->setClass($class);
                      $nodes[$inheritanceIndex][] = $node;
                  }
                  break;
               default:
                   throw new Twig_Error_Syntax(sprintf('Unexpected end of template. Twig was looking for the following tags "%s" to close the "%s" block started at line %d)', "endgrid", "grid", $this->startLine), -1);
           }
           $stream->expect(Twig_Token::BLOCK_END_TYPE);
       }

       return $returnNode;
   }

   public function getTag()
   {
       return "grid";
   }

   /**
    * Callback called at each tag name when subparsing, must return
    * true when the expected end tag is reached.
    *
    * @param \Twig_Token $token
    * @return bool
    */
   public function decideMyTagFork(Twig_Token $token)
   {
       return $token->test(array("grid", "endgrid"));
   }

    }

}

?>
