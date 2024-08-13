import styles from "./styles.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../tabs/Dashboard";
import Home from "../tabs/Home";
import AddTrainer from "../tabs/AddTrainer";
import AddGymMember from "../tabs/AddGymMember/AddGymMember";
import { Route, Routes, Navigate } from "react-router-dom";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>MindMuscle</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <Sidebar>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="add-gym-member" element={<AddGymMember />} />
          <Route path="add-trainer" element={<AddTrainer />} />
          <Route path="/" element={<Navigate replace to="dashboard" />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default Main;
