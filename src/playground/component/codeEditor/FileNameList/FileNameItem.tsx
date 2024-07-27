import classNames from "classnames";
import styles from "./index.module.scss";
import { useState } from "react";
export interface FileNameItemProps {
  value: string;
  active: boolean;
  onClick: () => void;
}
export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, active = false, onClick } = props;
  const [name, setName] = useState(value);
  return (
    <div
      className={classNames(styles["tab-item"], active ? styles.actived : null)}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
