import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import {Label, Input} from 'reactstrap';
import styles from './styles.module.scss';
import "./react-datepicker.css";
import * as validationClassNames from './consts/validationClassNames'
import * as dataTestIds from '../../consts/dataTestIds'
import * as validationStates from '../../utils/consts/validationStates'
import * as inputTypes from '../../consts/inputTypes'
import {validationRules} from "../../utils/consts/validationRules";
import {getErrorMessage, getTitle} from '../../utils/messageManager'
import {changeValue, validateField, validateForm} from "../../actions";

export const FormItem = (props) => {

  function getValidationClassName() {
    if (props.fieldValidation.validationState === validationStates.valid) {
      return validationClassNames.valid
    }
    if (props.fieldValidation.validationState === validationStates.invalid) {
      return validationClassNames.invalid
    }
    return '';
  }

  const handleChange = (value) => {
    props.changeValue({fieldName: props.fieldName, fieldValue: value});
    props.validateField({
      fieldName: props.fieldName,
      fieldValue: value,
      validationRules: validationRules[props.fieldName]
    });
    props.validateForm()
  };

  function inputTypeSwitch() {
    switch (props.type) {
      case inputTypes.text :
        return <Input
          type={inputTypes.text}
          name={props.fieldName}
          data-testid={`${props.fieldName}${dataTestIds.input}`}
          placeholder={props.placeholderMsg}
          value={props.fieldValue}
          //three validation states are possible: valid, invalid, and neutral
          valid={props.fieldValidation.validationState === validationStates.valid}
          invalid={props.fieldValidation.validationState === validationStates.invalid}
          onChange={(e) => handleChange(e.target.value)}
        />;
      case inputTypes.date :
        return <DatePicker
          selected={props.fieldValue}
          onChange={handleChange}
          onChangeRaw={(e) => {
            e.preventDefault()
          }}
          minDate={new Date().setDate(new Date().getDate() + 1)}
          placeholderText={props.placeholderMsg}
          className={getValidationClassName()}
        />;
      default:
        return '';
    }
  }

  return (
    <div className={styles.formItem}>
      <div className={styles.formGroup}>
        <Label>{getTitle(props.fieldName)}{validationRules[props.fieldName].isRequired ?
          <span className={styles.emphasize}>*</span> : null}</Label>
        {inputTypeSwitch()}
        <div
          data-testid={`${props.fieldName}${dataTestIds.errorMsg}`}
          className={styles.errorMessage}>{props.fieldValidation.errorType ? getErrorMessage(props.fieldName, props.fieldValidation.errorType) : ' '}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormItem);