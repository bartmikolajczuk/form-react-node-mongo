import React from 'react'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {rootReducer} from "../reducers";
import {render, fireEvent, cleanup, waitForElement} from '@testing-library/react'
import {Form} from "../components/Form";
import {firstName, lastName, email, eventDate} from "../consts/fieldNames";
import {isRequired, invalidEmail} from "../consts/errorMessages";
import * as titles from "../consts/titles"

afterEach(cleanup);

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  {initialState, store = createStore(rootReducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

// FIRST NAME
test('captures first name correctly onChange', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(firstName), { target: { value: 'hello' } });
  expect(getByTestId(firstName).value).toBe('hello')
});
test('shows isRequired error message when leaving firstName field empty after typing', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(firstName), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(firstName), { target: { value: '' } });
  expect(getByTestId(firstName + 'ErrorMessage').textContent).toBe(isRequired(titles.firstName))
});

// LAST NAME
test('captures last name correctly onChange', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(lastName), { target: { value: 'hello' } });
  expect(getByTestId(lastName).value).toBe('hello')
});
test('shows isRequired error message when leaving lastName field empty after typing', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(lastName), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(lastName), { target: { value: '' } });
  expect(getByTestId(lastName + 'ErrorMessage').textContent).toBe(isRequired(titles.lastName))
});

// EMAIL
test('captures email correctly onChange', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(email), { target: { value: 'hello' } });
  expect(getByTestId(email).value).toBe('hello')
});
test('shows isRequired error message when leaving email field empty after typing', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(email), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(email), { target: { value: '' } });
  expect(getByTestId(email + 'ErrorMessage').textContent).toBe(isRequired(titles.email))
});
test('shows error when invalid email is given', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(email), { target: { value: 'hello' } });
  expect(getByTestId(email + 'ErrorMessage').textContent).toBe(invalidEmail)
});

// EVENT DATE
test('captures event date correctly onChange', () => {
  const {getByPlaceholderText} = renderWithRedux(<Form />);
  fireEvent.change(getByPlaceholderText('Pick your event\'s date'), { target: { value: '12/12/1999' } });
  expect(getByPlaceholderText('Pick your event\'s date').value).toBe('12/12/1999')
});
test('shows isRequired error message when leaving eventDate field empty after typing', () => {
  const {getByTestId} = renderWithRedux(<Form />);
  fireEvent.change(getByTestId(firstName), { target: { value: 'hello' } });
  fireEvent.change(getByTestId(firstName), { target: { value: '' } });
  expect(getByTestId(firstName + 'ErrorMessage').textContent).toBe(isRequired(titles.firstName))
});



