document.getElementById("someId").innerHTML = "changed";

//not the same thing: this gets the real text content, even the text of the HTML element is in strong tags. The innerHTML would give back int this case: <strong>Hello</strong>
document.getElementById("someId").textContent = "changed";

//therefore to change text and make it strong...
document.getElementById("someId").innerHTML = "<strong>changed</strong>";