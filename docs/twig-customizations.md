## Faker - Lorem/Dummy text

You can easily get dummy Lorem Ipsum text in Twig via Faker. It will change each time Pattern Lab compiles. 

### Text

```twig
{{ faker.text() }}
{{ faker.text(100) }}
```

Get random text; you can pass in a number for max characters you'd like.

### Words

```twig
{{ faker.words() }}
{{ faker.words(100) }}
```

Get random words; you can pass in a number for max words you'd like.

### Sentences

```twig
{{ faker.sentences() }}
{{ faker.sentences(7) }}
```

Get random sentences; you can pass in a number for max sentences you'd like.


### Paragraph

```twig
{{ faker.paragraph() }}
{{ faker.paragraph(7) }}
```

Get a paragraph with random sentences; you can pass in a number for how many sentences you'd like. It will be +/- 40% of that number, use `{{ faker.paragraph(7, false) }}` for it to be exactly that many paragraphs.

### Tips on usage

You can use them in many places; here's a few different ideas.

```twig
{% include "thing.twig" with {
  text: faker.text(),
} %}
```

Need a lot of paragraphs and want to wrap each one? Here's how to make 10 of them:

```twig
{% for i in 1..10 %}
  <p>{{ faker.paragraph() }}</p>
{% endfor %}
```

Want the word amount to vary even more? Use the built in [`random` function](https://twig.symfony.com/doc/1.x/functions/random.html) to pick a number between 5 & 15 each time:

```twig
<p>{{ faker.words(random(5..15)) }}</p>
```

Finally, have Visual Regression Testing in mind? Set the environmental variable `TWIG_FAKER_ALWAYS_GET_SAME_TEXT` to `true` and Faker will always return the same text for each call. Though if you're using the `random` function from above, that will affect things.
