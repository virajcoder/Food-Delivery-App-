var runTest = require("run-test")
var Library = require("../").Library

runTest(
  "dependencies can be commonjs modules",

  function(expect, done) {
    var library = new Library()

    library.define(
      "to-query-string",
      ["querystring"],
      function(querystring) {
        return querystring.stringify
      }
    )

    library.using(
      ["to-query-string", "http"],
      function(toQueryString, http) {
        expect(toQueryString).to.be.a("function")
        expect(http.request).to.be.a("function")
        done()

      }
    )
  }
)


runTest(
  "can export singleton for commonjs",

  function(expect, done) {
    var library = new Library()

    var singleton = library.export(
      "foo",
      function() {
        return "bar"
      }
    )

    expect(singleton).to.equal("bar")

    done()
  }
)


runTest(
  "external require functions",

  function(expect, done) {
    function alternateRequire() {
      return "boo ba doo"
    }

    var library = require("../node-library")(alternateRequire)

    library.using(
      ["this could be anything"],
      function(boo) {
        expect(boo).to.equal("boo ba doo")
        done()
      }
    )
  }
)



runTest(
  "same library regardless of require",

  function(expect, done) {
    var one = require("../node-library")(function() {})
    var two =  require("../node-library")(function() {})

    one.define("foo", function() {
      return "yup"
    })

    two.using(["foo"], function(foo) {
      expect(foo).to.equal("yup")
      done()
    })
  }
)



runTest(
  "one library per require",

  function(expect, done) {
    function myRequire() {}
    var one = require("../node-library")(myRequire)
    var two = require("../node-library")(myRequire)

    expect(one).to.equal(two)
    done()
  }
)



runTest(
  "exported nrtv modules keep their require functions around for commonjs requires",

  function(expect, done) {
    var library = new Library()

    expect(function() {
      library.using(
        ["./nrtv_module_with_commonjs_requirement"],
        function(stuff) {
          done()
        }
      )
    }).to.not.throw()
  }
)
