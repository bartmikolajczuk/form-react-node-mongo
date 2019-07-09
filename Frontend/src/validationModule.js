import * as validationStates from './consts/validationStates'
import {validationRules} from "./consts/validationRules";
import * as errorTypes from './consts/errorTypes'

export const validateForm = (formValidation) => {
  let isFormValid = true;

  Object.entries(formValidation).map(([key, fieldValidation]) => {
    if (fieldValidation.validationState === validationStates.invalid) {
      isFormValid = false;
    }
    else if (fieldValidation.validationState === validationStates.neutral && validationRules[key].isRequired) {
      isFormValid = false
    }
    return isFormValid;
  });
  return isFormValid
};

export const validateField = (value, validationRules) => {
  let {isRequired, isEmail} = validationRules;

  let validationVerdict = {validationState: validationStates.neutral, errorType: errorTypes.noError};
  if (isRequired) {
    if (!value) {
      validationVerdict = {validationState: validationStates.invalid, errorType: errorTypes.isRequired};
      return validationVerdict;
    }
  }
  if (isEmail){
    if (!isEmailCorrect(value)) {
      validationVerdict = {validationState: validationStates.invalid, errorType: errorTypes.invalidEmail};
      return validationVerdict;
    }
  }
  if (value) {
    validationVerdict = {validationState: validationStates.valid, errorType: errorTypes.noError};
    return validationVerdict;
  }
  return validationVerdict;
};

function isEmailCorrect(value) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRex.test(value);
}
