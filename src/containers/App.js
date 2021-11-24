import React from 'react';
import {Header} from '../components/Header/Header';
import {Button} from '../components/Button/Button';
import {Select} from '../components/Select/Select';
import {Input} from '../components/Input/Input';
import './App.css';

function App() {
  return (
    <div className="dashboard">
      <Header />
      <div className="conversion">
        <div className="row">
          <Select />
          <Button />
          <Select />
        </div>
        <div className="row">
          <Input />
          <Input />
        </div>
      </div>
    </div>
  );
}

export default App;
