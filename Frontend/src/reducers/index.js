import {CHANGE_VALUE, VALIDATE_FIELD, VALIDATE_FORM, SUBMIT_FORM} from "../consts/actionTypes";
import {validateField, validateForm} from '../validationModule'
import {initialFormState} from "../consts/initialFormState";


export function rootReducer(state = initialFormState, action) {
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
    return {
      ...state,
      isFormValid: newIsFormValid
    };
  }
  if (action.type === SUBMIT_FORM) {
    return {
      ...state,
      isFormSubmitted: true
    };
  }
  return state;
}

export default rootReducer;