var h1 = document.querySelector("#heading");

console.log(h1);

var h2 = document.createElement("h2");

h2.innerText = "Hello Guys!";

h2.style = "color: red; font-size: 120px;";

// Object.assign(h2.style, {
//   color: "red",
//   fontSize: "120px",
// });

document.body.appendChild(h2);
