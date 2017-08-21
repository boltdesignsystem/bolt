## Keynote Quote Pattern <small>*advanced</small>

It's not always optimal to use your raw components and layouts as the CMS's data model. For example it would:

- Create very complicated data models as the design system grew in complexity
- Limit your ability to change component/layout data structure in the future
- Require users to fill out every field every time

### Introducing MVP

A prefered method is to employ a Model/View/Presenter approach, which is what we are doing here with the Keynote Quote pattern.

In this example the pieces of the MVP are:

#### Model (keynote_quote.json)
  - JSON Schema defines a data model for the CMS
  - It does not need to match the data structure of the components/layouts. Create a model that makes sense for the user

#### View (quote.twig, card.twig, image.twig)
  - A set of multi-purpose templates that will be used to create the finished HTML

#### Presenter (keynote_quote.twig)
  - A twig file that is used to translate the model into what the view needs.
  - `_context` can be mapped to a variable (like `global`) to keep global variable space clean, while still having access to the entire model
  - This process involves embedding/including the needed templates and mapping the model schema to the view schema such as:
    - `{% include 'quote.twig' with {"quotation": global.quote.text,...`
  - It also involves setting values needed by the view that the user does not have control over such as:
    - `"background": "gray"`
    - `"title": "Keynote Speaker"`
