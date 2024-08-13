import * as Yup from 'yup';

export const addMemberValidation = Yup.object({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
  membershipType: Yup.string()
    .when('userType', {
      is: 'member',
      then: Yup.string().required('Membership Type is required'),
    }),
  userType: Yup.string().required('User Type is required'),
  joinDate: Yup.date().required('Join Date is required'),
  feeDeposited: Yup.number()
    .required('Fee Deposited is required')
    .positive('Fee Deposited must be a positive number')
    .min(0, 'Fee Deposited cannot be negative'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
});
