import React from 'react';
import styles from './styles.module.scss'
import FormItem from "../FormItem";
import * as placeholders from '../../consts/placeholders'
import * as titles from '../../consts/titles'
import * as inputTypes from '../../consts/inputTypes'




const Form = () => {

  return (
    <>
      <div className={styles.formTopic}>
        <FormItem title={titles.firstName} type={inputTypes.text} validation={{isRequired: true}} placeholderMsg={placeholders.typeYourXHere(titles.firstName)}/>
        <FormItem title={titles.lastName} type={inputTypes.text} validation={{isRequired: true}} placeholderMsg={placeholders.typeYourXHere(titles.lastName)}/>
        <FormItem title={titles.email} type={inputTypes.text} validation={{isRequired: true, isEmail: true}} placeholderMsg={placeholders.typeYourXHere(titles.email)}/>
        <FormItem title={titles.eventDate} type={inputTypes.date} validation={{isRequired: true}} placeholderMsg={placeholders.pickDate}/>

      </div>
      <button type="submit" className={styles.submitButton}>
        PUBLISH EVENT
      </button>
    </>
  );
};

export default Form