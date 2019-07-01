import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import {Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "./react-datepicker.css";
import * as classNames from '../../consts/classNames'
import * as validationStates from '../../consts/validationStates'
import * as errorMessages from '../../consts/errorMessages'
import * as errorTypes from '../../consts/errorTypes'
import * as inputTypes from '../../consts/inputTypes'
import {validate} from '../../validationModule'

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
      validationState: '',
      errorMsg: '',
      errorType: ''
    };
  }

  validationClassNameSwitch() {
    if (this.state.validationState === validationStates.valid) {
      return classNames.valid
    }
    if (this.state.validationState === validationStates.invalid) {
      return classNames.invalid
    }
    return null
  }
  generateErrorMessage() {
    if (this.state.errorType === errorTypes.isRequired) {
      return errorMessages.isRequired(this.props.title);
    }
    if (this.state.errorType === errorTypes.invalidEmail) {
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
          value={this.state.fieldValue}
          valid={this.state.validationState === validationStates.valid}
          invalid={this.state.validationState === validationStates.invalid}
          onChange={(e) => {
            this.setState({fieldValue: e.target.value}, () => {
              this.setState({
                validationState: validate(this.state.fieldValue, this.props.validation).validationState,
                errorType: validate(this.state.fieldValue, this.props.validation).errorType
              })
            });
          }}
        />;
        break;
      case inputTypes.date :
        input = <DatePicker
          selected={this.state.fieldValue}
          onChange={(dateValue) => {
            this.setState({fieldValue: dateValue}, () => {
              this.setState({
                validationState: validate(this.state.fieldValue, this.props.validation).validationState,
                errorType: validate(this.state.fieldValue, this.props.validation).errorType
              })
            });
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
          <Label>{this.props.title}{this.props.validation.isRequired ? <span className={styles.emphasize}>*</span> : null}</Label>
          {this.inputTypeSwitch()}
          <div className={styles.errorMessage}>{this.state.errorType ? this.generateErrorMessage() : '\u00A0'}</div>
        </div>
      </div>
    )
  }
}

FormItem.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]
  )
};
export default FormItem;