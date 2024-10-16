import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

// parenthesis are used to include a group of jsx elements in a variable
// better pattern
const routes=(  <Router>
  <Routes>
  <Route  path="/" exact element={<Home />}/>
    <Route  path="/dashboard" exact element={<Home />} />

    <Route  path="/login" exact element={<Login />} />

    <Route  path="/signup" exact element={<SignUp />} />
  </Routes>
</Router>
)


function App() {
  return (
    <div className="App ">
      {routes}
    </div>
  );
}

export default App;
