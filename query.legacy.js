(function () {
	// cache Array filter
	var filter = Array.prototype.filter || function (callback) {
		for (var index = 0, array = []; index < this.length; ++index) {
			if (callback(this[index], index)) {
				array.push(this[index]);
			}
		}

		return array;
	};

	// cache Array forEach
	var forEach = Array.prototype.forEach || function (callback) {
		for (var index = 0; index < this.length; ++index) {
			callback(this[index], index);
		}
	};

	// cache Array push
	var push = Array.prototype.push;

	// cache Array sort
	var sort = Array.prototype.sort;

	// cache escape character
	var escapeChar = '\\';

	// cache CSS nester characters object
	var nesters = [{
		start: '[',
		end: ']',
		depth: 0
	}, {
		start: '(',
		end: ')',
		depth: 0
	}, {
		start: '"',
		end: '"',
		depth: 0
	}, {
		start: '\'',
		end: '\'',
		depth: 0
	}];

	// split string by separator while honoring
	function split(string, separator) {
		var array = [];
		var index = -1;
		var lastIndex = 0;
		var totalDepth = 0;
		var letter;

		while (++index < string.length) {
			letter = string.charAt(index);

			lettering: {
				if (escapeChar === letter) {
					++index;
				} else {
					for (var nesterIndex = 0; nesterIndex < nesters.length; ++nesterIndex) {
						nester = nesters[nesterIndex];

						if (nester.depth && nester.end === letter) {
							--nester.depth;
							--totalDepth;

							break lettering;
						} else if (nester.start === letter) {
							++nester.depth;
							++totalDepth;

							break lettering;
						}
					}

					if (!totalDepth && separator === letter) {
						array.push(string.slice(lastIndex, index));

						lastIndex = ++index;
					}
				}
			}
		}

		array.push(string.slice(lastIndex, index));

		return array;
	}

	// querySelectorAllElements
	function querySelectorAllElements(elements, selector) {
		// filtered elements
		var filteredElements = [];

		// for each element
		forEach.call(elements, function (element) {
			// add all queried elements into the filtered elements
			push.apply(filteredElements, element.querySelectorAll(selector));
		});

		// return non-duplicate elements
		return filter.call(filteredElements, function (element, index) {
			return index === filteredElements.indexOf(element);
		});
	}

	// polyfill a constructor
	function polyfill(constructor) {
		// queryAll
		function queryAll(selector) {
			// cache elements
			var elements = new Elements();

			// push this element into elements
			push.call(elements, this);

			// for each selector
			forEach.call(split(selector, ','), function (selector) {
				// selector, split by spaces
				var selectorFragments = split(selector.trim(), ' ');

				// cache elements matching the first selector fragment
				elements = querySelectorAllElements(elements, selectorFragments[0]);

				// if there is more than one selector fragment
				if (1 < selectorFragments.length) {
					// cache elements matching the entire selector
					elements = querySelectorAllElements(elements, selector);
				}
			});

			// sort elements by position
			sort.call(elements, function (elementA, elementB) {
				return 3 - (elementA.compareDocumentPosition(elementB) & 6);
			});

			// return elements
			return elements;
		}

		// query
		function query(selector) {
			// return first element of queryAll or null
			return queryAll.call(this, selector)[0] || null;
		}

		// conditionally add queryAll to the constructor's prototype
		if (!constructor.prototype.queryAll) {
			constructor.prototype.queryAll = queryAll;
		}

		// conditionally add query to the constructor's prototype
		if (!constructor.prototype.query) {
			constructor.prototype.query = query;
		}
	}

	// Elements constructor (https://dom.spec.whatwg.org/#element-collections)
	function Elements() {}

	// extend Elements constructor with Array
	Elements.prototype = new Array();

	// restore Elements constructor
	Elements.prototype.constructor = Elements;

	// polyfill Elements
	window.Elements = window.Elements || Elements;

	// polyfill Document#queryAll, Document#query (https://dom.spec.whatwg.org/#dom-parentnode-queryrelativeselectors)
	polyfill(Document || HTMLDocument);

	// polyfill Element#queryAll, Element#query (https://dom.spec.whatwg.org/#dom-parentnode-queryrelativeselectors)
	polyfill(Element);
})();
