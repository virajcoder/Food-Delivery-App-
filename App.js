// const heading = React.createElement(
// "h1",
// {id: "heading" },
// "Hello World From React!");

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

const parent = React.createElement("div",{id: "parent"},
    [
     React.createElement("div", { class: "child" },
        [
          React.createElement("h1", {},"i'am Viraj Singh"),
          React.createElement("h2", {}, "My age is 22")
        ]
    ),
     React.createElement("div", { id: "child2" },
        [
          React.createElement("h1", {},"i'am Viraj Singh"),
          React.createElement("h2", {}, "My age is 22")
        ]
    )
    ]
)

console.log(parent); // given object
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);