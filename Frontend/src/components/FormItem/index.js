import React from 'react';
import { connect } from "react-redux";
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

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // fieldValue: '',
      // validationState: '',
      // errorMsg: '',
      // errorType: ''
    };
  }

  validationClassNameSwitch() {
    if (this.props.fieldValidation.validationState === validationStates.valid) {
      return classNames.valid
    }
    if (this.props.fieldValidation.validationState === validationStates.invalid) {
      return classNames.invalid
    }
    return null
  }
  generateErrorMessage() {
    if (this.props.fieldValidation.errorType === errorTypes.isRequired) {
      return errorMessages.isRequired(this.props.title);
    }
    if (this.props.fieldValidation.errorType === errorTypes.invalidEmail) {
      return errorMessages.invalidEmail;
    }
    return errorMessages.emptyMsg;
  }
  inputTypeSwitch() {
    let input;
    switch (this.props.type) {
      case inputTypes.text :
        input = <Input
          type={inputTypes.text}
          name={this.props.title}
          placeholder={this.props.placeholderMsg}
          value={this.props.fieldValue}
          valid={this.props.fieldValidation.validationState === validationStates.valid}
          invalid={this.props.fieldValidation.validationState === validationStates.invalid}
          onChange={(e) => {
            this.props.changeValue({ title: this.props.title, fieldValue: e.target.value});
            this.props.validateField({title: this.props.title, fieldValue: e.target.value, validationRules: validationRules[this.props.title]})
          }}
        />;
        break;
      case inputTypes.date :
        input = <DatePicker
          selected={this.props.fieldValue}
          onChange={(dateValue) => {
            this.props.changeValue({ title: this.props.title, fieldValue: dateValue});
            this.props.validateField({title: this.props.title, fieldValue: dateValue, validationRules: validationRules[this.props.title]})
          }}
          minDate={new Date().setDate(new Date().getDate() + 1)}
          placeholderText={this.props.placeholderMsg}
          className={this.validationClassNameSwitch()}
        />;
        break;
      default:
        input = null;
    }
    return input;
  }

  render() {
    return (
      <div className={styles.formItem}>
        <div className={styles.formGroup}>
          <Label>{this.props.title}{validationRules[this.props.title].isRequired ? <span className={styles.emphasize}>*</span> : null}</Label>
          {this.inputTypeSwitch()}
          <div className={styles.errorMessage}>{this.props.fieldValidation.errorType ? this.generateErrorMessage() : '\u00A0'}</div>
        </div>
      </div>
    )
  }
}

FormItem.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholderMsg: PropTypes.string,
  validation: PropTypes.object
};

FormItem = connect(mapStateToProps, mapDispatchToProps)(FormItem);

export default FormItem;