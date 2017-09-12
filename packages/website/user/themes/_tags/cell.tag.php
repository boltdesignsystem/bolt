<?php

use \Drupal\Core\Template\Attribute;
use \PatternLab\PatternEngine\Twig\TwigUtil;


// Default attributes and inheritted data all cell components inherit (ex. base CSS class)
$GLOBALS['cell_attributes'] = array('class' => array('o-grid__item'));

// Crude way to track which instance of the component is being referenced so each component's unique data is encapsulated and merged together properly without bleeding over.
$GLOBALS['cell_counter'] = 0;



// Expose the D8 and Pattern Lab "create_attribute" function in case this custom Twig Tag gets loaded before the create_attribute Twig extension exists. 
if (!function_exists("createAttribute")) {
  function createAttribute($attributes = []) {
    return new Attribute($attributes);
  }
}





if (!function_exists("cellFunctionToCall")) {
  
  function cellFunctionToCall(){
     $params = func_get_args();
     $contents = array_shift($params);
     
     
    // If paramaters exist for this particular component instance, merge everything together
    if ($params){
      $new_cell_attributes = array("class" => array("")); // Store inline strings
      $GLOBALS['cell_counter'] = $GLOBALS['cell_counter'] + 1; //Track the current cell instance
      $GLOBALS['cell_props'][ $GLOBALS['cell_counter'] ] = array(); //Store misc data that isn't attributes 
      $GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ] = array(); // Store custom attributes passed in
      
      // Loop through any non-string data paramaters passed into the component
      if (!function_exists("displayCellRecursiveResults")) {
        function displayCellRecursiveResults($arrayObject) {
          foreach($arrayObject as $key=>$value) {
            
            // Handle attributes objects a little differently so we can merge this directly with the inheritted attrs
            if(is_array($value) && $key == 'attributes') {
              
              $GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ] = array_merge_recursive($GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ], $value);

            } elseif (is_array($value)) {
              displayCellRecursiveResults($value);
            } elseif(is_object($value)) {
              displayCellRecursiveResults($value);
            } else {
               $GLOBALS['cell_props'][ $GLOBALS['cell_counter'] ] = array_merge_recursive($GLOBALS['cell_props'][ $GLOBALS['cell_counter'] ], array($key => $value));
            }
          }
        }
      }

      
      // Handle legacy way of handling data via a simple string on the component (ex. {% cell 'u-1/1' %} ) 
      foreach ($params as $key => $value){
        if (gettype($value) == 'string') {
          $classes = explode(" ", $value);
          $new_cell_attributes = array_merge_recursive(array("class" => $classes), $new_cell_attributes);
        } elseif (gettype($value) == 'array') {
          displayCellRecursiveResults($value);
        } else {
          // Catch all for everything else.
        }
      }
    }
    
    
    // Do any custom attributes already exist? If not, set an empty array so it can get merged (below) 
    if (!isset($GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ])) {
      $GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ] = array();
    }
    
    // After capturing and merging in all string + array parameters on the component instance, take the unique set of data and merge it with the defaults
    $GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ] = array_merge_recursive($GLOBALS['cell_attributes'], $GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ]);
    
    
    // Handle instances where no vanilla string parameters (not in an array) are directly added to a component
    if (isset($new_cell_attributes)){
      $merged_attributes = array_merge_recursive($GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ], $new_cell_attributes);
    } elseif (isset($GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ])) {
      $merged_attributes = $GLOBALS['cell_attributes_custom'][ $GLOBALS['cell_counter'] ];
    } else {
      $merged_attributes = array();
    }
    
    // Finally, handle instances where literally zero data or props got passed into the component
    if (!isset($GLOBALS['cell_props'][ $GLOBALS['cell_counter'] ])){
      $GLOBALS['cell_props'][ $GLOBALS['cell_counter'] ] = array();
    }
    
    
    // Run the captured attributes through D8's createAttribute function, prior to rendering
    $attributes = createAttribute($merged_attributes);
    
    //@TODO: check if this PL template instance exists, otherwise load the default Twig string loader.
    $stringLoader = \PatternLab\Template::getStringLoader();
    
    //Setup data into 2 groups: attributes + everything else that we're going to namespace under the component name.
    $data         = array(
      "attributes" => $attributes,
      "cell" => $GLOBALS['cell_props'][ $GLOBALS['cell_counter'] ]
    );
    
    //@TODO: pull in template logic used here from external Twig file.
    $string       = "
      {% set classes = [] %}
      
      <div {{ attributes.addClass(classes) | raw }}>
      $contents
      </div>
    ";
    
    // Pre-render the inline Twig template + the data we've merged and normalized
    $rendered = $stringLoader->render(array("string" => $string, "data" => $data));

    echo $rendered, PHP_EOL;
  }
}







// Custom Wrapper Twig Tag Node
if (!class_exists("Project_cell_Node", false)) {
  
    class Project_cell_Node extends Twig_Node {
      
      public function __construct($params, $lineno = 0, $tag = null){
        parent::__construct(array ('params' => $params), array (), $lineno, $tag);
      }

      public function compile(\Twig_Compiler $compiler) {
      $count = count($this->getNode('params'));

      $compiler
         ->addDebugInfo($this);
         
      for ($i = 0; ($i < $count); $i++)
      {
         // argument is not an expression (such as, a \Twig_Node_Textbody)
         // we should trick with output buffering to get a valid argument to pass
         // to the cellFunctionToCall() function.
         if (!($this->getNode('params')->getNode($i) instanceof \Twig_Node_Expression))
         {
            $compiler
               ->write('ob_start();')
               ->raw(PHP_EOL);

            $compiler
               ->subcompile($this->getNode('params')->getNode($i));

            $compiler
               ->write('$_mytag[] = ob_get_clean();')
               ->raw(PHP_EOL);
         }
         else
         {
            $compiler
               ->write('$_mytag[] = ')
               ->subcompile($this->getNode('params')->getNode($i))
               ->raw(';')
               ->raw(PHP_EOL);
         }
      }

      $compiler
         ->write('call_user_func_array(')
         ->string('cellFunctionToCall')
         ->raw(', $_mytag);')
         ->raw(PHP_EOL);

      $compiler
         ->write('unset($_mytag);')
         ->raw(PHP_EOL);
   }
  }
}




// Custom Token Parser for Wrapper component
if (!class_exists("Project_cell_TokenParser", false)) {

    class Project_cell_TokenParser extends Twig_TokenParser {

      public function parse(Twig_Token $token) {
     
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

             switch ($tag)
             {
                case 'endcell':
                   $continue = false;
                   break;
                default:
                   throw new \Twig_Error_Syntax(sprintf('Unexpected end of template. Twig was looking for the following tags "endcell" to close the "cell" block started at line %d)', $lineno), -1);
             }

             // you want $body at the beginning of your arguments
             array_unshift($params, $body);

             // if your endmytag can also contains params, you can uncomment this line:
             // $params = array_merge($params, $this->getInlineParams($token));
             // and comment this one:
             $stream->expect(\Twig_Token::BLOCK_END_TYPE);
          }

          return new Project_cell_Node(new \Twig_Node($params), $lineno, $this->getTag());
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
       return "cell";
   }

   /**
    * Callback called at each tag name when subparsing, must return
    * true when the expected end tag is reached.
    *
    * @param \Twig_Token $token
    * @return bool
    */
   public function decideMyTagFork(Twig_Token $token) {
      return $token->test(array("cell", "endcell"));
   }

    
 }
}

?>
