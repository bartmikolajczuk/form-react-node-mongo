import React from 'react'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {formReducer} from "../reducers";
import {render, fireEvent, cleanup, waitForElement} from '@testing-library/react'
import {FormItem} from "../containers/FormItem";
import * as fieldNames from "../consts/fieldNames";
import {errorMsg, input} from "../consts/dataTestIds";
import * as errorTypes from "../utils/consts/errorTypes";
import {isRequired, invalidEmail} from "../utils/consts/errorMessages";
import * as titles from "../utils/consts/titles"
import {getErrorMessage, getPlaceholder} from "../utils/messageManager";
import * as inputTypes from "../consts/inputTypes";

afterEach(cleanup);


function renderWithRedux(
  ui,
  {initialState, store = createStore(formReducer, initialState)} = {},
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
  const {getByTestId} = renderWithRedux
  (<FormItem
    fieldName={fieldNames.firstName}
    type={inputTypes.text}
    placeholderMsg={getPlaceholder(fieldNames.firstName)}
  />);
  // fireEvent.change(getByTestId(firstName + input), {target: {value: 'hello'}});
  // expect(getByTestId(firstName + input).value).toBe('hello')
});
// test('shows isRequired error message when leaving firstName field empty after typing', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(firstName), { target: { value: 'hello' } });
//   fireEvent.change(getByTestId(firstName), { target: { value: '' } });
//   expect(getByTestId(firstName + errorMsg).textContent).toBe(getErrorMessage(firstName, errorTypes.isRequired))
// });
//
// // LAST NAME
// test('captures last name correctly onChange', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(lastName + input), { target: { value: 'hello' } });
//   expect(getByTestId(lastName + input).value).toBe('hello')
// });
// test('shows isRequired error message when leaving lastName field empty after typing', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(lastName + input), { target: { value: 'hello' } });
//   fireEvent.change(getByTestId(lastName + input), { target: { value: '' } });
//   expect(getByTestId(lastName + errorMsg).textContent).toBe(getErrorMessage(firstName, errorTypes.isRequired))
// });
//
// // EMAIL
// test('captures email correctly onChange', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(email + input), { target: { value: 'hello' } });
//   expect(getByTestId(email + errorMsg).value).toBe('hello')
// });
// test('shows isRequired error message when leaving email field empty after typing', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(email), { target: { value: 'hello' } });
//   fireEvent.change(getByTestId(email), { target: { value: '' } });
//   expect(getByTestId(email + 'ErrorMessage').textContent).toBe(getErrorMessage(firstName, errorTypes.isRequired))
// });
// test('shows error when invalid email is given', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(email), { target: { value: 'hello' } });
//   expect(getByTestId(email + 'ErrorMessage').textContent).toBe(invalidEmail)
// });
//
// // EVENT DATE
// test('captures event date correctly onChange', () => {
//   const {getByPlaceholderText} = renderWithRedux(<Form />);
//   fireEvent.change(getByPlaceholderText('Pick your event\'s date'), { target: { value: '12/12/1999' } });
//   expect(getByPlaceholderText('Pick your event\'s date').value).toBe('12/12/1999')
// });
// test('shows isRequired error message when leaving eventDate field empty after typing', () => {
//   const {getByTestId} = renderWithRedux(<Form />);
//   fireEvent.change(getByTestId(firstName), { target: { value: 'hello' } });
//   fireEvent.change(getByTestId(firstName), { target: { value: '' } });
//   expect(getByTestId(firstName + 'ErrorMessage').textContent).toBe(getErrorMessage(firstName, errorTypes.isRequired))
// });
//
//

