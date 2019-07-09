import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styles from './styles.module.scss';
import "./react-datepicker.css";
import {Label, Input} from 'reactstrap';
import * as validationClassNames from '../../consts/validationClassNames'
import * as dataTestIds from '../../consts/dataTestIds'
import * as validationStates from '../../consts/validationStates'
import * as inputTypes from '../../consts/inputTypes'
import {validationRules} from "../../consts/validationRules";
import {generateErrorMessage, generateTitle} from '../../utils/messageManager'
import {changeValue, validateField, validateForm} from "../../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    fieldValue: state.formValues[ownProps.fieldName],
    fieldValidation: state.formValidation[ownProps.fieldName]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeValue: field => dispatch(changeValue(field)),
    validateField: field => dispatch(validateField(field)),
    validateForm: () => dispatch(validateForm())
  };
}

export const FormItem = (props) => {
  function validationClassNameSwitch() {
    if (props.fieldValidation.validationState === validationStates.valid) {
      return validationClassNames.valid
    }
    if (props.fieldValidation.validationState === validationStates.invalid) {
      return validationClassNames.invalid
    }
    return null
  }


  function inputTypeSwitch() {
    let input;
    switch (props.type) {
      case inputTypes.text :
        input = <Input
          type={inputTypes.text}
          name={props.fieldName}
          data-testid={props.fieldName + dataTestIds.input}
          placeholder={props.placeholderMsg}
          value={props.fieldValue}
          valid={props.fieldValidation.validationState === validationStates.valid}
          invalid={props.fieldValidation.validationState === validationStates.invalid}
          onChange={(e) => {
            props.changeValue({fieldName: props.fieldName, fieldValue: e.target.value});
            props.validateField({
              fieldName: props.fieldName,
              fieldValue: e.target.value,
              validationRules: validationRules[props.fieldName]
            });
            props.validateForm()
          }}
        />;
        break;
      case inputTypes.date :
        input = <DatePicker
          selected={props.fieldValue}
          onChange={(dateValue) => {
            props.changeValue({fieldName: props.fieldName, fieldValue: dateValue});
            props.validateField({
              fieldName: props.fieldName,
              fieldValue: dateValue,
              validationRules: validationRules[props.fieldName]
            });
            props.validateForm();
          }}
          onChangeRaw={(e) => {e.preventDefault()}}
          minDate={new Date().setDate(new Date().getDate() + 1)}
          placeholderText={props.placeholderMsg}
          className={validationClassNameSwitch()}
        />;
        break;
      default:
        input = null;
    }
    return input;
  }

  return (
    <div className={styles.formItem}>
      <div className={styles.formGroup}>
        <Label>{generateTitle(props.fieldName)}{validationRules[props.fieldName].isRequired ?
          <span className={styles.emphasize}>*</span> : null}</Label>
        {inputTypeSwitch()}
        <div
          data-testid={props.fieldName + dataTestIds.errorMsg}
          className={styles.errorMessage}>{props.fieldValidation.errorType ? generateErrorMessage(props.fieldName, props.fieldValidation.errorType) : ' '}</div>
      </div>
    </div>
  )
};

FormItem.propTypes = {
  fieldName: PropTypes.string,
  type: PropTypes.string,
  placeholderMsg: PropTypes.string,
  fieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  fieldValidation: PropTypes.objectOf(PropTypes.string)
};

const ConnectedFormItem = connect(mapStateToProps, mapDispatchToProps)(FormItem);

export default ConnectedFormItem;