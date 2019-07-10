import {CHANGE_VALUE, VALIDATE_FIELD, VALIDATE_FORM, SUBMIT_FORM} from "../actions/consts/actionTypes";
import {email, eventDate, firstName, lastName} from "../consts/fieldNames";
import {neutral} from "../utils/consts/validationStates";
import {validateField, validateForm} from '../utils/validationModule'

export const initialFormState = {
  formValues: {
    [firstName]: '',
    [lastName]: '',
    [email]: '',
    [eventDate]: ''
  },
  formValidation: {
    [firstName]: {validationState: neutral, errorType: ''},
    [lastName]: {validationState: neutral, errorType: ''},
    [email]: {validationState: neutral, errorType: ''},
    [eventDate]: {validationState: neutral, errorType: ''}
  },
  isFormValid: false,
  isFormSubmitted: false
};

export function formReducer(state = initialFormState, action) {
  switch (action.type) {

    case CHANGE_VALUE:
      const newFormValues = {...state.formValues, [action.payload.fieldName]: action.payload.fieldValue};
      return {
        ...state,
        formValues: newFormValues
      };

    case VALIDATE_FIELD:
      const newFormValidation = {...state.formValidation};
      newFormValidation[action.payload.fieldName] = validateField(action.payload.fieldValue, action.payload.validationRules);

      return {
        ...state,
        formValidation: newFormValidation
      };

    case VALIDATE_FORM:
      const newIsFormValid = validateForm(state.formValidation);
      return {
        ...state,
        isFormValid: newIsFormValid
      };

    case SUBMIT_FORM:
      return {
        ...state,
        isFormSubmitted: true
      };

    default:
      return state
  }
}

export default formReducer;