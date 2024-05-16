// Library

// Calls modules and orchestrates dependencies between them


module.exports = function(StringTree) {
  var inBrowser = typeof window != "undefined"
  var libraryCount = 0
  var queue = []

  function Library() {
    if (inBrowser && libraryCount > 0) {
      throw new Error("Trying to create a second library in the browser. That seems like an odd thing to do.") }

    libraryCount++

    this.id = "library@f"+randomId()

    var batchingLogs = libraryCount > 1

    if (batchingLogs) {
      queue.push(this.id)
    }

    var batchComplete = queue.length == 10

    if (batchComplete) {
      console.log("more module-libraries created: \n    "+queue.join("\n    "))
    } else if (!batchingLogs) {
      console.log("module-library created: "+this.id)
    }

    this.sandbox = {__moduleLibrary: this.id}
    this.root = this
    this.children = []
    this.modules = {}
    this.singletonCache = {}
    this.aliases = {}
    this._id = randomId()
    this.require = Library.require
    this.__isNrtvLibrary = true
  }

  Library.loaders = []
  Library.useLoader = function(loader) {
    Library.loaders.push(loader)
  }

  function randomId() {
    return Math.random().toString(36).split(".")[1].substr(0,4)
  }

  Library.prototype.define =
    function(name, two, three) {
      if (three) {
        var func = three
        var dependencies = scrubDependencies(two)
      } else {
        var func = two
        var dependencies = []
      }

      var alreadyLoaded = this.modules[name]

      if (alreadyLoaded) {
        console.log("⚡⚡⚡ WARNING ⚡⚡⚡ "+name+" was loaded into the library twice. Seems odd?")
        return alreadyLoaded
      }

      if (!name || typeof name != "string") {
        throw new Error("library.define or export or whatever you did expects a name as the first argument, but you passed "+name)
      }

      if (typeof func != "function") {
        throw new Error("library.define/export/etc needs some kind of function but you gave it "+func)
      }

      if (!Array.isArray(dependencies)) {
        throw new Error("You passed "+dependencies+" to library.define/export/whatever in between the name and the function, but that's not an array of dependencies. We were expecting an array of dependencies there.")
      }

      var module = {
        __isNrtvLibraryModule: true,
        name: name,
        dependencies: dependencies,
        func: func
      }

      this.addModule(module)

      return module
    }

  Library.prototype.addModule =
    function(module) {
      this.modules[module.name] = module
    }

  Library.prototype.ref = function() {
    return {__dependencyType: "self reference"}
  }

  function shallowClone(object) {
    var fresh = {}
    for(var key in object) {
      fresh[key] = object[key]
    }
    return fresh
  }

  function scrubDependencies(deps) {
    for(var i=0; i<deps.length; i++) {
      if (deps[i].__isNrtvLibrary) {
        deps[i] = Library.prototype.ref()
      }
    }

    return deps
  }

  Library.prototype.using =
    function(dependencies, func) {

      scrubDependencies(dependencies)

      if (typeof dependencies == "function") {
        func = dependencies
        func.call(this.sandbox)
        return
      }

      if (!Array.isArray(dependencies)) {
        throw new Error("You did library.using("+JSON.stringify(dependencies)+", ...) but we were expecting an array of dependencies there.")
      }

      var tree = this._buildDependencyTree()

      var library = this.clone()

      return func.apply(library.sandbox, library._getArguments(dependencies, func))
    }

  var concat = Function.prototype.apply.bind(Array.prototype.concat, [])

  Library.prototype._buildDependencyTree =
    function() {
      var tree = new StringTree()

      for(var name in this.modules) {
        tree.add(
          name,
          this._dealiasedDependencies(
            this.modules[name].dependencies
          )
        )
      }

      return tree
    }

  Library.prototype.dealias = function(name) {
    return this.aliases[name] || name
  }

  Library.prototype._dealiasedDependencies =
    function(possiblyAliased) {
      var dependencies = []
      var aliases = this.aliases
      var library = this

      possiblyAliased.map(
        function(dependency) {

          if (typeof(dependency) != "string") { return }

          dependencies.push(library.dealias(dependency))
        }
      )

      return dependencies
    }


  // Arguments

  // When we call a module generator or use a function, we need arguments to pass to them. For now, these are either singletons generated generators, or commonjs modules.

  Library.prototype._getArguments =
    function(dependencies) {
      var args = []

      for(var i=0; i<dependencies.length; i++) {

        var singleton = this._getSingleton(dependencies[i])

        var isObject = typeof singleton == "object"

        var keyCount = isObject && Object.keys(singleton).length

        if (isObject && keyCount < 1) {
          throw new Error("The singleton for "+dependencies[i]+" is just an empty object. Did you maybe forget to do module.exports = ?")
        }

        args.push(singleton)
      }

      return args
    }

  Library.prototype.getModule =
    function(name) {
      return this.modules[name]
    }

  Library.prototype.get = function(name) {
      if (!this.modules[name]) {
        throw new Error("Tried to get a library module called "+name+" but couldn't find any with that name")
      }

      return this.singletonCache[name] || this._generateSingleton(this.getModule(name))
    }

  Library.prototype.getSource = function(name) {
    var module = this.getModule(name)
    if (!module) {
      throw new Error("Can't get source for \""+name+"\" because it's not in the library. "+this.contents())
    }
    return module.func.toString()
  }

   Library.prototype.contents = function () {
    return "The module-library knows about the following modules: "+andAnd(Object.keys(this.modules))
  }

  function andAnd(items) {
    if (items.length < 1) {
      return "none"
    } else if (items.length < 2) {
      return ""+items[0]
    } else {
      return items.slice(0, items.length-1).join(", ")+" and "+items[items.length-1]
    }
  }

  function LibraryRef(library, moduleName) {
    this.__isLibraryRef = true
    this.library = library
    this.moduleName = moduleName
  }

  LibraryRef.prototype.module = function module(moduleName) {
    return new LibraryRef(this.library, moduleName)
  }

  Library.prototype._getSingleton =
    function (identifier, alternateRequire, forName) {
      if (identifier.__dependencyType == "self reference") {

        return new LibraryRef(this)

      } else if (identifier in this.singletonCache) {

        return this.singletonCache[identifier]

      } else if (typeof identifier != "string") {

        throw new Error("You asked for a module by the name of "+identifier+" but, uh... that's not really a name.")

      } else if (module = this.modules[identifier]) {
        return this._generateSingleton(module)
      } else if (alias = this.aliases[identifier]) {
        return this._getSingleton(alias)
      }

      for(var i=0; i<Library.loaders.length; i++) {

        var singleton = Library.loaders[i](
          alternateRequire || this.require,
          identifier,
          this,
          forName
        )

        if (singleton) {
          return singleton
        }
      }

      throw new Error("You don't seem to have ever mentioned a "+identifier+" module to library "+this._id)

    }

  var generating = {}
  var generationStack = []

  Library.prototype._generateSingleton =
    function(module) {
      generationStack.push(module.name)

      if (generating[module.name]) {
        throw new Error("Tried to generate "+module.name+" while generating "+module.name+". Seems an infinite loop? Stack: "+generationStack.join(" → "))
      }

      generating[module.name] = true
      var deps = []

      for(var i=0; i<module.dependencies.length; i++) {

        deps.push(
          this._getSingleton(
            module.dependencies[i],
            module.require,
            module.name
          )
        )
      }

      var singleton = module.func.apply(this.sandbox, deps)

      var isUndefined = typeof singleton == "undefined"
      var isFunction = typeof singleton == "function"
      var isObject = typeof singleton == "object"
      var isString = typeof singleton == "string"

      if (isUndefined) {
        throw new Error("The generator for "+module.name+" didn't return anything.")
      } else if (!isFunction && !isObject && !isString) {
        throw new Error("Modules need to return either a function or an object, so that we can stick some bookkeeping attributes on it. Your module "+module.name+" returned an "+(typeof singleton)+": "+singleton)
      }

      singleton.__nrtvId = randomId()
      singleton.__nrtvModule = module

      this.singletonCache[module.name] = singleton

      generating[module.name] = false
      generationStack.pop()

      return singleton
    }


  // Resetting

  // When we have figured out what all modules need to be reset, we build a new library with the cache cleared for those.

  Library.prototype.clone =
    function() {
      var newLibrary = new Library()
      newLibrary.parent = this
      this.children.push(newLibrary)
      newLibrary.root = this.root
      newLibrary.modules = this.modules
      newLibrary.singletonCache = this.singletonCache
      newLibrary.aliases = this.aliases
      newLibrary.require = this.require

      return newLibrary
    }

  Library.prototype.setPath = function(path, name) {
    this.aliases[path] = name
  }

  return Library
}
