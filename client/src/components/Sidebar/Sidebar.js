import React, { useState } from "react";
import styles from "./styles.module.css";
import MenuIcon from "@material-ui/icons/Menu";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      <div
        style={{ width: isOpen ? "200px" : "50px" }}
        className={styles.sidebar}
      >
        <div className={styles.top_section}>
          <h1 style={{ display: isOpen ? "block" : "none" }} className={styles.logo}>
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className={styles.bars}>
            <MenuIcon onClick={toggle} />
          </div>
        </div>
        {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={styles.link}
            activeclassname={styles.active}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className={styles.link_text}>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main style={{ marginLeft: isOpen ? "200px" : "50px" }}>
        {children}
      </main>
    </div>
  );
}
