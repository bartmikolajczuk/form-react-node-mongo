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
    [firstName]: {validationState: neutral},
    [lastName]: {validationState: neutral},
    [email]: {validationState: neutral},
    [eventDate]: {validationState: neutral}
  },
  isFormValid: false,
  isFormSubmitted: false
};