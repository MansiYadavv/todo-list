import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "../src/Mytodolist/todoactivity";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
