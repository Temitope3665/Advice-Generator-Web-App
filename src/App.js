import './App.css';
import patternDivider from './images/pattern-divider-desktop.svg';
import dice from './images/icon-dice.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import spinLoading from './images/spin.png';

function App() {
  const [advice, setAdvice] = useState({});
  const [loading, setLoading] = useState(false);

  const url = 'https://api.adviceslip.com/advice';

  const getAdvice = () => {
    setLoading(true);
    axios.get(`${url}`)
    .then((res) => setAdvice(res.data.slip))
    .catch((err) => console.log(err))
    .finally(() => setLoading(false))
  };

  useEffect(() => {
    getAdvice()
  }, []);



  return (
    <body>
      <main className="App wrapper">
        <div className='content-box'>
          <p className='advice-no'>{`ADVICE #${loading ? '..' :advice.id}`}</p>
          {loading ? <img className='loading' width="60px" src={spinLoading} alt="spin" /> : 
            <p className='advice-text'>{advice.advice}</p>
          }
          <img className='divider' src={patternDivider} alt="divider" />
          <div className='dice-wrapper' onClick={getAdvice}>
            <img src={dice} alt="dice" />
          </div>
        </div>
      </main>
    </body>
  );
}

export default App;
