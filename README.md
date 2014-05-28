# query

**query** is a polyfill for the [query](http://dom.spec.whatwg.org/#dom-parentnode-query) and [queryAll](http://dom.spec.whatwg.org/#dom-parentnode-queryall) methods in the [DOM
Living Standard](http://dom.spec.whatwg.org/).

```html
<body>
	<h1>Heading</h1>
</body>
```

```js
// querySelector has an unexpected quirk
document.body.querySelector('html h1'); // returns h1 because it matches 'html h1'

// query works as expected
document.body.query('html h1'); // returns null because html is not within body
```

This is extremely useful in context-sensitive situations.

```html
<ul>
	<li>
		<a href="#section-1">Section 1</a>
		<ul>
			<li>
				<a href="#section-1-1">Section 1-1</a>
			</li>
		</ul>
	</li>
</ul>
```

```js
document.query('ul').addEventListener('keydown', function (event) {
	// if the down arrow was pressed
	if (event.keyCode === 40) {
		var anchor = event.target.closest('a');

		// if an <a> was focused
		if (anchor) {
			var childAnchor = anchor.parentNode.query('ul a');

			// if the anchor’s parent has a <ul> with an <a>
			if (childAnchor) {
				childAnchor.focus();
			}
		}
	}
});
```

## Methods

### queryAll

Returns a non-live NodeList of all descendent elements that match the relative CSS selectors.

```js
elementList = baseElement.queryAll(selectors);
```

### query

Returns the first descendent element that matches the relative CSS selectors.

```js
element = baseElement.query(selectors);
```

## Browser compatibility

`query` and `queryAll` will work in Android 2.1+, Blackberry 7+, Chrome, Firefox 3.5+, Internet Explorer 8+, iOS Safari 3.2+, Opera 10+, and Safari 3.1+.

## Polyfill status

If you like **query** and **queryAll** and would like to use it natively, convince [Chrome](https://code.google.com/p/chromium/issues/entry), [Opera](https://bugs.opera.com/wizard/), [Firefox](https://bugzilla.mozilla.org/enter_bug.cgi?format=guided), or [Safari](https://bugs.webkit.org/enter_bug.cgi) to implement it.

---

[query.js](/query.js) is 1.12KB or 345B minified + gzipped.
