import {CHANGE_VALUE, VALIDATE_FIELD, VALIDATE_FORM} from "../consts/actionTypes";
import {firstName, lastName, email, eventDate} from '../consts/titles';
import {validateField, validateForm} from '../validationModule'
import {neutral} from "../consts/validationStates";

const initialState = {
  formValues: {
    [firstName]: '',
    [lastName]: '',
    [email]: '',
    [eventDate]: ''
  },
  formValidation: {
    [firstName]: {validationState: neutral},
    [lastName]: {validationState: neutral},
    [email]: {validationState: neutral},
    [eventDate]: {validationState: neutral}
  },
  isFormValid: false

};

function rootReducer(state = initialState, action) {
  if (action.type === CHANGE_VALUE) {
    const newForm = {...state.formValues};
    console.log(action);
    newForm[action.payload.title] = action.payload.fieldValue;
    console.log(newForm);
    return {
      ...state,
      formValues: newForm
    };
  }
  if (action.type === VALIDATE_FIELD) {
    const newFormValidation = {...state.formValidation};
    console.log(action);
    newFormValidation[action.payload.title] = validateField(action.payload.fieldValue, action.payload.validationRules);
    console.log(newFormValidation);

    return {
      ...state,
      formValidation: newFormValidation
    };
  }
  if (action.type === VALIDATE_FORM) {
    console.log(state.formValidation);
    const newIsFormValid = validateForm(state.formValidation);
    console.log(newIsFormValid);

    return {
      ...state,
      isFormValid: newIsFormValid
    };
  }
  return state;
}

export default rootReducer;