import * as errorTypes from "./consts/errorTypes";
import * as errorMessages from "./consts/errorMessages";
import * as fieldNames from "../consts/fieldNames";
import * as titles from "./consts/titles";
import * as placeholders from "./consts/placeholders";

export const getErrorMessage = (fieldName, errorType) => {
  if (errorType === errorTypes.isRequired) {
    return `${getTitle(fieldName)} ${errorMessages.isRequired}`;
  }
  if (errorType === errorTypes.invalidEmail) {
    return errorMessages.invalidEmail;
  }
  return '';
};

export const getPlaceholder = (fieldName) => {
  const title = getTitle(fieldName);
  if (fieldName === fieldNames.eventDate) {
    return placeholders.datePlaceholder
  }
  return `Type your ${title.toLowerCase()} here`;
};

export const getTitle = (fieldName) => {
  return titles[fieldName]
};