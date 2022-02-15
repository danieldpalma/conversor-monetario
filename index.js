const btn_Converter = document.querySelector(".btn_Converter");
const btn_Cleaner = document.querySelector('.btn_Cleaner');

const apiURL = 'https://economia.awesomeapi.com.br/last/USD-BRL';

const api = (url) => {
  const promiseCallback = (resolve, reject) => {
    fetch(url)
      .then(response => {
        if(!response.ok) return reject(response.status)
        return response.json();
      })
      .then(data => data.USDBRL.bid)
      .then(resolve)
      .catch(reject);
  }
  return new Promise(promiseCallback);
}

api(apiURL)
  .then(console.log)
  .catch(console.error)



btn_Converter.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = document.querySelector("#brl_value").value;
  const inputCurrency = inputValue.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
  const inputNoComma = inputCurrency.replace(',', '.');
  const onlyNumbers = Number(inputNoComma.replace(/[^0-9\.]/g, ""));
  const formatedValue = Number(onlyNumbers.toFixed(3));

  const typeToConvert = document.querySelector("select").value;

  function convertValue(value) {
    switch (typeToConvert) {
      case "usd":
        value *= 0.183685;
        return `US ${value.toLocaleString('en-US',{style: 'currency', currency: 'USD'})}`;
      case "cad":
        value *= 0.230942;
        return `CA ${value.toLocaleString('en-CA',{style: 'currency', currency: 'CAD'})}`;
      case "euro":
        value *= 0.162849;
        return value.toLocaleString('en-GB',{style: 'currency', currency: 'EUR'});
      case "libra":
        value *= 0.135919;
        return value.toLocaleString('en-GB',{style: 'currency', currency: 'GBP'});
      default:
        break;
    }
  };

  const valueConverted = convertValue(formatedValue);

  const element = document.getElementById('result');
  const p = document.createElement('p');
  p.classList.add('finalResult');
  p.innerText = valueConverted;
  element.appendChild(p);
  btn_Cleaner.classList.add('show');
});

btn_Cleaner.addEventListener('click', (e) => {
  e.preventDefault();
  const resultDiv = document.querySelector('#result');
  const finalResult = document.querySelector('.finalResult');
  if(finalResult) {
    resultDiv.removeChild(finalResult);
  };  
});
