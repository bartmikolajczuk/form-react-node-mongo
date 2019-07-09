import React from 'react';
import './styles.module.scss';

import Navbar from "../Navbar";
import Form from "../../containers/Form";

const App = () => {

  return (
    <React.Fragment>
      <Navbar title={"Event App"}/>
      <Form/>
    </React.Fragment>
  );
};

export default App;