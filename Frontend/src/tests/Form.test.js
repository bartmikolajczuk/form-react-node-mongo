// import React from 'react'
// import {createStore} from 'redux'
// import {Provider, connect} from 'react-redux'
// import {formReducer} from "../reducers";
// import {render, fireEvent, cleanup, waitForElement} from '@testing-library/react'
// import {Form} from "../containers/Form";
// // import {firstName, default as titles} from "../consts/titles";
// import {firstName, lastName, email, eventDate} from "../consts/fieldNames";
// import {isRequired} from "../consts/errorMessages";
// import {invalid, valid} from "../consts/validationStates";
// import {submitButton} from "../consts/dataTestIds";
//
// afterEach(cleanup);
//
// // this is a handy function that I normally make available for all my tests
// // that deal with connected components.
// // you can provide initialState or the entire store that the ui is rendered with
// function renderWithRedux(
//   ui,
//   {initialState, store = createStore(formReducer, initialState)} = {},
// ) {
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     // adding `store` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     store,
//   }
// }
// test('submit button is disabled when the form is not completed', async() => {
//   const onClick = jest.fn();
//   const completedFormState = {
//     formValues: {
//       [firstName]: 'Name',
//       [lastName]: 'Name',
//       [email]: 'user@gg.pl',
//       [eventDate]: ''
//     },
//     formValidation: {
//       [firstName]: {validationState: valid},
//       [lastName]: {validationState: valid},
//       [email]: {validationState: valid},
//       [eventDate]: {validationState: invalid}
//     },
//     isFormSubmitted: false,
//     isFormValid: true,
//   };
//   const {getByTestId, findByTestId,  getByText, getByPlaceholderText} = renderWithRedux(<Form />, {initialState: completedFormState});
//
//   fireEvent.click(getByTestId(submitButton));
//   // expect(onClick).not.toHaveBeenCalled();
//   const iii = await findByTestId('infoBox-title');
//   console.log(iii);
//   // expect(getByText('PUBLISH EVENT').prop("disabled")).toBe(true);
//   expect(iii).toBe('Success!')
// });
//
// // test('shows isRequired error message when leaving lastName field empty after typing', () => {
// //   const {getByTestId} = renderWithRedux(<Form />);
// //   fireEvent.click(getByTestId(lastName), { target: { value: 'hello' } });
// //   fireEvent.change(getByTestId(lastName), { target: { value: '' } });
// //   expect(getByTestId(lastName + 'ErrorMessage').textContent).toBe(isRequired(titles.lastName))
// // });
//
