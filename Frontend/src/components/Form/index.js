import React, {useState} from 'react';
import styles from './styles.module.scss'
import FormItem from "../FormItem";
import * as placeholders from '../../consts/placeholders'
import * as titles from '../../consts/titles'
import * as inputTypes from '../../consts/inputTypes'


function validateEmail(value) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return {isValid: true, errorMsg: null}
  } else {
    return {isValid: false, errorMsg: "Given email is not valid!"}
  }
}

const Form = () => {

  return (
    <>
      <div className={styles.formTopic}>
        <FormItem title={titles.firstName} type={inputTypes.text} isRequired={true} placeholderMsg={placeholders.typeYourXHere(titles.firstName)}/>
        <FormItem title={titles.lastName} type={inputTypes.text} isRequired={true} placeholderMsg={placeholders.typeYourXHere(titles.lastName)}/>
        <FormItem title={titles.email} type={inputTypes.text} isRequired={false} placeholderMsg={placeholders.typeYourXHere(titles.email)} customValidation={validateEmail}/>
        <FormItem title={titles.eventDate} type={inputTypes.text} isRequired={true} placeholderMsg={placeholders.pickDate}/>

      </div>
      <button type="submit" className={styles.submitButton}>
        PUBLISH EVENT
      </button>
    </>
  );
};

export default Form