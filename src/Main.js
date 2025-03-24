import React from 'react';
import cloud from "./images/realistic-cloud.webp";

function Main() {
    return (
      <>
        <h1>Main Weather Screen!</h1>
        <img src={cloud}
            style={{
              top: "20%",
              left: "20%",
              position: "absolute",
              width: "40%"
        }}/>
      </>
    );
  }
  
export default Main;