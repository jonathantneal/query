# query

**query** is a polyfill for the [query] and [queryAll] methods and the [Elements] collection from the [DOM Living Standard].

[query] is a context-aware version of querySelector, and [Elements] is a collection of nodes that can also run Array methods.

```html
<section id="main-section">
	<h1>First Heading</h1>

	<section>
		<h1>Subsection Heading</h1>
	</section>
</section>
```

```js
main = document.getElementById('main-section');

// querySelector has an unexpected quirk
main.querySelector('section h1'); // returns the first heading because it technically matches

// query works as expected
main.query('section h1'); // returns the subsection heading because it is context-aware
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
	// if the down arrow was pressed from the menu
	if (event.keyCode === 40) {
		var anchor = event.target.closest('a');

		// if an <a> was focused before keydown
		if (anchor) {
			// find the next <a> within a <ul> within this <li>
			var childAnchor = anchor.parentNode.query('ul a');

			// if one exists, focus it
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

[query.js](/query.js) is 3.98KB or 570B minified + gzipped.

[query.legacy.js](/query.legacy.js) is 4.29KB or 614B minified + gzipped.

[Elements]: https://dom.spec.whatwg.org/#element-collections
[DOM Living Standard]: http://dom.spec.whatwg.org/
[query]: http://dom.spec.whatwg.org/#dom-parentnode-query
[queryAll]: http://dom.spec.whatwg.org/#dom-parentnode-queryall
