import * as errorTypes from "./consts/errorTypes";
import * as errorMessages from "./consts/errorMessages";
import * as fieldNames from "./consts/fieldNames";
import * as titles from "./consts/titles";
import * as placeholders from "./consts/placeholders";

export const generateErrorMessage = (fieldName, errorType) => {
  if (errorType === errorTypes.isRequired) {
    return generateTitle(fieldName) + errorMessages.isRequired;
  }
  if (errorType === errorTypes.invalidEmail) {
    return errorMessages.invalidEmail;
  }
  return errorMessages.emptyMsg;
};

export const generatePlaceholder = (fieldName) => {
  const title = generateTitle(fieldName);
  if (fieldName === fieldNames.eventDate) {
    return placeholders.pickDate
  }
  else {
    return placeholders.typeYourXHere(title)
  }
};

export const generateTitle = (fieldName) => {
  switch (fieldName) {
    case fieldNames.firstName:
      return titles.firstName;
    case fieldNames.lastName:
      return titles.lastName;
    case fieldNames.email:
      return titles.email;
    case fieldNames.eventDate:
      return titles.eventDate;
    default:
      return fieldName;
  }
};