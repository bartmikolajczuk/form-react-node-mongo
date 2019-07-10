import * as validationStates from './consts/validationStates'
import {validationRules} from "./consts/validationRules";
import {emailRegex} from "./consts/regularExpresions";
import * as errorTypes from './consts/errorTypes'

export const validateForm = (formValidation) => {
  let isFormValid = true;

  Object.entries(formValidation).map(([key, fieldValidation]) => {
    if (fieldValidation.validationState === validationStates.invalid) {
      isFormValid = false;
    }
    if (fieldValidation.validationState === validationStates.neutral && validationRules[key].isRequired) {
      isFormValid = false
    }
    return isFormValid;
  });
  return isFormValid
};

export const validateField = (value, validationRules) => {
  let {isRequired, isEmail} = validationRules;

  if (isRequired && !value) {
    return {validationState: validationStates.invalid, errorType: errorTypes.isRequired};
  }
  if (isEmail && !isEmailCorrect(value)) {
    return {validationState: validationStates.invalid, errorType: errorTypes.invalidEmail};
  }
  if (value) {
    return {validationState: validationStates.valid, errorType: ''};
  }
  return {validationState: validationStates.neutral, errorType: ''};
};

function isEmailCorrect(value) {
  return emailRegex.test(value);
}
