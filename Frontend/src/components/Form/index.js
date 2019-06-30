import React, {useState} from 'react';
import styles from './styles.module.scss'
import FormItem from "../FormItem";

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
        <FormItem title={"First Name"} type={"text"} isRequired={true} placeholderMsg={'Type first name here'}/>
        <FormItem title={"Last Name"} type={"text"} isRequired={true} placeholderMsg={'Type last name here'}/>
        <FormItem title={"Email"} type={"text"} isRequired={false} placeholderMsg={'Type email here'} customValidation={validateEmail}/>
        <FormItem title={"Event Date"} type={"date"} isRequired={true} />

      </div>
      <button type="submit" className={styles.submitButton}>
        PUBLISH EVENT
      </button>
    </>
  );
};

export default Form