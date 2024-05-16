var module = require(".")(require)

module(
  "snaps",
  function() {
    return function() {
      console.log("snaps")}})

module.run(
  function() {
    console.log("run")})

module(
  "snap-and-go",
  ["snaps"],
  function(snaps) {
    return function() {
      snaps();
      console.log("go")}})

module.run(
  ["snap-and-go"],
  function(snapAndGo) {
    snapAndGo()})
