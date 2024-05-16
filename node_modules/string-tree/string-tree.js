var generator = function() {
  function StringTree() {
    this.dependencies = {}
    this.parents = {}
  }

  StringTree.prototype.add =
    function(id, children) {
      this.dependencies[id] = children

      var parents = this.parents

      children.forEach(
        function(child) {
          if (!parents[child]) {
            parents[child] = []
          }

          parents[child].push(id)
        }
      )
    }

  StringTree.prototype.ancestors =
    function(id) {
      var parents = this.parents[id] || []
      var ancestors = [].concat(parents)
      var tree = this

      parents.forEach(
        function(parent) {
          var grandparents = tree.ancestors(parent)

          ancestors = ancestors.concat(grandparents)
        }
      )

      return ancestors
    }

  return StringTree
}

var StringTree = generator()

StringTree.generator = generator

module.exports = StringTree