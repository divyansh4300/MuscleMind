import React from 'react';
import { Formik, Form} from 'formik';
import CustomInput from '../CustomInput/CustomInput';
import CustomSelect from '../CustomSelect/CustomSelect';
import styles from './styles.module.css';
import { addMemberValidation } from '../../../schemas';


const AddGymMember = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    membershipType: '',
    userType: '',
    joinDate: '',
    feeDeposited: '',
    address: '',
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form data:', values);
    setSubmitting(false);
    resetForm();
  };

  const userTypeOptions = [
    { value: 'visitor', label: 'Visitor' },
    { value: 'member', label: 'Member' },
  ];

  return (
    <div className={styles.form_container}>
      <h1>Add Gym Member</h1>
      <Formik
  initialValues={initialValues}
  validationSchema={addMemberValidation}
  onSubmit={onSubmit}
>
  {({ values, isSubmitting }) => (
    <Form>
      <div className={styles.form_grid}>
        <CustomInput label="First Name" name="firstName" />
        <CustomInput label="Last Name" name="lastName" />
        <CustomInput label="Email" name="email" type="email" />
        <CustomInput label="Phone Number" name="phoneNumber" />
        
        <CustomSelect
          label="User Type"
          name="userType"
          options={userTypeOptions}
        />
        
        <CustomInput label="Join Date" name="joinDate" type="date" />
        
        {values.userType === 'member' && (
          <>
            <CustomInput label="Fee Deposited" name="feeDeposited" type="number" />
            <CustomSelect
              label="Membership Type"
              name="membershipType"
              options={[
                { value: '1_month', label: '1 Month' },
                { value: '3_months', label: '3 Months' },
                { value: '6_months', label: '6 Months' },
                { value: 'yearly', label: 'Yearly' },
              ]}
            />
          </>
        )}
        
        <CustomInput label="Address" name="address" />
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.submit_btn}>
        Add Member
      </button>
    </Form>
  )}
</Formik>

    </div>
  );
};

export default AddGymMember;
