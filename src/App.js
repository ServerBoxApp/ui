import AppNav from "./components/AppNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./views/About";
import Home from "./views/Home";
import Application from "./views/Application";
import Marketplace from "./views/Marketplace";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <AppNav/>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/application">
                        <Application />
                    </Route>
                    <Route path="/marketplace">
                        <Marketplace />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
