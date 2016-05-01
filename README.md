# ISView

Wow! Another Javascript view library! Like we don't have enough of those already...

I'll admit, compared to some other offerings, I don't exactly see this library taking
off or even being used in any kind of actual production environment. I'm not someone
who builds huge Javascript-based apps, and wanted something lightweight and easy to
use with no external dependencies (ignoring the build dependencies).

This is also my first foray into using and releasing an ES6 open source product.
So... yay for me?

### usage

All code is namespaced under the global `ISView`. Under `ISView` are two
current modules which are

- `html`
- `notifier`

--------------------------------------------------------------------------------

### ISView.html

##### el(elementType[, attrsObj[, textContent[, ..., childN]]])

returns a new HTML node of type `elementType`. Optionally, you can provide a map
of attributes that the object will inherit via `attrsObj` and can specify any
string literal content via `textContent`.

You can also chain further `el` calls to create more complex, nested structures.

```
var element = ISView.html.el('div', { class: "container" },
        ISView.html.el('h1', 'this is a title'),
        ISView.html.el('p', 'lorem ipsum'),
        ISView.html.el('ul',
                ISView.html.el('li', { class: 'list-item' }, 'hello'),
                ISView.html.el('li', { class: 'list-item' }, 'world'),
                ISView.html.el('li', { class: 'list-item' }, 'from'),
                ISView.html.el('li', { class: 'list-item' }, 'bob'),
                ISView.html.el('li', { class: 'list-item' }, 'dole')
        )
);
```

--------------------------------------------------------------------------------

##### mount(rootMountElem, childElem)

Appends the provided `childElem` entry as a child of `rootMountElem`. This is
the provided way to load elements created via `el` into the DOM. `rootMountElem`
can either be a selector string, in which case mount will look it up in the
DOM and mount the provided `childElem` into that element. If `rootMountElem`
is an `Element` object, the `childElem` object will be mounted into the provided
object.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test File</title>
</head>
<body>
<div id="is-mount"></div>

<script type="text/javascript" src="build.js"></script>
<script type="text/javascript">
    var element = ISView.html.el('div', { class: "container" },
            ISView.html.el('h1', 'this is a title'),
            ISView.html.el('p', 'lorem ipsum'),
            ISView.html.el('ul',
                    ISView.html.el('li', { class: 'list-item' }, 'hello'),
                    ISView.html.el('li', { class: 'list-item' }, 'world'),
                    ISView.html.el('li', { class: 'list-item' }, 'from'),
                    ISView.html.el('li', { class: 'list-item' }, 'bob'),
                    ISView.html.el('li', { class: 'list-item' }, 'dole')
            )
    );

    ISView.html.mount('#is-mount', element);
</script>
</body>
</html>
```

--------------------------------------------------------------------------------

##### bind(configObject)

Given an array of data, bind that data to an element of type `elemType` and mount
the result onto `mountPoint`.

| configObj params | value                                                                                                                                        |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `mountPoint`     | `Element` object whereby the generated elements will be mounted to                                                                           |
| `elemType`       | A string specifying what node type the generated children will be                                                                            |
| `data`           | the array of data you are binding                                                                                                            |
| `renderCallback` | function(val, index) => string  A function whose result will be used to populate  the text contents of the child element                     |
| `attrsCallback`  | function(val, index) => object  A function whose result is the key-value map used to assign values to the attributes of the  generated nodes |

```
var element = ISView.html.el('ul', { 'id': 'test-mount' });
ISView.html.mount('#is-mount', element);

ISView.html.bind({
    mountPoint: document.querySelector('#test-mount'),
    elemType: 'li',
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    renderCallback: function(val) { return val % 2 === 0 ? "even" : "odd" },
    attrsCallback: function(val, index) { return { id: "list-item-" + index } }
});
```

Result will be an onordered list that will have children either odd or even depending
on the current iteration on data, with the attributes of the `li` elements having
an `id` attribute generated by `attrsCallback`.

### ISView.notifier

##### register(key, ctx, func)

register a listener to the event `key`, that will execute the event handler `func`
and will have it's `this` value set to `ctx`.

##### notify(key, paramsArray)

notify the notifier object to run all registed functions listening to the event `key`
passing each listener paramsArray as its function parameters.

```
ISView.notifier.register(
    'test-event',
    document.querySelector('#some-h1-elem'),
    function(newStr) { this.textContent = newStr }
);

setTimeout(function () {
    ISView.notifier.notify('test-event', ['this is a new title']);
}, 5000);
```

--------------------------------------------------------------------------------

### Contributions

New modules and other contributions are completely welcome.

--------------------------------------------------------------------------------

### License

This code is licensed under the GPLv2 license. The full license can be found
under the `LICENSE` file.