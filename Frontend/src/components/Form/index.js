import React from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import styles from './styles.module.scss'
import FormItem from "../FormItem";
import * as placeholders from '../../consts/placeholders'
import * as fieldNames from '../../consts/fieldNames'
import * as titles from '../../consts/titles'
import * as inputTypes from '../../consts/inputTypes'
import {publishEvent} from "../../consts/buttons";
import {validateForm, submitForm} from "../../actions";
import InfoBox from "../InfoBox";

const mapStateToProps = (state) => {
  return {
    isFormValid: state.isFormValid,
    formValues: state.formValues,
    isFormSubmitted: state.isFormSubmitted
  };
};

function mapDispatchToProps(dispatch) {
  return {
    validateForm: () => dispatch(validateForm()),
    submitForm: () => dispatch(submitForm())
  };
}

export const Form = (props) => {
  return (
    props.isFormSubmitted ? <InfoBox title={"Success!"} description={"Event has been added. "}/> :
        <>
          <div className={styles.formTopic}>
            <FormItem
              fieldName={fieldNames.firstName}
              title={titles.firstName}
              type={inputTypes.text}
              placeholderMsg={placeholders.typeYourXHere(titles.firstName)}
            />
            <FormItem
              fieldName={fieldNames.lastName}
              title={titles.lastName}
              type={inputTypes.text}
              placeholderMsg={placeholders.typeYourXHere(titles.lastName)}
            />
            <FormItem
              fieldName={fieldNames.email}
              title={titles.email}
              type={inputTypes.text}
              placeholderMsg={placeholders.typeYourXHere(titles.email)}
            />
            <FormItem
              fieldName={fieldNames.eventDate}
              title={titles.eventDate}
              type={inputTypes.date}
              placeholderMsg={placeholders.pickDate}
            />
          </div>
          <button type="submit" className={styles.submitButton}
                  onClick={() => {
                    props.validateForm();
                    axios.post(
                      `http://localhost:3000/events`,
                      {formValues: props.formValues},
                      {
                        mode: 'no-cors',
                        headers: {
                          'Access-Control-Allow-Origin': '*',
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(res => {
                        console.log(res);
                        console.log(res.data);
                        props.submitForm();
                      })
                      .catch(err => {
                        console.log(err);
                      })
                  }}
                  disabled={props.isFormValid ? null : true}
          >
            {publishEvent}
          </button>
        </>
  );
};

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default ConnectedForm