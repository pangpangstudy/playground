import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { createATA } from "./ats";
import { editor } from "monaco-editor";
export interface EditorFile {
  name: string;
  value: string;
  language: string;
}
interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}
export default function Editor(props: Props) {
  const { file, onChange, options } = props;
  // 改变tsconfig，使用tsx
  const handleEditorMount: OnMount = (editor, monaco) => {
    //   设置快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // 设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样。
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      // 支持使用 import d from 'cjs' 的方式引入 commonjs 包
      esModuleInterop: true,
    });
    //   最开始获取一次类型，然后内容改变之后获取一次类型，获取类型之后用 addExtraLib 添加到 ts 里
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };
  return (
    <MonacoEditor
      value={file.value}
      height="100%"
      path={file.name}
      onMount={handleEditorMount}
      language={file.language}
      onChange={onChange}
      options={{
        fontSize: 14,
        //   scrollBeyondLastLine 是到了最后一行之后依然可以滚动一屏，关闭后就不会了。
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
}
