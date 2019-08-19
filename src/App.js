import React, { useState, useEffect } from 'react';
import Header from './Header';
import Generos from './Generos';
import NovoGenero from './NovoGenero';
import Home from './Home';
import axios from 'axios' //axios puxa informaçoes do servidor (apis e etc)
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data)
    })
  })
  return (
    <Router>
      <div >
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/generos/novo' component={NovoGenero} />
        <Route path='/generos' component={Generos} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
