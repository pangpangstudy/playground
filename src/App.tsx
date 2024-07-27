import "./App.scss";
import { PlaygroundProvider } from "./context/PlaygroundContext";
import ReactPlayground from "./playground/ReactPlayground";
function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  );
}

export default App;
