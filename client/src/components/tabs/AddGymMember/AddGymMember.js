import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./styles.module.css";
import { addMemberValidation } from "../../../schemas";

const AddGymMember = () => {
  const [message, setMessage] = useState(""); // State to hold the success or error message
  const [messageType, setMessageType] = useState(""); // State to hold the type of message (success or error)

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    membershipType: "",
    gender:"", // Keep empty by default
    weight: "",
    userType: "",
    joinDate: "",
    address: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Calculate validTill based on joinDate and membershipType
      let validTill = new Date(values.joinDate);
      if (values.userType === "member" && values.membershipType) {
        validTill.setDate(validTill.getDate() + parseInt(values.membershipType));
      }

      // Create a new object to avoid sending unnecessary fields
      const memberData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber.toString(), // Ensure phoneNumber is treated as a string
        userType: values.userType,
        joinDate: values.joinDate,
        address: values.address,
        weight: values.weight,
        gender:values.gender,
        validTill: validTill.toISOString().split("T")[0] // Convert to yyyy-mm-dd format
      };

      // Conditionally add membershipType and feeDeposited
      if (values.userType === "member") {
        memberData.membershipType = parseInt(values.membershipType); // Convert to Number
        memberData.feeDeposited = values.feeDeposited;
      }

      const response = await fetch("http://localhost:8080/api/create-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      const data = await response.json(); // Get response message

      if (response.ok) {
        setMessage(data.message || "Member added successfully");
        setMessageType("success");
        resetForm();
      } else {
        setMessage(data.message || "Error adding member");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
      setMessageType("error");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const userTypeOptions = [
    { value: "visitor", label: "Visitor" },
    { value: "member", label: "Member" },
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
                label="Gender"
                name="gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "others", label: "Others" },
                ]}
              />
              <CustomSelect
                label="User Type"
                name="userType"
                options={userTypeOptions}
              />
              <CustomInput label="Join Date" name="joinDate" type="date" />
              <CustomInput label="Body Weight (in Kg)" name="weight" />

              {/* Conditional Rendering based on userType */}
              {values.userType === "member" && (
                <>
                  <CustomInput
                    label="Fee Deposited"
                    name="feeDeposited"
                    type="number"
                  />
                  <CustomSelect
                    label="Membership Type"
                    name="membershipType"
                    options={[
                      { value: 30, label: "1 Month" },
                      { value: 90, label: "3 Months" },
                      { value: 180, label: "6 Months" },
                      { value: 256, label: "Yearly" },
                    ]}
                  />
                </>
              )}

              <CustomInput label="Address" name="address" />
            </div>

            {/* Display success or error message */}
            {message && (
              <div
                className={`${styles.message} ${
                  messageType === "success" ? styles.success : styles.error
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submit_btn}
            >
              Add Member
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGymMember;
