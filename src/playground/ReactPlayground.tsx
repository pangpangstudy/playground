import React from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./component/header/Header";
import CodeEditor from "./component/codeEditor/CodeEditor";
import Preview from "./component/preview/Preview";

type Props = {};

const ReactPlayground = (props: Props) => {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      {/* 编辑器布局 初始1:1 */}
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default ReactPlayground;
