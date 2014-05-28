(function (ELEMENT, NODELIST) {
	function NodeList() {}

	function queryAll(selector) {
		var
		self = this.length ? Array.prototype.slice.call(this) : [this],
		list = [],
		nodeList = new NodeList();

		selector.split(/\s*,\s*/).forEach(function (selector) {
			var each = self.slice();

			selector.split(/\s+/).forEach(function (selector) {
				each = each.map(function (element) {
					return Array.prototype.slice.call(element.querySelectorAll(selector));
				});

				if (each.length) each = each.reduce(function(nodeListA, nodeListB) {
					return nodeListA.concat(nodeListB);
				});
			});

			list.push.apply(list, each);
		});

		list = list.filter(function(node, index) {
			return list.indexOf(node) === index;
		}).sort(function (nodeA, nodeB) {
			return 3 - (nodeA.compareDocumentPosition(nodeB) & 6);
		});

		Array.prototype.push.apply(nodeList, list);

		return nodeList;
	}

	function query(selector) {
		return queryAll.call(this, selector)[0] || null;
	}

	NodeList.prototype = NODELIST;

	ELEMENT.query    = ELEMENT.query || query;
	ELEMENT.queryAll = ELEMENT.queryAll || queryAll;
})(
	Element.prototype,
	NodeList.prototype
);
