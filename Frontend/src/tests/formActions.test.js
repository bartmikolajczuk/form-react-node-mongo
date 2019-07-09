import {changeValue, validateForm, validateField, submitForm} from "../actions/index";
import {CHANGE_VALUE, VALIDATE_FORM, VALIDATE_FIELD, SUBMIT_FORM} from "../consts/actionTypes";
import {validationRules} from "../consts/validationRules";
import {eventDate, firstName, lastName, email} from "../consts/fieldNames";


describe('ACTIONS - Form action creators tests',()=>{
  it('creates CHANGE_VALUE when value is changed', () => {
    const fieldParams = {fieldName: firstName, fieldValue: 'hello'};
    const changeValueAction = changeValue(fieldParams);
    expect(changeValueAction).toEqual({type: CHANGE_VALUE, payload: fieldParams})
  });

  it('creates VALIDATE_FORM when validateForm is called', () => {
    const validateFormAction = validateForm();
    expect(validateFormAction).toEqual({type: VALIDATE_FORM})
  });

  it('creates SUBMIT_FORM when validateForm is called', () => {
    const submitFormAction = submitForm();
    expect(submitFormAction).toEqual({type: SUBMIT_FORM})
  });

  it('creates VALIDATE_FIELD when validateField is called', () => {
    const fieldParams = {
      fieldName: firstName,
      fieldValue: 'hello',
      validationRules: validationRules[firstName]
    };
    const validateFieldAction = validateField(fieldParams);
    expect(validateFieldAction).toEqual({type: VALIDATE_FIELD, payload: fieldParams})
  });
});