/*!
 * Simple Layout Rendering for Pattern Lab
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * @requires ../../node_modules/twig/twig.js
 */

const Twig = require('twig/twig.js');
const Hogan = require('hogan.js');
const loadjs = require('loadjs');


loadjs('/styleguide/data/patternlab-data.js', {
  success: function() {
    renderTemplates();
  },
  error: function(depsNotFound) {
    //console.log("fail");
  }
});


function renderTemplates(){
  // try {
    // Prep Twig for rendering.
    var twig = Twig.twig;
    
    // load the inlined Pattern Nav and ish controls templates
    var patternNavTemplate = document.getElementById("pl-pattern-nav-template").innerHTML,
        ishControlsTemplate = document.getElementById("pl-ish-controls-template").innerHTML;
    
    // Grab the two targets for injecting the rendered templates back onto the page.
    var patternLabNavTarget = document.getElementById("pl-pattern-nav-target"),
        sgControlsTarget = document.getElementById("sg-controls");
    
    var patternNavRendered,
        patternNavTwigTemplate,
        ishTemplateCompiled,
        ishTemplateRendered;
    
    
    // Assign the Pattern Nav template code to a Twig instance.
    patternNavTwigTemplate = twig({
      data: patternNavTemplate
    });
    
    
    // Render the twig template with the global navItems data available on the window. TODO: make sure this exists before assuming Twig can render something.
    patternNavRendered =  patternNavTwigTemplate.render(navItems);
    
    
    // load the inlined ish Controls template
    // var ishTemplate         = ishControlsTemplate.innerHTML;
    ishTemplateCompiled = Hogan.compile(ishControlsTemplate);
    ishTemplateRendered = ishTemplateCompiled.render(ishControls);
    
    
    // Inject the rendered Twig templates back onto the page
    patternLabNavTarget.innerHTML = patternNavRendered,
    sgControlsTarget.innerHTML = ishTemplateRendered;
    
    
    // Dispatcher.addListener('setupNavigation', styleguideInit());
    Dispatcher.trigger('setupNavigation');
    
  // } catch(e) {
  //   
  //   var message = "<h1>Nothing Here Yet</h1><p>Please generate your site before trying to view it.</p>";
  //   document.getElementById("pl-pattern-nav-target").innerHTML = message;
  //   
  // }
}
