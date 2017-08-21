Place your test SCSS files in here. These files will be compiled into an `output` directory and those output files will be compared against our `controls`. If there is a difference, you will get a a diff of your `output` vs your `controls`.

Each individual piece you're testing, from a function to a mixin to general usage, should be easy to identify what it is from the output CSS. The general convention to follow is something like the following:

```scss
//////////////////////////////
// Functions
//////////////////////////////
/**
  * Function Name Function
**/
.function-name {
  /* Each permutation of input/output that is possible should get a CSS comment */
  /* No Defaulted Input */
  _test: "function-name(input)";
  _result: function-name(input);
  /* Defaulted Input */
  _test: "function-name(input, input2)";
  _result: function-name(input, input2);
}
//////////////////////////////
// Mixins
//////////////////////////////
/**
  * Mixin Name
**/
.mixin-name {
  /* Each permutation of input/output that is possible should get a CSS comment */
  /* No Defaulted Input */
  _test: "mixin-name(input)"
  @include mixin-name(input);
  /* Defaulted Input */
  _test: "mixin-name(input, input2)"
  @include mixin-name(input, input2);
}
```

You want representative examples of input/output. Don't be afraid to add tests as you need them, the more tests the better! It's very likely that, for complex systems, the total number of tests you write (and their related control) will outweigh your actual Compass framework.

You're also encouraged to have multiple files in multiple folders to break down what you're testing into chunks in order to test small, discrete pieces.
