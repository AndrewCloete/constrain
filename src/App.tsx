import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

import { Arena } from "./components/Arena";
import { Intro } from "./components/Intro";

function App() {
  const [modalOpen, setIntroOpen] = useState(true);
  const [hint, setHint] = useState(true);

  function hintClick() {
    setHint(!hint);
  }

  return (
    <>
      {modalOpen && (
        <Intro
          hintOpen={hint}
          play={() => setIntroOpen(false)}
          hintClick={hintClick}
        />
      )}
      {!modalOpen && (
        <Arena
          back={() => {
            setIntroOpen(true);
            setHint(true);
          }}
        />
      )}
    </>
  );
}

export default App;
