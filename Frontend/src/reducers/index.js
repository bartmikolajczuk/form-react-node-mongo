import {ADD_ARTICLE, CHANGE_VALUE, VALIDATE_FIELD, VALIDATE_FORM} from "../consts/actionTypes";
import {firstName, lastName, email, eventDate} from '../consts/titles';
import {validateField, validateForm} from '../validationModule'

const initialState = {
  formValues: {
    [firstName]: '',
    [lastName]: '',
    [email]: '',
    [eventDate]: ''
  },
  formValidation: {
    [firstName]: '',
    [lastName]: '',
    [email]: '',
    [eventDate]: ''
  },
  isFormValid: false

};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === CHANGE_VALUE) {
    const newForm = {...state.formValues};
    console.log(action);
    newForm[action.payload.title] = action.payload.fieldValue;
    console.log(newForm);
    return {
      ...state,
      formValues: newForm
    };
  }
  if (action.type === VALIDATE_FIELD) {
    const newFormValidation = {...state.formValidation};
    console.log(action);
    newFormValidation[action.payload.title] = validateField(action.payload.fieldValue, action.payload.validationRules);
    console.log(newFormValidation);

    return {
      ...state,
      formValidation: newFormValidation
    };
  }
  if (action.type === VALIDATE_FORM) {
    const newFormValidation = {...state.formValidation};
    console.log(action);
    newFormValidation[action.payload.title] = validateField(action.payload.fieldValue, action.payload.validationRules);
    console.log(newFormValidation);

    return {
      ...state,
      formValidation: newFormValidation
    };
  }
  return state;
}

export default rootReducer;