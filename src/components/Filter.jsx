import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, handleChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      name="filter"
      value={filter}
      onChange={handleChange}
      placeholder="Buscar por nombre"
    />
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func,
};
