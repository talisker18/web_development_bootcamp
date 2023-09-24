import React from "react";
import Entry from "./Entry.jsx";
import emojipedia from "../emojipedia.js";

function createEmoji(entry){
  return (
    <Entry key={entry.id} emoji={entry.emoji} name={entry.name} description={entry.meaning}/>
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map((entry) => createEmoji(entry))}
      </dl>
    </div>
  );
}

export default App;