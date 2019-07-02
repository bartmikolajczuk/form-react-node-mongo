import * as validationStates from './consts/validationStates'
import * as errorTypes from './consts/errorTypes'

export const validateForm = (values) => {

}

export const validateField = (value, validationRules) => {
  // console.log(value);
  // console.log(validation);
  let {isRequired, isEmail} = validationRules;
  // console.log(isRequired);
  // console.log(isEmail);

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
