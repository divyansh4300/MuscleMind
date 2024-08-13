import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './styles.module.css';

const CustomSelect = ({ label, name, options }) => {
  return (
    <div className={styles.form_group}>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} className={styles.select_field}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default CustomSelect;
