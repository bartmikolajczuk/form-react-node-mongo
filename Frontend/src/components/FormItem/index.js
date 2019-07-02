import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import {Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "./react-datepicker.css";
import * as classNames from '../../consts/validationClassNames'
import * as validationStates from '../../consts/validationStates'
import * as errorMessages from '../../consts/errorMessages'
import * as errorTypes from '../../consts/errorTypes'
import * as inputTypes from '../../consts/inputTypes'
import {changeValue, validateField} from "../../actions";
import {validationRules} from "../../consts/validationRules";

const mapStateToProps = (state, ownProps) => {
  return {
    fieldValue: state.formValues[ownProps.title],
    fieldValidation: state.formValidation[ownProps.title]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeValue: field => dispatch(changeValue(field)),
    validateField: field => dispatch(validateField(field))
  };
}

const FormItem = (props) => {
  function validationClassNameSwitch() {
    if (props.fieldValidation.validationState === validationStates.valid) {
      return classNames.valid
    }
    if (props.fieldValidation.validationState === validationStates.invalid) {
      return classNames.invalid
    }
    return null
  }

  function generateErrorMessage() {
    if (props.fieldValidation.errorType === errorTypes.isRequired) {
      return errorMessages.isRequired(props.title);
    }
    if (props.fieldValidation.errorType === errorTypes.invalidEmail) {
      return errorMessages.invalidEmail;
    }
    return errorMessages.emptyMsg;
  }

  function inputTypeSwitch() {
    let input;
    switch (props.type) {
      case inputTypes.text :
        input = <Input
          type={inputTypes.text}
          name={props.title}
          placeholder={props.placeholderMsg}
          value={props.fieldValue}
          valid={props.fieldValidation.validationState === validationStates.valid}
          invalid={props.fieldValidation.validationState === validationStates.invalid}
          onChange={(e) => {
            props.changeValue({title: props.title, fieldValue: e.target.value});
            props.validateField({
              title: props.title,
              fieldValue: e.target.value,
              validationRules: validationRules[props.title]
            })
          }}
        />;
        break;
      case inputTypes.date :
        input = <DatePicker
          selected={props.fieldValue}
          onChange={(dateValue) => {
            props.changeValue({title: props.title, fieldValue: dateValue});
            props.validateField({
              title: props.title,
              fieldValue: dateValue,
              validationRules: validationRules[props.title]
            })
          }}
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
        <Label>{props.title}{validationRules[props.title].isRequired ?
          <span className={styles.emphasize}>*</span> : null}</Label>
        {inputTypeSwitch()}
        <div className={styles.errorMessage}>{props.fieldValidation.errorType ? generateErrorMessage() : '\u00A0'}</div>
      </div>
    </div>
  )
};

FormItem.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholderMsg: PropTypes.string,
  validation: PropTypes.object
};

let ConnectedFormItem = connect(mapStateToProps, mapDispatchToProps)(FormItem);

export default ConnectedFormItem;