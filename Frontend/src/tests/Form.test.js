import React from 'react'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {rootReducer} from "../reducers";
import {render, fireEvent, cleanup, waitForElement} from '@testing-library/react'
import {Form} from "../components/Form";
import {firstName} from "../consts/titles";

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

test('can render with redux with defaults', () => {
  const {getByTestId, getByText} = renderWithRedux(<Form />);
  fireEvent.click(getByText('PUBLISH EVENT'));
  expect(getByTestId('count-value').textContent).toBe('1')
})

