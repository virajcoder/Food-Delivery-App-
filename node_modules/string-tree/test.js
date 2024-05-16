var runTest = require("run-test")

var StringTree = require("./") // <- we load dependencies with plain CommonJS because we don't want to depend on module-library.

runTest(
  "getting ancestors of a node",
  function(expect, done) {
    var tree = new StringTree()

    tree.add("a", ["b"])
    tree.add("b", ["c"])

    expect(tree.ancestors("c")).to.have.members(["a","b"])

    done()
  }
)