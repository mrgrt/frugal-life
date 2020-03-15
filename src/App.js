import React from 'react';
import axios from 'axios';

import Posts from './Posts';

import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
       <div className="container">
          <Posts></Posts>
       </div>
    </div>
  );
}

export default App;
