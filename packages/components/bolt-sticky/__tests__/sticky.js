import { renderString } from '../../../testing/testing-helpers';

describe('<bolt-sticky> Component', () => {
  test('basic usage', async () => {
    const results = await renderString(
      `
      <div style="height:50vh;background-color:lightgray;"></div>

      {% embed "@bolt-components-sticky/sticky.twig" %}
        {% block sticky_content %}
          <div style="color:white;background-color:red">
            First sticky item
          </div>
        {% endblock %}
      {% endembed %}
      
      <div style="height:100vh;background-color:lightgray;"></div>
      
      {% embed "@bolt-components-sticky/sticky.twig" %}
        {% block sticky_content %}
          <div style="background-color: white">
            Second sticky item
          </div>
        {% endblock %}
      {% endembed %}
      
      <div style="height:100vh;background-color:lightgray;"></div>
      
      {% embed "@bolt-components-sticky/sticky.twig" %}
        {% block sticky_content %}
          <div style="color:white;background-color:blue">
            Third sticky item
          </div>
        {% endblock %}
      {% endembed %}
      
      <div style="height:100vh;background-color:lightgray;"></div>
        `,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
  test('usage with content', async () => {
    const results = await renderString(
      `
      {% embed "@bolt-components-sticky/sticky.twig" %}
      {% block sticky_content %}
        {% include "@bolt-components-navbar/navbar.twig" with {
          "theme": "dark",
          "title":
          {
            "tag": "h2",
            "text": "Pega for Government: Healthcare & Social Programs",
            "icon":
            {
              "name": "marketing-gray"
            }
          },
          "links":
          [
            {
              "text": "Visualization & Simulation",
              "url": "#visualization-and-simulation"
            },
            {
              "text": "Section 1",
              "url": "#section-1"
            },
            {
              "text": "Section 2 is a lot longer",
              "url": "#section-2"
            },
            {
              "text": "The constituent experience",
              "url": "#the-constituent-experience"
            },
            {
              "text": "Section 4",
              "url": "#section-4"
            }
          ]
        } only %}
      {% endblock %}
    {% endembed %}
    
    {% embed "@bolt-components-band/band.twig" with {
      size: "large",
      theme: "dark",
      full_bleed: true,
      attributes: {
        id: [
          "section-2"
        ]
      }
    } %}
      {% block band_content %}
    
        {% include "@bolt-components-headline/headline.twig" with {
          text: "Section 2",
          size: "xxlarge",
          tag: "h2"
        } only %}
    
        {% include "@bolt-components-headline/text.twig" with {
          text: "Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla vitae urna tincidunt congue sed."
        } only %}
    
        {% include "@bolt-components-headline/text.twig" with {
          text: "Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci."
        } only %}
    
      {% endblock band_content %}
    {% endembed %}
        `,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
