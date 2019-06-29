import React from 'react';
import './App.module.scss';

import Navbar from "./components/Navbar";
import Form from "./components/Form";

const App = () => {

  return (
    <React.Fragment>
      <Navbar title={"Event App"}/>
      <Form/>
    </React.Fragment>
  );
};

export default App;