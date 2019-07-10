import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'

const InfoBox = (props) => (
  <div className={styles.box} data-testid={'infoBox'}>
    <div className={styles.title} data-testid={'infoBox-title'}>
      {props.title}
    </div>
    <div>{props.description}</div>
  </div>
);
InfoBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};
export default InfoBox;