<?php

// use Symfony\Component\Process\Process;
// use NestedJsonFlattener\Flattener\Flattener;


// $dataJson = '{
// 	"name": "This is a name",
// 	"nested": {
// 		"type": "This is a type",
// 		"location": "Earth",
// 		"geo": {
// 			"latitude": "1234567890",
// 			"longitude": "0987654321"
// 		},
// 		"primitivesCollection":[123, 456, 789]
// 	}
// }';


// print_r($flat);
// use Symfony\Component\Yaml\Yaml;
// use JsonSchema\Validator;
// use JsonSchema\Constraints\Constraint;
// https://github.com/justinrainbow/json-schema

// Usage:
// <div>Component</div>
//{{ validate_data('@components/hero-schema.json', _self) }}
// $function = new Twig_SimpleFunction('validate_data_schema', function (Twig_Environment $env, $context, $schema_path, $twig_self) {
// $function = new Twig_SimpleFunction('ssr', function (Twig_Environment $env, $context, $schema_path, $twig_self) {

$function = new Twig_SimpleFunction('ssr', function (Twig_Environment $env, $context, $component, $data) {



// <?php
$v8 = new V8Js();
// Echo a test string to verify that v8js is working.
$v8->test = 'If you read this, v8js is working!';
$v8->executeString('print("\n" + PHP.test + "\n\n")');
// Load required Stencil code. This will fail, for now. :-)
// Vaguely based on https://gist.github.com/yyx990803/9bdff05e5468a60ced06c29c39114c6b#environment-agnostic-ssr
// $renderer_source = file_get_contents(__DIR__ . '/node_modules/@stencil/core/server/index.js');
// $component_source = file_get_contents(__DIR__ . '/dist/collection/components/my-component/my-component.js');
// $app_source = file_get_contents(__DIR__ . '/dist/collection/components/my-component/my-component.js');


// $v8->executeString($renderer_source);
// $v8->executeString($component_source);
// $html = '<my-component first="loving" last="v8js!"></my-component>';
// $rendered_html = $v8->executeString('// Magic render call goes here...');
// We expect something like <my-component first="loving" last="v8js!"><div>Hello, World! I'm loving v8js!</div></my-component>
// echo "Returned HTML from Stencil: $rendered_html\n";




    // echo $component;
    // print_r($data);

    // print_r($context);

    // Combine local + global pattern data.
		// $data = array();
		// $globalData = $context;
		// $localData = $props;

		// if (PatternData::getOption($docPartial) && isset(PatternData::getOption($docPartial)["data"])){
		// 	$localData = PatternData::getOption($docPartial)["data"];
		// }

		// if (!empty($localData)){
		// 	$data = array_replace_recursive($globalData, $localData);
		// } else {
		// 	$data = $globalData;
		// }

    // exec('node ', $out, $result)
		// Render the markdown content as a pattern, piping in the pattern-specific data from above.
		// $text = $patternLoader->render(array(
		// 	"pattern" => $text,
		// 	"data" => $data
    // ));
// {'props': props}

// with: {

// }

  // print_r(json_encode($data));
    // $flattener = new NestedJsonFlattener\Flattener\Flattener();
    // $flattener->setJsonData(json_encode($data));
    // $flat = $flattener->getFlatData();


    // $processCommand = 'node ../renderer/app.js ' . $tagFile . ' ' . $coords[0] . ' ' . $coords[1];
    // $processCommand = "node " . $component . json_encode($data['props']);


    // $processCommand = "npx babel " . $component . " " . json_encode($props);
    // $processCommand = "npx babel-node --preset node_modules/@bolt/babel-preset-bolt " . $component;
    // $process = new Process($processCommand);
		// $process->run();
    // $buffer = $process->getOutput();

    // print_r($buffer);
		// if (!$process->isSuccessful()) {
		//     throw new \RuntimeException($process->getErrorOutput());
    // }


    // return $buffer;


    // $process = new Process('riot ' . $tagFile);
		// $process->run();
		// if (!$process->isSuccessful()) {
		//     throw new \RuntimeException($process->getErrorOutput());
		// }
		// $scriptFile = trim(explode('>',$process->getOutput())[1]);
		// // $buffer .= '<script src="/' . $scriptFile .'"></script>';
    // 	$buffer .= PHP_EOL . '<!-- end riot -->';
		// return $buffer;

    // if (isset($context['disable_validate_data_schema']) && $context['disable_validate_data_schema'])  {
    //     return '';
    // }

    // $output = '';

    // /**
    //  * @var \Twig_Template $template
    //  * @url https://twig.symfony.com/api/1.x/Twig_Template.html
    //  * */
    // $template = $env->resolveTemplate($schema_path);

    // /**
    //  * @var \Twig_Source $source
    //  * @url https://twig.symfony.com/api/1.x/Twig_Source.html
    //  */
    // $source = $template->getSourceContext();

    // /** @var string $full_path */
    // $full_path = $source->getPath();

    // $schema = [];

    // // @todo error handling for no file
    // $file_string = file_get_contents($full_path);
    // $file_type = pathinfo($full_path)['extension'];

    // switch ($file_type) {
    //     case 'json':
    //         $schema = json_decode($file_string);
    //         break;
    //     case 'yaml' || 'yml':
    //         $schema = Yaml::parse($file_string);
    //         break;
    // }

    // $validator = new Validator;
    // $validator->validate($context, $schema, Constraint::CHECK_MODE_TYPE_CAST);

//     if (!$validator->isValid()) {
//         $messages = [];
//         $messages[] = '"' . $twig_self . '" had data validation errors against it\'s schema.';
//         foreach ($validator->getErrors() as $error) {
//             $messages[] = sprintf("`%s` %s", $error['property'], $error['message']);
//         }
//         $messages[] = ''; // just a little space
//         $message_to_log = join('
// ', $messages);

        // $to_log = [];
        //         'message' => $message_to_log,
        //         'details' => [
        //                 'template_path' => $env->resolveTemplate($twig_self)->getSourceContext()->getPath(),
        //                 'data_passed_to_template' => $context,
        //                 'schema' => $schema,
        //                 'errors' => $validator->getErrors(),
        //         ],
        // ];

//         $output = '
// <!--<script type="application/json">' . json_encode($to_log) . '</script>-->
// <script>
//     (function () {
//         var me = document.currentScript;
//         var jsonScriptTag = me.previousElementSibling.innerHTML;
//         var data = JSON.parse(jsonScriptTag);
//         // assuming component is two elements before this - i.e. run `{# validate_data_schema() #}` after component
//         var component = me.previousElementSibling.previousElementSibling;
//         console.error(data.message, data.details, component);
//     })();
// </script>
//     ';
//     }

//     return $output;
}, [
        'needs_environment' => true,
        'needs_context' => true
        // 'is_safe' => ['html']
]);

?>