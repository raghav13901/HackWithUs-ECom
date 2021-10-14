import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItem from "./components/addItem/addItem";
import Dashboard from "./components/dashboard/dashboard";
import Home from "./components/home/home";
import LoginScreen from "./components/login/login";
import RegisterScreen from "./components/register/register";
import RegisterUserScreen from "./components/register/registerUser";

// Routing
import PrivateRoute from "./components/screens/privateRoute";

// Screens
import PrivateScreen from "./components/screens/privateRoute";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/registerCustomer" component={RegisterUserScreen} />
          <PrivateRoute path="/dashboard/:id" component={Dashboard}/>
          <PrivateRoute path="/addItem" component={AddItem}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;