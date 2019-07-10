import React from 'react'
import {fireEvent, cleanup, } from '@testing-library/react'
import {Form} from "../Form";
import {firstName, lastName, email, eventDate} from "../../consts/fieldNames";
import {errorMsg, input} from "../../consts/dataTestIds";
import * as errorTypes from "../../utils/consts/errorTypes";
import {invalidEmail} from "../../utils/consts/errorMessages";
import {getErrorMessage, getPlaceholder} from "../../utils/messageManager";
import {renderWithRedux} from "../../utils/consts/testingHelper";

afterEach(cleanup);


// FIRST NAME
test('captures first name correctly onChange', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${firstName}${input}`), { target: { value: 'hello' } });
  expect(getByTestId(`${firstName}${input}`).value).toBe('hello')
});

test('shows isRequired error message when leaving firstName field empty after typing', async() => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${firstName}${input}`), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(`${firstName}${input}`), { target: { value: '' } });
  expect(getByTestId(`${firstName}${errorMsg}`).textContent).toBe(getErrorMessage(firstName, errorTypes.isRequired));
});

// LAST NAME
test('captures last name correctly onChange', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${lastName}${input}`), { target: { value: 'hello' } });
  expect(getByTestId(`${lastName}${input}`).value).toBe('hello')
});
test('shows isRequired error message when leaving lastName field empty after typing', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${lastName}${input}`), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(`${lastName}${input}`), { target: { value: '' } });
  expect(getByTestId(`${lastName}${errorMsg}`).textContent).toBe(getErrorMessage(lastName, errorTypes.isRequired))
});

// EMAIL
test('captures email correctly onChange', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${email}${input}`), { target: { value: 'hello' } });
  expect(getByTestId(`${email}${input}`).value).toBe('hello')
});
test('shows isRequired error message when leaving email field empty after typing', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${email}${input}`), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(`${email}${input}`), { target: { value: '' } });
  expect(getByTestId(`${email}${errorMsg}`).textContent).toBe(getErrorMessage(email, errorTypes.isRequired))
});
test('shows error when invalid email is given', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(`${email}${input}`), { target: { value: 'hello' } });
  expect(getByTestId(`${email}${errorMsg}`).textContent).toBe(invalidEmail)
});

// EVENT DATE
test('captures event date correctly onChange', () => {
  const {getByPlaceholderText, getByText} = renderWithRedux(<Form />);
  fireEvent.click(getByPlaceholderText(getPlaceholder(eventDate)));
  fireEvent.click(getByText('16'));
  expect(getByPlaceholderText('Pick your event\'s date').value).toBe('07/16/2019')
});




