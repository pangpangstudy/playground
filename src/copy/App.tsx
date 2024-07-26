import { useRef, useState } from "react";
import "./App.css";
import { transform } from "@babel/standalone";
import type { PluginObj } from "@babel/core";
function App() {
  const code1 = `
    function add(a, b) {
        return a + b;
    }
    export { add };
    `;
  const url = URL.createObjectURL(
    new Blob([code1], { type: "application/javascript" })
  );
  // transformImportSourcePlugin是一个Babel插件，包含一个访问者对象visitor。
  // 访问者对象中定义了一个ImportDeclaration方法，用于修改所有导入声明，使其源路径（source.value）变为之前生成的URL。
  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      },
    },
  };
  const code = `import { add } from './add.ts'; console.log(add(2, 3));`;
  function onClick() {
    const res = transform(code, {
      presets: ["react", "typescript"],
      filename: "guang.ts",
      plugins: [transformImportSourcePlugin],
    });
    console.log(res.code);
  }
  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
