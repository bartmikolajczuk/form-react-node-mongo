import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import {Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "./react-datepicker.css";

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
      this.setState({validationState: !this.state.fieldValue ? 'invalid' : 'valid'});
      this.setState({errorMsg: !this.state.fieldValue ? this.props.title + ' is required!' : ''})
    } else if (this.props.customValidation && !!this.state.fieldValue.length) {
      let isValid = this.props.customValidation(this.state.fieldValue).isValid;
      let errorMsg = this.props.customValidation(this.state.fieldValue).errorMsg;
      this.setState({validationState: isValid ? 'valid' : 'invalid'});
      this.setState({errorMsg: isValid ? '' : errorMsg})
    } else if (!this.props.isRequired && !this.state.fieldValue) {
      this.setState({validationState: ''});
      this.setState({errorMsg: ''})
    }
  }

  customClassNameSwitch() {
    if (this.state.validationState === 'valid') {
      return 'react-datepicker__input-is-valid'
    }
    if (this.state.validationState === 'invalid') {
      return 'react-datepicker__input-is-invalid'
    }
    return null
  }

  render() {
    let input;
    switch (this.props.type) {
      case 'text' :
        input = <Input
          type='text'
          name={this.props.title}
          placeholder={this.props.placeholderMsg}
          value={this.state.fieldValue}
          valid={this.state.validationState === 'valid'}
          invalid={this.state.validationState === 'invalid'}
          onChange={(e) => {
            this.setState({fieldValue: e.target.value}, () => this.handleValidation());
          }}
        />;
        break;
      case 'date' :
        input = <DatePicker
          selected={this.state.fieldValue}
          onChange={(dateValue) => {
            this.setState({fieldValue: dateValue}, () => this.handleValidation());
          }}
          className={this.customClassNameSwitch()}
          // className={this.state.validationState === 'valid' ? 'react-datepicker__input-is-valid' : 'red'}
        />;
        break;
    }

    return (
      <div className={styles.formItem}>
        <div className={styles.formGroup}>
          <Label>{this.props.title}{this.props.isRequired ? <span className={styles.emphasize}>*</span> : null}</Label>
          {input}
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