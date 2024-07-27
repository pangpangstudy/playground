import { useEffect, useState } from "react";

import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";
import { usePlaygroundContext } from "../../../../context/PlaygroundContext";
export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = usePlaygroundContext();
  const [tabs, setTabs] = useState([""]);
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          active={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
        ></FileNameItem>
      ))}
    </div>
  );
}
