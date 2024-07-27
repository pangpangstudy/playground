// 文件信息共享
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { initFiles } from "../files";
import { fileName2Language } from "../playground/component/utils";
export interface File {
  name: string;
  value: string;
  language: string;
}
export interface Files {
  [key: string]: File;
}
export interface PlaygroundContext {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}
const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: "",
    };
    setFiles({ ...files });
  };

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || !newFieldName) {
      return;
    }
    const { [oldFieldName]: value, ...rest } = files;
    const newFile: File = {
      ...value,
      name: newFieldName,
      language: fileName2Language(newFieldName),
    };
    setFiles({ ...rest, [newFieldName]: { ...newFile } });
  };
  const removeFile = (name: string) => {
    //  直接改变state 然后更新state 触发DOM update
    delete files[name];
    setFiles({ ...files });
  };
  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
export const usePlaygroundContext = () => useContext(PlaygroundContext);
