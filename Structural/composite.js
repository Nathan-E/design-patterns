/**
 * Compose objects into tree structures to represent part-whole hierarchies. Composite lets 
 * clients treat individual objects and compositions of objects uniformly.
 * 
 * The Composite pattern allows the creation of objects with properties that are primitive items or a collection 
 * of objects. Each item in the collection can hold other collections themselves, creating deeply nested structures.
 * 
 * A tree control is a perfect example of a Composite pattern. The nodes of the tree either contain 
 * an individual object (leaf node) or a group of objects (a subtree of nodes).
 * 
 * All nodes in the Composite pattern share a common set of properties and methods which supports individual
 *  objects as well as object collections. This common interface greatly facilitates the design and construction 
 * of recursive algorithms that iterate over each object in the Composite collection. 
 */

/**
 * The Composite pattern describes a group of objects that can be treated in the same way a single instance of 
 * an object may be. This allows us to treat both individual objects and compositions in a uniform manner, 
 * meaning that the same behavior will be applied regardless of whether we’re working with one item or a thousand.
 * 
 * In jQuery, when we’re applying methods to an element or collection of elements, we can treat both sets 
 * in a uniform manner, as both selections return a jQuery object.
 * 
 * This is demonstrated by the code sample using the jQuery selector below. Here, it’s possible to add an active 
 * class to both selections for a single element (e.g., an element with a unique ID) or a group of elements with 
 * the same tag name or class, without additional effort:
 */


const Node = function (name) {
    this.children = [];
    this.name = name;
}

Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },

    remove: function (child) {
        const length = this.children.length;
        for (let i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },

    getChild: function (i) {
        return this.children[i];
    },

    hasChildren: function () {
        return this.children.length > 0;
    }
}

// recursively traverse a (sub)tree

function traverse(indent, node) {
    log.add(Array(indent++).join("--") + node.name);

    for (let i = 0, len = node.children.length; i < len; i++) {
        traverse(indent, node.getChild(i));
    }
}

// logging helper

const log = (function () {
    let log = "";

    return {
        add: function (msg) {
            log += msg + "\n";
        },
        show: function () {
            console.log(log);
            log = "";
        }
    }
})();

function run() {
    const tree = new Node("root");
    const left = new Node("left")
    const right = new Node("right");
    const leftleft = new Node("leftleft");
    const leftright = new Node("leftright");
    const rightleft = new Node("rightleft");
    const rightright = new Node("rightright");

    tree.add(left);
    tree.add(right);
    tree.remove(right); // note: remove
    tree.add(right);

    left.add(leftleft);
    left.add(leftright);

    right.add(rightleft);
    right.add(rightright);

    traverse(1, tree);

    log.show();
}

run();