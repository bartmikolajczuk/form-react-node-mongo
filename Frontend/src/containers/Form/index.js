import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './styles.module.scss'
import FormItem from "../FormItem";
import * as fieldNames from '../../consts/fieldNames'
import * as dataTestIds from '../../consts/dataTestIds'
import * as inputTypes from '../../consts/inputTypes'
import * as infoBoxMessages from '../../consts/infoBoxMessages'
import {publishEvent} from "../../consts/buttons";
import {validateForm, submitForm} from "../../actions";
import InfoBox from "../../components/InfoBox";
import {generatePlaceholder} from "../../messageManager";

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
    props.isFormSubmitted ? <InfoBox title={infoBoxMessages.success} description={infoBoxMessages.eventAdded}/> :
        <>
          <div className={styles.formTopic}>
            <FormItem
              fieldName={fieldNames.firstName}
              type={inputTypes.text}
              placeholderMsg={generatePlaceholder(fieldNames.firstName)}
            />
            <FormItem
              fieldName={fieldNames.lastName}
              type={inputTypes.text}
              placeholderMsg={generatePlaceholder(fieldNames.lastName)}
            />
            <FormItem
              fieldName={fieldNames.email}
              type={inputTypes.text}
              placeholderMsg={generatePlaceholder(fieldNames.email)}
            />
            <FormItem
              fieldName={fieldNames.eventDate}
              type={inputTypes.date}
              placeholderMsg={generatePlaceholder(fieldNames.eventDate)}
            />
          </div>
          <button type="submit" className={styles.submitButton} data-testid={dataTestIds.submitButton}
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

FormItem.propTypes = {
  isFormValid: PropTypes.bool,
  formValues: PropTypes.objectOf(PropTypes.string, PropTypes.instanceOf(Date)),
  isFormSubmitted: PropTypes.bool
};

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default ConnectedForm