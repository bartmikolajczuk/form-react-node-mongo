import {rootReducer} from '../reducers'
import {email, eventDate, firstName, lastName} from "../consts/fieldNames";
import {CHANGE_VALUE, VALIDATE_FORM, VALIDATE_FIELD} from "../consts/actionTypes";
import {neutral, valid} from "../consts/validationStates";
import {initialFormState} from "../consts/initialFormState";

describe('REDUCERS - Form reducers tests', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(
      {
        formValues: {
          [firstName]: '',
          [lastName]: '',
          [email]: '',
          [eventDate]: ''
        },
        formValidation: {
          [firstName]: {validationState: neutral},
          [lastName]: {validationState: neutral},
          [email]: {validationState: neutral},
          [eventDate]: {validationState: neutral}
        },
        isFormValid: false

      }
    )
  });

  it('should handle CHANGE_VALUE', () => {
    const fieldParams = {fieldName: firstName, fieldValue: 'hello'};
    const newFormValues = {...initialFormState.formValues};
    newFormValues[fieldParams.fieldName] = fieldParams.fieldValue;
    expect(
      rootReducer(undefined, {
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
      rootReducer(undefined, {
        type: VALIDATE_FORM
      })
    ).toEqual({
      ...initialFormState
    });
  })

  it('should handle VALIDATE_FORM with completed form', () => {
    const completedFormState = {
      formValues: {
        [firstName]: 'Name',
        [lastName]: 'Name',
        [email]: 'user@gg.pl',
        [eventDate]: '12/12/1999'
      },
      formValidation: {
        [firstName]: {validationState: valid},
        [lastName]: {validationState: valid},
        [email]: {validationState: valid},
        [eventDate]: {validationState: valid}
      },
      isFormValid: false
    };

    expect(
      rootReducer(completedFormState, {
        type: VALIDATE_FORM
      })
    ).toEqual({
      ...completedFormState,
      isFormValid: true
    });
  });

  it('should handle VALIDATE_FIELD', () => {
    const fieldParams = {fieldName: firstName, fieldValue: 'hello'};
    const newFormValues = {...initialFormState.formValues};
    newFormValues[fieldParams.fieldName] = fieldParams.fieldValue;
    expect(
      rootReducer(undefined, {
        type: CHANGE_VALUE,
        payload: fieldParams
      })
    ).toEqual({
      ...initialFormState,
      formValues: newFormValues
    });
  });

});