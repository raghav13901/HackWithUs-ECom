import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/login/login";
import RegisterScreen from "./components/register/register";

// Routing
import PrivateRoute from "./components/screens/privateRoute";

// Screens
import PrivateScreen from "./components/screens/privateRoute";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;