import { CompassApp } from "./components/CompassApp";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/chatbot/dist/css/main.css";
import "@patternfly/patternfly/patternfly-charts.css";
import "./components/compass.css";

function App() {
  return (
    <div className="App">
      <CompassApp />
      <ThemeSwitcher />
    </div>
  );
}

export default App;
