import { createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import TopNav from 'components/TopNav';
import Navigation from 'navigation';

import './App.css';

export let UserContext = createContext();

function App() {

  return (
    <Router>
      <div className="App App-header">
        <TopNav />
        <Navigation />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
