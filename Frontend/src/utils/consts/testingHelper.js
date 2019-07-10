import React from 'react'
import {createStore} from "redux";
import {formReducer} from "../../reducers";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";

export function renderWithRedux(
  ui,
  {initialState, store = createStore(formReducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}