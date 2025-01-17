import React, { useEffect, useState } from "react";
import { usePlaygroundContext } from "../../../context/PlaygroundContext";
import iframeRaw from "./iframe.html?raw";
import { compile } from "./compiler";
import Editor from "../codeEditor/Editor";
import { IMPORT_MAP_FILE_NAME } from "../../../files";

type Props = {};

const Preview = (props: Props) => {
  const { files } = usePlaygroundContext();
  const [compiledCode, setCompiledCode] = useState("");
  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);
  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };
  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);
  const [iframeUrl, setIframeUrl] = useState("");

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
};

export default Preview;
