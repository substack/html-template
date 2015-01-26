# html-template

build templates with ordinary html for node and browsers

Write plain html and use css selectors to modify the html.

[![build status](https://secure.travis-ci.org/substack/html-template.png)](http://travis-ci.org/substack/html-template)

# example

Put `template=` attributes on the elements you want to turn into templates.

Here we'll make a template called `"skill"` on a `<tr>`:

``` html
<html>
  <body>
    <h1>list of skills</h1>
    <table class="skill">
      <tr>
        <th>skill name</th>
        <th>skill level</th>
      </tr>
      <tr template="skill">
        <td key="name"></td>
        <td key="level"></td>
      </tr>
    </table>
    <script src="bundle.js"></script>
  </body>
</html>
```

## in node

In node we can do:

``` js
var template = require('html-template');
var fs = require('fs');

var html = template();
var skills = html.template('skill');
fs.createReadStream(__dirname + '/skills.html')
    .pipe(html)
    .pipe(process.stdout)
;

skills.write({
    '[key=name]': 'macaroni pictures',
    '[key=level]': '40%'
});
skills.write({
    '[key=name]': 'quilting',
    '[key=level]': '5000%'
});
skills.write({
    '[key=name]': 'blinky lights',
    '[key=level]': '50%'
});
skills.end();
```

to produce:

``` html
<html>
  <body>
    <h1>list of skills</h1>
    <table class="skill">
      <tr>
        <th>skill name</th>
        <th>skill level</th>
      </tr>
      <tr template="skill" style="display:none">
        <td key="name"></td>
        <td key="level"></td>
      </tr><tr>
        <td key="name">macaroni pictures</td>
        <td key="level">40%</td>
      </tr><tr>
        <td key="name">quilting</td>
        <td key="level">5000%</td>
      </tr><tr>
        <td key="name">blinky lights</td>
        <td key="level">50%</td>
      </tr>
    </table>
    <script src="bundle.js"></script>
  </body>
</html>
```

## in browsers

In the browser, do:

``` js
var html = require('html-template')();
var skills = html.template('skill');

skills.write({
    '[key=name]': 'tap dancing',
    '[key=level]': '15%'
});
skills.write({
    '[key=name]': 'baton twirling',
    '[key=level]': '95%'
});
```

and new elements will be generated dynamically.

# node methods

```
var template = require('html-template')
```

## var html = template()

Create a new html template stream `html` that takes html input with `template`
attributes and produces html output with expanded template data.


## var t = html.template(name, opts)

Load a template `t` by its template `name` in the html.

Optionally:

* `opts.include` - when `false`, do not include the original template in the
html output. Otherwise include the original template with
`style="display:none"` so the template can be loaded in the browser to create
additional output.

## t.write(row)

Write `row`, an object mapping css selector keys to
[hyperglue](https://npmjs.org/package/hyperglue)-style values,
to the output stream. 

# browser methods

```
var template = require('html-template')
var streamTemplate = require('html-template/stream')
```

## var html = template()

Create a new `html` instance.

## var t = html.template(name)

Load a template `t` by its template `name` in the html.

## t.write(row)

Write a [hyperglue](https://npmjs.org/package/hyperglue)-style object mapping
css selectors to attributes and content to the page.

## var elem = t.create(row)

Create a [hyperglue](https://npmjs.org/package/hyperglue)-style object mapping
without inserting the element `elem` to the DOM.

## var html = streamTemplate()

Create an `html` that will create real stream template (`t`)s.

# install

With [npm](https://npmjs.org) do:

```
npm install html-template
```

# license

MIT
