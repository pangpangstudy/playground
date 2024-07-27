import React from "react";
import logoSvg from "../../../assets/icons/logo.svg";
import styles from "./Header.module.scss";
type Props = {};
const Header = (props: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
    </div>
  );
};

export default Header;
