import React from "react";

function Info(props) {
  return (
    <div>
      <p className="info">{props.tel}</p>
      <p className="info">{props.email}</p>
    </div>
  );
}

export default Info;