import {firstName, lastName, email, eventDate} from "./titles";

export const validationRules = {
  [firstName]: {
    isRequired: true
  },
  [lastName]: {
    isRequired: false
  },
  [email]: {
    isRequired: true,
    isEmail: true
  },
  [eventDate]: {
    isRequired: true
  }
};