import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'

const InfoBox = (props) => (
  <div className={styles.box}>
    <h1 className={styles.title}>
      {props.title}
    </h1>
    <div className={styles.description}>{props.description}</div>
  </div>
);
InfoBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};
export default InfoBox;