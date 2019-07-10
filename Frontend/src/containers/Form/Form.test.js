import React from 'react'
import {fireEvent, cleanup} from '@testing-library/react'
import {Form} from "./index";
import {firstName, lastName, email} from "../../consts/fieldNames";
import {input, submitButton} from "../../consts/dataTestIds";
import {renderWithRedux} from "../../utils/consts/testingHelper";

afterEach(cleanup);

export const handler = jest.fn(e => e.preventDefault());
test('submit button is clickable when the form is completed', () => {
  const {getByTestId,  getByText, getByPlaceholderText} = renderWithRedux(<Form />);

  fireEvent.change(getByTestId(`${firstName}${input}`), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(`${lastName}${input}`), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(`${email}${input}`), { target: { value: 'hello@gg.pl' } });
  fireEvent.click(getByPlaceholderText('Pick your event\'s date'));
  fireEvent.click(getByText('16'));

  fireEvent.click(getByTestId(submitButton));
  // expect(handler).toHaveBeenCalled();

});


