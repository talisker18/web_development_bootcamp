import React from "react";
import Login from "./Login";

var isLoggedIn = false;
const currentTime = new Date(2023,1,1,22).getHours();

function renderConditionally() {
  if(isLoggedIn === true) {
    return (<h1>Hello</h1>);
  } else {
    return <Login />;
  }
}

function App() {
  //we cant use statements in jsx snippets, but we can use expressions, like the ternary operator -> condition ? do if true : do if false
  return (
    <div className="container">
      {isLoggedIn? (<h1>Hello</h1>) : renderConditionally()}
      {currentTime > 17? (<p>Why are you still working?</p>) : null}
    </div>
  );
}

export default App;
