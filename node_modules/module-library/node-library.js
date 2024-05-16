var path = require("path")

if (Error.stackTraceLimit == 10) {
  Error.stackTraceLimit = 30
}

var generateConstructor = require("./library")

var Tree = require("string-tree")

var Library = generateConstructor(Tree)

global._wtf = 
  function wtf(whatnot) {
    if (typeof whatnot == "function") {
      return whatnot.toString()
    } else if (typeof whatnot == "object") {
      if (Array.isArray(whatnot)) {
        return JSON.stringify(whatnot)
      }
      var keys = Object.keys(whatnot)
      for(var key in whatnot) {
        if (keys.indexOf(key) == -1) {
          keys.push(key)
        }
      }
      return "[ object "+whatnot.constructor.name+" with keys "+keys.join(", ")+" ]"
    } else {
      return JSON.stringify(whatnot)
    }
  }

global._wtf.log =
  function consoleLogWtfSomethingIs(whatnot) {
    console.log(_wtf(whatnot))
  }

global._wtf.json =
  function consoleLogSomethingToJSON(whatnot) {
    console.log(JSON.stringify(whatnot, null, 2))
  }



// Debugging

Library.prototype.dump = function(logger) {
  (logger || console.log)("library", JSON.stringify(this._dump(true), null, 2))

  if (this != this.root) {
    this.root._dump(true)
  }
}

Library.prototype._dump = function(isRoot) {

  var names = Object.keys(this.singletonCache)

  if (this.parent) {
    names = names.filter(differentThanParent.bind(null, this, this.parent))
  }

  function differentThanParent(child, parent, name) {
    if (!parent) { return true }
    return child.singletonCache[name] != parent.singletonCache[name]
  }

  var singletons = this.singletonCache

  var singletonLabels = names.map(
    function(name) {
      var label = name
      var id = singletons[name].__nrtvId

      if (id) {
        name += "@"+id
      }

      return name
    }
  )

  var kids = this.children.map(function(child) { return child._dump(false) })

  var dump = {
    id: this.id
  }

  if (isRoot) {
    dump.root = true
    dump.modules = Object.keys(this.modules)
  }

  dump.singletons = singletonLabels

  if (kids.length > 0) {
    dump.children = kids
  }

  return dump
}


// Exports

Library.prototype.export =
  function() {

    var module = this.define.apply(this, arguments)

    module.require = this.require

    var singleton = this._generateSingleton(module)

    return singleton
  }

try {
  var dir = __dirname
  var fullPath = path.join(__dirname, "..", "..", "package.json")
  var package = require(fullPath)
} catch (e) {} 

Library.useLoader(
  function(require, identifier, library, forName) {

    if (package && identifier == package.name && package.main) {
      identifier = "./"+package.main
    }
    
    if (identifier.substr(0,2) == "./") {
      var consumer = library.modules[forName]
      var consumerRequire = consumer && consumer.require
    }

    try {

      var singleton = (consumerRequire || require)(identifier)

    } catch (e) {

      var notFound = e.code == "MODULE_NOT_FOUND" 

      console.log()

      if (forName) {
        e.message += ". Error happened while we were trying to load "+identifier+" for "+forName
      }

      var probablyPackage = !identifier.match(/[\.\/]/)

      if (notFound && identifier.match(/[A-Z]/)) {

        e.message += " (is '"+identifier+"' capitalized right? usually modules are lowercase.)"

      } else if (notFound && probablyPackage && !e.message.match(/package\.json point/)) {

        e.message += " (Is it in your node_modules folder? Does the \"main\" attribute in the package.json point to the right file?)"
      }

      e.message += "\n\n    "+library.contents()+"\n"

      throw e
    }

    if (singleton) {
      return processCommonJsSingleton(identifier, singleton, library)
    }

  }
)

function processCommonJsSingleton(path, singleton, library) {

  if (singleton.__isNrtvLibraryModule == true) {
    throw new Error("Commonjs module "+path+" exported a nrtv module ("+singleton.name+"). Try module.exports = library.export(...) instead of module.exports = library.define(...)")
  }
  if (module = singleton.__nrtvModule) {

    if (!library.modules[module.name]) {
      library.addModule(module)
    }

    if (module.name != path) {

      var pathIsAName = !path.match(/\//) && path != "."

      if (pathIsAName) {
        console.log(" ⚡ WARNING ⚡ The commonjs module", path, "returned a module-library module called", module.name)
      }

      library.setPath(path, module.name)
    }

    return library._getSingleton(path)

  } else {
    var isObject = typeof singleton == "object"
    var isEmpty = isObject && Object.keys(singleton).length < 1

    if (isObject && isEmpty) {
      throw new Error("The "+path+" module just returned an empty object. Did you forget to do module.exports = library.export?")
    }

    library.singletonCache[path] = singleton

    return singleton
  }

}


Library.require = require
var library = new Library()
require.__nrtvLibrary = library

function exportLibraryModule(moduleSingleton, localLibrary) {
  var argumentsForDefine = Array.prototype.slice.call(arguments, 2)

  moduleSingleton.exports = localLibrary.export.apply(localLibrary, argumentsForDefine)
}

function libraryFactory(alternateRequire) {

  if (!alternateRequire) {
    throw new Error("You need to pass require to module-library. Like this: var library = require(\"module-library\")(require)")
  }

  var boundFunc = alternateRequire.__nrtvModuleFunction

  if (alternateRequire.require) {
    var alternateModule = alternateRequire
    alternateRequire = alternateModule.require
  }

  if (boundFunc) {
    return boundFunc
  }

  var newLibrary = library.clone()
  newLibrary.require = alternateRequire

  if (alternateModule) {
    boundFunc = exportLibraryModule.bind(null, alternateModule, newLibrary)
    boundFunc.checkOut = newLibrary.using.bind(newLibrary)
    boundFunc.__isNrtvLibrary = true
    boundFunc.ref = library.ref
    boundFunc.reference = newLibrary.ref

    alternateModule.__nrtvModuleFunction = boundFunc

    return boundFunc
  }

  boundFunc = newLibrary.define.bind(newLibrary)
  boundFunc.define = boundFunc
  boundFunc.dealias = newLibrary.dealias.bind(newLibrary)
  boundFunc.get = newLibrary.get.bind(newLibrary)
  boundFunc.getModule = newLibrary.getModule.bind(newLibrary)
  boundFunc.using = newLibrary.using.bind(newLibrary)
  boundFunc.run = boundFunc.using
  boundFunc.export = newLibrary.export.bind(newLibrary)
  boundFunc.__isNrtvLibrary = true
  boundFunc.ref = newLibrary.ref

  alternateRequire.__nrtvModuleFunction = boundFunc

  return boundFunc
}

libraryFactory.Library = Library

libraryFactory.define = libraryFactory.export = libraryFactory.using = function() {
  throw new Error("You tried to use the library factory as a library. Did you remember to do require(\"module-library\')(require)?")
}

libraryFactory.generator = generateConstructor

module.exports = libraryFactory
