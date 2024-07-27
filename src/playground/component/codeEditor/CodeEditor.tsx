import { debounce } from "lodash-es";

import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { usePlaygroundContext } from "../../../context/PlaygroundContext";
export default function CodeEditor() {
  const { files, setFiles, selectedFileName, setSelectedFileName } =
    usePlaygroundContext();

  const file = files[selectedFileName];

  // onChange 可以拿到 content 和变化事件，里面包含具体改变的内容：

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      {/* 添加编辑防抖 */}
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  );
}
