import React, {useState} from 'react';
import styles from './styles.module.scss'
import FormItem from "../FormItem";

function validateEmail(value) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return {isValid: true, errorMsg: null}
  } else {
    return {isValid: false, errorMsg: "incorrect email"}
  }
}

const Form = () => {

  return (
    <>
      <div className={styles.formTopic}>
        <FormItem title={"First Name"} type={"text"} required={true} placeholderMsg={"insert first name here"}/>
        <FormItem title={"Last Name"} type={"text"} required={true}/>
        <FormItem title={"Email"} type={"text"} required={true} customValidation={validateEmail}/>
        <FormItem title={"Event Date"} type={"date"} required={true} />
      </div>
      <button type="submit" className={styles.submitButton}>
        PUBLISH EVENT
      </button>
    </>
  );
};

export default Form