import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';



class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
      isValid: false,
      isInvalid: false,
      errorMsg: ''

    };
  }

  handleValidation() {
    if (this.props.required && this.state.fieldValue.length === 0) {
      this.setState({isValid: false});
      this.setState({isInvalid: true});
      this.setState({errorMsg: this.props.title + ' is required!'})
    }
    else {
      this.setState({isValid: true});
      this.setState({isInvalid: false});
      this.setState({errorMsg: ''});
      if (this.props.customValidation) {
        let isValid = this.props.customValidation(this.state.fieldValue).isValid;
        let errorMsg = this.props.customValidation(this.state.fieldValue).errorMsg;
        this.setState({isValid: isValid});
        this.setState({isInvalid: !isValid});
        this.setState({errorMsg: errorMsg})

      }
    }

  }

  render() {
    return (
      <div className={styles.formItem}>
        <FormGroup className={styles.formGroup}>
          <Label>{this.props.title}</Label>
          <Input
            type={this.props.type}
            name=""
            id=""
            placeholder={this.props.placeholderMsg}
            value={this.state.fieldValue}
            valid={this.state.isValid}
            invalid={this.state.isInvalid}
            onChange={(e) => {
              this.setState({fieldValue: e.target.value}, ()=> this.handleValidation());
            }}
          />
          <div>{this.state.errorMsg}</div>
        </FormGroup>
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