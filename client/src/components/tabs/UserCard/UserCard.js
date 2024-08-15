import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; // Importing the icon
import styles from './styles.module.css'; // Importing the CSS module

const UserCard = ({ name, userType, joinDate, mobile, email, gender }) => {
  const getStatusColor = () => {
    if (userType.toLowerCase() === "member") {
      return styles.member;
    } else if (userType.toLowerCase() === "visitor") {
      return styles.visitor;
    }
    return '';
  };

  return (
    <div className={styles.user_card}>
      <div className={styles.user_card_header}>
        <AccountCircleIcon className={styles.user_avatar} fontSize="large" />
        <div className={styles.user_info}>
          <h3 className={styles.user_name}>{name}</h3>
          <span className={`${styles.user_status} ${getStatusColor()}`}>
            {userType.toUpperCase()}
          </span>
        </div>
      </div>
      <div className={styles.user_card_details}>
        <div className={styles.user_detail_item}>
          <span className={styles.user_detail_icon}>📱</span>
          <span>{mobile}</span>
        </div>
        <div className={styles.user_detail_item}>
          <span className={styles.user_detail_icon}>📅</span>
          <span>{new Date(joinDate).toLocaleDateString()}</span>
        </div>
        <div className={styles.user_detail_item}>
          <span className={styles.user_detail_icon}>📧</span>
          <span>{email}</span>
        </div>
        <div className={styles.user_detail_item}>
          <span className={styles.user_detail_icon}>⚥</span> {/* Gender icon */}
          <span>{gender}</span>
        </div>
      </div>
      <div className={styles.user_card_footer}>
        <span className={styles.user_timestamp}>15 minutes ago</span>
      </div>
    </div>
  );
};

export default UserCard;
