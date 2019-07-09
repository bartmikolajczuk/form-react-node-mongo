import {email, eventDate, firstName, lastName} from "./fieldNames";
import {neutral} from "./validationStates";

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