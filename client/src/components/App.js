import React from "react";
import NavBar from "./NavBar/NavBar.js";
import List from "./List/List.js";
import InputModal from "./List/InputModal";
import { Container } from "reactstrap";

import "./App.css";
const App = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <List />
        <InputModal />
      </Container>
    </div>
  );
};

export default App;
