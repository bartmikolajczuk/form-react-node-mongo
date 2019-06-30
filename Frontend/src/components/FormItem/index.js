import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import {Label, Input} from 'reactstrap';

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
      this.setState({validationState: this.state.fieldValue.length === 0 ? 'invalid' : 'valid'});
      this.setState({errorMsg: this.state.fieldValue.length === 0 ? this.props.title + ' is required!' : ''})
    }

    // if (this.props.isRequired && this.state.fieldValue.length === 0) {
    //   this.setState({validationState: 'invalid'});
    //   this.setState({errorMsg: this.props.title + ' is required!'})
    // }
    // else if (this.props.isRequired && this.state.fieldValue.length > 0) {
    //   this.setState({validationState: 'valid'});
    //   this.setState({errorMsg: ''})
    // }
    else if (this.props.customValidation && this.state.fieldValue.length > 0) {
      let isValid = this.props.customValidation(this.state.fieldValue).isValid;
      let errorMsg = this.props.customValidation(this.state.fieldValue).errorMsg;
      this.setState({validationState: isValid ? 'valid' : 'invalid'});
      this.setState({errorMsg: isValid ? '' : errorMsg})
    }
    else if (!this.props.isRequired && this.state.fieldValue.length === 0) {
      this.setState({validationState: ''});
      this.setState({errorMsg: ''})
    }

  }

  render() {
    return (
      <div className={styles.formItem}>
        <div className={styles.formGroup}>
          <Label>{this.props.title}{this.props.isRequired ? <span className={styles.emphasize}>*</span> : null}</Label>
          <Input
            type={this.props.type}
            name={this.props.title}
            placeholder={this.props.placeholderMsg}
            value={this.state.fieldValue}
            valid={this.state.validationState === 'valid'}
            invalid={this.state.validationState === 'invalid'}
            onChange={(e) => {
              this.setState({fieldValue: e.target.value}, () => this.handleValidation());
            }}
          />
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