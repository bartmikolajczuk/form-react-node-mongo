import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import * as dataTestIds from "../../consts/dataTestIds";

const Navbar = (props) => (
  <header className={styles.navBar}>
    <div className={styles.container}>
      <h1 className={styles.navBarTitle} data-testid={dataTestIds.navBarTitle}>
        {props.title}
      </h1>
    </div>
  </header>
);
Navbar.propTypes = {
  title: PropTypes.string,
};
export default Navbar;
