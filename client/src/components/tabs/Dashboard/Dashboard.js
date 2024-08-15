import React, { useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import axios from 'axios';
import styles from "./styles.module.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/read-all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.user_list}>
      {users.map(user => (
        <UserCard
          key={user._id}
          name={user.name}
          userType={user.userType}
          joinDate={user.joinDate}
          mobile={user.phoneNumber}
          email={user.email}
          gender={user.gender}
        />
      ))}
    </div>
  );
};

export default Dashboard;
