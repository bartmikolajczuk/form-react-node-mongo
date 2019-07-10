import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './styles.module.scss'
import FormItem from "../FormItem";
import InfoBox from "../../components/InfoBox";
import {config} from "./consts/config";
import * as fieldNames from '../../consts/fieldNames'
import * as dataTestIds from '../../consts/dataTestIds'
import * as inputTypes from '../../consts/inputTypes'
import * as infoBoxMessages from '../../components/InfoBox/consts/infoBoxMessages'
import {getPlaceholder} from "../../utils/messageManager";
import {validateForm, submitForm} from "../../actions";


const baseUrl = 'http://localhost:3000';
const eventsEndpoint = '/events';
export const Form = (props) => {
  if (props.isFormSubmitted) {
    return <InfoBox title={infoBoxMessages.success} description={infoBoxMessages.eventAdded}/>
  }
  return (
    <>
      <div className={styles.formTopic}>
        <FormItem
          fieldName={fieldNames.firstName}
          type={inputTypes.text}
          placeholderMsg={getPlaceholder(fieldNames.firstName)}
        />
        <FormItem
          fieldName={fieldNames.lastName}
          type={inputTypes.text}
          placeholderMsg={getPlaceholder(fieldNames.lastName)}
        />
        <FormItem
          fieldName={fieldNames.email}
          type={inputTypes.text}
          placeholderMsg={getPlaceholder(fieldNames.email)}
        />
        <FormItem
          fieldName={fieldNames.eventDate}
          type={inputTypes.date}
          placeholderMsg={getPlaceholder(fieldNames.eventDate)}
        />
      </div>
      <button type="submit" className={styles.submitButton} data-testid={dataTestIds.submitButton}
              onClick={() => {
                axios.post(
                  `${baseUrl}${eventsEndpoint}`,
                  {formValues: props.formValues},
                  config)
                  .then(res => {
                    props.submitForm();
                  })
                  .catch(err => {
                    console.error(err);
                  })
              }}
              disabled={!props.isFormValid}
      >
        PUBLISH EVENT
      </button>
    </>
  );
};

FormItem.propTypes = {
  isFormValid: PropTypes.bool,
  formValues: PropTypes.objectOf(PropTypes.string, PropTypes.instanceOf(Date)),
  isFormSubmitted: PropTypes.bool
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Form);