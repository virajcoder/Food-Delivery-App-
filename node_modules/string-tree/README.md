This library is useful if you want to ask some questions about a tree structure.

    var StringTree = require("string-tree")
    var tree = new StringTree()

You just provide a string and then an array of strings that identify that string's children.

    tree.add("Linda", ["Susan"])
    tree.add("Susan", ["Jennifer"])
    tree.add("Jennifer", ["Madison"])

    tree.ancestors("Madison") 

    # returns ["Linda", "Susan", "Jennifer"]

It's sort of different from other similar libraries in that it's only a tree of identifiers, so if you add the same one in two places, that's considered the same node.