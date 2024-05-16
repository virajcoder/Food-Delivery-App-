var runTest = require("run-test")
var Library = require("../").Library


runTest(
  "define a module and then use it",

  function(expect, done) {
    var library = new Library()

    library.define("foo", 
      function() { return "bar" }
    )

    library.using(["foo"], expectBar)

    function expectBar(foo) {
      expect(foo).to.equal("bar")
      done()
    }
  }
)



runTest(
  "getting individual singletons",
  function(expect, done) {
    var library = new Library()

    library.define("fred",
      function() {
        return "red"
      }
    )

    expect(library.get("fred")).to.equal("red")

    // And again to test cached path:

    expect(library.get("fred")).to.equal("red")

    done()
  }
)


runTest(
  "don't run the generator every time",

  function(expect, done) {
    var library = new Library()
    var total = {count: 0}

    library.define("foo", 
      function() {
        total.count++
        return {}
      }
    )

    library.using(["foo"], 
      function() {}
    )

    library.using(["foo"],
      function() {}
    )

    expect(total.count).to.equal(1)
    done()
  }
)



runTest(
  "definitions can have dependencies",

  function(expect, done) {
    var library = new Library()
    var count = 0

    library.define("turtle", 
      function() {
        return "in the sun"
      }
    )

    library.define(
      "rider",
      ["turtle"],
      function(turtle) {
        return "rider rides " + turtle
      }
    )

    library.using(["rider"], 
      function(rider) {
        expect(rider).to.equal("rider rides in the sun")
        done()
      }
    )
  }
)


runTest(
  "getting references to libraries and modules",

  function(expect, done) {
    var library = new Library()

    library.define("books",
      function() {
        return "are for reading"
      }
    )

    library.using(
      [library.ref()],
      function(lib) {
        expect(lib).to.have.property("__isLibraryRef", true)

        // This doesn't work, but I'm not really trying to differentiate that carefully between different libraries yet. I think in the long term we're going to want these ids (and the corresponding modules)to match:
        // expect(lib.library.id).to.equal(library.id)

        expect(lib.module("books")).to.have.property("__isLibraryRef", true)

        expect(lib.module("books")).to.have.property("moduleName", "books")

        done()
      }
    )
  }
)




