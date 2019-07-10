import React from 'react'
import {render, cleanup} from '@testing-library/react'
import InfoBox from "./index";
import {success, eventAdded} from './consts/infoBoxMessages'
import {infoBoxTitle} from "../../consts/dataTestIds";

afterEach(cleanup);

test('loads and displays info box', () => {

  const {getByTestId} = render(<InfoBox title={success} description={eventAdded}/>);
  expect(getByTestId(infoBoxTitle).textContent).toBe('Success!');
});