import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import {Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "./react-datepicker.css";
import * as classNames from '../../consts/classNames'
import * as validationStates from '../../consts/validationStates'
import * as errorMessages from '../../consts/errorMessages'
import * as inputTypes from '../../consts/inputTypes'

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
      validationState: '',
      errorMsg: ''
    };
  }

  handleValidation() {
    if (this.props.isRequired) {
      this.setState({validationState: !this.state.fieldValue ? validationStates.invalid : validationStates.valid});
      this.setState({errorMsg: !this.state.fieldValue ? errorMessages.isRequired(this.props.title) : errorMessages.emptyMsg})
    } else if (this.props.customValidation && !!this.state.fieldValue.length) {
      let [isValid, errorMsg] = this.props.customValidation(this.state.fieldValue);
      this.setState({validationState: isValid ? validationStates.valid : validationStates.invalid});
      this.setState({errorMsg: isValid ? '' : errorMsg})
    } else if (!this.props.isRequired && !this.state.fieldValue) {
      this.setState({validationState: validationStates.neutral});
      this.setState({errorMsg: validationStates.neutral})
    }
  }

  customClassNameSwitch() {
    if (this.state.validationState === validationStates.valid) {
      return classNames.valid
    }
    if (this.state.validationState === validationStates.invalid) {
      return classNames.invalid
    }
    return null
  }

  inputTypeSwitch() {
    let input = null;
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
            this.setState({fieldValue: e.target.value}, () => this.handleValidation());
          }}
        />;
        break;
      case inputTypes.date :
        input = <DatePicker
          selected={this.state.fieldValue}
          onChange={(dateValue) => {
            this.setState({fieldValue: dateValue}, () => this.handleValidation());
          }}
          placeholderText={this.props.placeholderMsg}
          className={this.customClassNameSwitch()}
          // className={this.state.validationState === 'valid' ? 'react-datepicker__input-is-valid' : 'red'}
        />;
        break;
    }
    return input;
  }
  render() {
    return (
      <div className={styles.formItem}>
        <div className={styles.formGroup}>
          <Label>{this.props.title}{this.props.isRequired ? <span className={styles.emphasize}>*</span> : null}</Label>
          {this.inputTypeSwitch()}
          <div className={styles.errorMessage}>{this.state.errorMsg ? this.state.errorMsg : '\u00A0'}</div>
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