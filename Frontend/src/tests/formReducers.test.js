import {formReducer} from '../reducers'
import {email, eventDate, firstName, lastName} from "../consts/fieldNames";
import {CHANGE_VALUE, VALIDATE_FORM, VALIDATE_FIELD, SUBMIT_FORM} from "../consts/actionTypes";
import {neutral, valid} from "../consts/validationStates";
import {initialFormState} from "../consts/initialFormState";

describe('REDUCERS - Form reducers tests', () => {
  it('should return the initial state', () => {
    expect(formReducer(undefined, {})).toEqual(
      {
        formValues: {
          [firstName]: '',
          [lastName]: '',
          [email]: '',
          [eventDate]: ''
        },
        formValidation: {
          [firstName]: {validationState: neutral, errorType: ''},
          [lastName]: {validationState: neutral, errorType: ''},
          [email]: {validationState: neutral, errorType: ''},
          [eventDate]: {validationState: neutral, errorType: ''}
        },
        isFormValid: false,
        isFormSubmitted: false

      }
    )
  });

  it('should handle CHANGE_VALUE', () => {
    const fieldParams = {fieldName: firstName, fieldValue: 'hello'};
    const newFormValues = {...initialFormState.formValues};
    newFormValues[fieldParams.fieldName] = fieldParams.fieldValue;
    expect(
      formReducer(undefined, {
        type: CHANGE_VALUE,
        payload: fieldParams
      })
    ).toEqual({
      ...initialFormState,
      formValues: newFormValues
    });
  });

  it('should handle VALIDATE_FORM with empty form', () => {
    expect(
      formReducer(undefined, {
        type: VALIDATE_FORM
      })
    ).toEqual({
      ...initialFormState
    });
  });

  it('should handle VALIDATE_FORM with completed form', () => {
    const completedFormState = {
      formValues: {
        [firstName]: 'Name',
        [lastName]: 'Name',
        [email]: 'user@gg.pl',
        [eventDate]: '12/12/2020'
      },
      formValidation: {
        [firstName]: {validationState: valid},
        [lastName]: {validationState: valid},
        [email]: {validationState: valid},
        [eventDate]: {validationState: valid}
      },
      isFormSubmitted: false,
      isFormValid: false,
    };

    expect(
      formReducer(completedFormState, {
        type: VALIDATE_FORM
      })
    ).toEqual({
      ...completedFormState,
      isFormValid: true
    });
  });

  it('should handle SUBMIT_FORM ', () => {
    expect(
      formReducer(undefined, {
        type: SUBMIT_FORM
      })
    ).toEqual({
      ...initialFormState,
      isFormSubmitted: true
    });
  });

  it('should handle VALIDATE_FIELD', () => {
    const fieldParams = {fieldName: firstName, fieldValue: 'hello'};
    const newFormValues = {...initialFormState.formValues};
    newFormValues[fieldParams.fieldName] = fieldParams.fieldValue;
    expect(
      formReducer(undefined, {
        type: CHANGE_VALUE,
        payload: fieldParams
      })
    ).toEqual({
      ...initialFormState,
      formValues: newFormValues
    });
  });

});