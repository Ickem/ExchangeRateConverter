import React,{useEffect, useState} from 'react';
import {Header} from '../components/Header/Header';
import {Button} from '../components/Button/Button';
import {Select} from '../components/Select/Select';
import {Input} from '../components/Input/Input';
import './App.css';

function App(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencyData, setCurrencyData] = useState([]);
  const [amountBYN, setAmountBYN] = useState(1);
  const [amountCurrency, setAmountCurrency] = useState(1);
  const [exchangeCurrency, setExchangeCurrency] = useState(0);
  const [fromCurrency] = useState('BYN');
  const [toCurrency, setToCurrency] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
      fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
          .then(res => res.json())
          .then(
            (data) => {
              setIsLoaded(true);
              setCurrencyData(data);
              setAmountCurrency(data[0].Cur_OfficialRate);
              setExchangeCurrency(data[0].Cur_OfficialRate);
            },
            (error) => {
              setIsLoaded(true);
              setError(error)
            }
          )
  },[]);

    useEffect(() => {
      if(!flag) {
        setAmountCurrency((amountBYN / exchangeCurrency).toFixed(2));
      } else {
        setAmountBYN((amountCurrency * exchangeCurrency).toFixed(2));
      }
    }, [amountBYN,exchangeCurrency,amountCurrency]);



  function handleFromAmountChange(e){
      if(!Number(e.target.value)){
          return
      }
      setAmountBYN(e.target.value);
      setFlag(false)
  }

  function handleToAmountChange(e){
      if(!Number(e.target.value)){
          return
      }
      setAmountCurrency(e.target.value);
      setFlag(true)
  }

  function handleChangeCurrency(e){
    setToCurrency(e.target.value);
    setExchangeCurrency(() => {
        for(let item of currencyData){
            if(item.Cur_Abbreviation == e.target.value)
                return parseFloat(item.Cur_OfficialRate);
        }
    });
  }

  if(error){
    return <div>Data loading error: {error.message}</div>
  } else if(!isLoaded){
    return <div>Loading...</div>
  } else{
    return (
        <div className="dashboard">
          <Header />
          <div className="conversion">
            <div className="row">
              <Select
                  data={fromCurrency}
                  selectCurrency={fromCurrency}
                  onChangeCurrency={handleChangeCurrency}
              />
              <Button />
              <Select
                  data={currencyData}
                  selectCurrency={toCurrency}
                  onChangeCurrency={handleChangeCurrency}
              />

            </div>
            <div className="row">
              <Input
                  count={amountBYN}
                  onChangeCount={handleFromAmountChange}
              />
              <Input
                  count={amountCurrency}
                  onChangeCount={handleToAmountChange}
              />
            </div>
          </div>
        </div>
    );
  }

}

export default App;
