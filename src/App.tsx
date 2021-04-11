import React from "react";

import { Carousel } from "./components/Carousel";

function App() {
  return (
    <div>
      <Carousel delay={2000}>
        {100}
        {"string"}
        <span>I'm span</span>
      </Carousel>
    </div>
  );
}

export default App;
