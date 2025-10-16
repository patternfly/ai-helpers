import { Compass } from "./components/Compass";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { RedToggle } from "./components/RedToggle";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/chatbot/dist/css/main.css";
import "./components/compass.css";

function App() {
  return (
    <div className="App">
      <Compass />
      <RedToggle />
      <ThemeSwitcher />
    </div>
  );
}

export default App;
