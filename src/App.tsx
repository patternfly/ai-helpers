import { Compass } from "./components/Compass";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/chatbot/dist/css/main.css";
import "./components/compass.css";

function App() {
  return (
    <div className="App">
      <Compass />
      <ThemeSwitcher />
    </div>
  );
}

export default App;
