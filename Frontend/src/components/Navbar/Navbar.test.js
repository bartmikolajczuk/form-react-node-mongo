import React from 'react'
import {render, cleanup} from '@testing-library/react'
import Navbar from "./index";
import {navBarTitle} from "../../consts/dataTestIds";

afterEach(cleanup);

test('loads and displays navbar', () => {

  const {getByTestId} = render(<Navbar title={'Event App'}/>);
  expect(getByTestId(navBarTitle).textContent).toBe('Event App');
});