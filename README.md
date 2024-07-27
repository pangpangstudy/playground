编译用的 @babel/standalone，这个是 babel 的浏览器版本,可以对代码进行编译。

但是我们可能会 import 一些包 但是这在浏览器环境里是没有的

可以使用 URL.createObjectURL 创建一个引用

`const url = URL.createObjectURL(new Blob([code],{type:"application/javascript"}))`

然后通过 babel 插件 把路径指向的文件进行替换

```js
const transformImportSourcePlugin: PluginObj = {
  visitor: {
    ImportDeclaration(path) {
      path.node.source.value = url;
    },
  },
};
const res = transform(code, {
  presets: ["react", "typescript"],
  filename: "xxx.ts",
  plugins: [transformImportSourcePlugin],
});
```
