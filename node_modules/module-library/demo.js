var library = require("./")(require)

library.define(
  "people",
  function() {
    return [{name: "erik", age: 35}, {name: "alex", age:39}, {name: "kate", age: 30}]
  }
)

library.define(
  "say-hello",
  ["people", "querystring"],
  function(people, querystring) {
    return function hi() {
      people.forEach(function(person) {
        console.log(querystring.stringify(person))
      })
    }
  }
)

library.using(
  ["say-hello"],
  function(hi) {
    hi()
  }
)