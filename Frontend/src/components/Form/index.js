import React from 'react';
import { connect } from "react-redux";
import styles from './styles.module.scss'
import FormItem from "../FormItem";
import * as placeholders from '../../consts/placeholders'
import * as titles from '../../consts/titles'
import * as inputTypes from '../../consts/inputTypes'
import {validateForm} from "../../actions";

const mapStateToProps = (state) => {
  return {
    isFormValid: state.isFormValid
  };
};
function mapDispatchToProps(dispatch) {
  return {
    validateForm: () => dispatch(validateForm())
  };
}

const Form = (props) => {
  return (
    <>
      <div className={styles.formTopic}>
        <FormItem title={titles.firstName} type={inputTypes.text} placeholderMsg={placeholders.typeYourXHere(titles.firstName)}/>
        <FormItem title={titles.lastName} type={inputTypes.text}  placeholderMsg={placeholders.typeYourXHere(titles.lastName)}/>
        <FormItem title={titles.email} type={inputTypes.text} placeholderMsg={placeholders.typeYourXHere(titles.email)}/>
        <FormItem title={titles.eventDate} type={inputTypes.date} placeholderMsg={placeholders.pickDate}/>

      </div>
      <button type="submit" className={styles.submitButton}
              onClick={() => {
                props.validateForm()
              }}
      >
        PUBLISH EVENT
      </button>
    </>
  );
};

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default ConnectedForm