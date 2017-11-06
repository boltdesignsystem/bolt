const extend = require('extend');
const request = require('superagent');
const serverUrl = 'http://127.0.0.1:8000/';
const pretty = require('pretty');

// Hard-coded example Global data
const globalData = {
  'colors': {
    'green': '#008000',
    'teal': '#008080',
    'blue': '#0000FF'
  }
}


// Post the template reference (or inlined template) + local data to the PHP server and grab the response
function render(template, localData) {
  const data = extend({}, localData, globalData);

  const options = {
    template: template,
    data
  }

  request
    .post(serverUrl)
    .send(JSON.stringify(options)) // sends a JSON post body
    .end((err, res) => {
      const result = pretty(res.text);
      console.log(result);
    });
}




// Simple test rendering a link element with no local data
// render('@bolt/link-element.twig', {});


// Simple test rendering a link element - but with local data added
// render('@bolt/link-element.twig', {
//   name: 'Salem'
// });


// More complex nested pattern that uses multiple Twig extensions + inheritted global Twig data set via a Twig globals extension
var cardData = require('./src/_patterns/02-components/bolt-card/demo/card.json');
render('@bolt/card.twig', cardData);


// Try rendering an entire page mockup via Twig namespace -- includes internal calls to the PL StringLoader
// var localData = {};
// render('@bolt/bolt-homepage.twig', localData);


// Now try rendering the same page but via the template path inside of the _patterns folder -- includes internal calls to the PL StringLoader
// var localData = {};
// render('04-pages/bolt-homepage/bolt-homepage.twig', localData);


// Example of rendering an inline template, even though we're still using PL's Pattern Loader for everything
// render('<h1>Hello {{ colors.green }}!</h1> {% include "@bolt/link.twig" %}', {});






