import {firstName, lastName, email, eventDate} from "../../consts/fieldNames";

export const validationRules = {
  [firstName]: {
    isRequired: true
  },
  [lastName]: {
    isRequired: true
  },
  [email]: {
    isRequired: true,
    isEmail: true
  },
  [eventDate]: {
    isRequired: true
  }
};