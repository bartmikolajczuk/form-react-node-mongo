import {CHANGE_VALUE, VALIDATE_FIELD, VALIDATE_FORM} from "../consts/actionTypes";
import {firstName, lastName, email, eventDate} from '../consts/fieldNames';
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
    newForm[action.payload.fieldName] = action.payload.fieldValue;
    return {
      ...state,
      formValues: newForm
    };
  }
  if (action.type === VALIDATE_FIELD) {
    const newFormValidation = {...state.formValidation};
    newFormValidation[action.payload.fieldName] = validateField(action.payload.fieldValue, action.payload.validationRules);

    return {
      ...state,
      formValidation: newFormValidation
    };
  }
  if (action.type === VALIDATE_FORM) {
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