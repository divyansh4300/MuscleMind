import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './styles.module.css';

const CustomInput = ({ label, name, type = "text", ...rest }) => {
  return (
    <div className={styles.form_group}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} {...rest} className={styles.input_field} />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default CustomInput;
