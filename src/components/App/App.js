import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Pots from '../Pots/Pots';
import Jam from '../Jam/Jam';
import Result from '../Result/Result';

function App() {
  const history = useHistory();

  const [pots, setPots] = useState([]);
  const [haveSomePots, setHaveSomePots] = useState(false);

  const arrOfPots = pots
    .map((pot) => pot.amount);

  const [cherry, setCherry] = useState({ amount: '', pots: [] });
  const [apricot, setApricot] = useState({ amount: '', pots: [] });
  const [strawberry, setStrawberry] = useState({ amount: '', pots: [] });
  const [hasAllJam, setHasAllJam] = useState(false);

  const findPot = (arr, search) => arr.findIndex((i) => i === search);

  const spreadJam = async (fruit) => {
    let sumOfPotsAmount = 0; // сумма объема всех банок для конкретного вида варенья
    let leftAmount = fruit.amount; // оставшееся варенье, еще не налитое в банки
    let index;

    while (fruit.amount > sumOfPotsAmount) { // пока есть не налитое в банки варенье
      const i = findPot(arrOfPots, leftAmount);
      // проверяем, есть ли банка с таким объемом
      if (i >= 0) {
        // если есть, берем банку именно такого объема
        index = i;
      } else {
        // если нет, ищем наиболее подходящую
        const arrOfDifferences = arrOfPots
          .sort((a, b) => Math.abs(leftAmount - a) - Math.abs(leftAmount - b));
        const closestHigher = arrOfDifferences.find((item) => item > leftAmount);
        index = findPot(arrOfPots, closestHigher);
      }

      // добавляем банку
      fruit.pots.push(arrOfPots[index]);
      // увеличиваем общий объем варенья в банках
      sumOfPotsAmount = fruit.pots.reduce((acc, item) => acc + Number(item), 0);
      // удаляем банку из массива
      arrOfPots.splice(index, 1);
      // изменяем количество оставшегося для распределения варенья
      leftAmount = fruit.amount - Number(arrOfPots[index]);
    }
  };

  useEffect(() => {
    // сортируем по убыванию и разливаем варенье
    const fruitsSorted = [
      cherry,
      apricot,
      strawberry,
    ].sort((a, b) => b.amount - a.amount);

    spreadJam(fruitsSorted[0])
      .then(
        spreadJam(fruitsSorted[1]),
      )
      .then(
        spreadJam(fruitsSorted[2]),
      )
      .then(hasAllJam
        ? history.push('/result')
        : history.push('/'));
  }, [hasAllJam]);

  const handlePotsFormSubmit = ({
    amount,
  }) => {
    setPots([...pots, { amount }]);
    setHaveSomePots(true);
  };

  const handleContinueClick = () => {
    history.push('/jam');
  };

  const handleJamFormSubmit = ({
    cherryValue,
    apricotValue,
    strawberryValue,
  }) => {
    setCherry({ amount: cherryValue, pots: [] });
    setApricot({ amount: apricotValue, pots: [] });
    setStrawberry({ amount: strawberryValue, pots: [] });
    setHasAllJam(true);
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Pots
            pots={pots}
            haveSomePots={haveSomePots}
            onSubmit={handlePotsFormSubmit}
            onContinueClick={handleContinueClick}
          />
        </Route>
        <Route path='/jam'>
          <Jam
            onSubmit={handleJamFormSubmit}
          />
        </Route>
        <Route path='/result'>
          <Result
            cherryAmount={cherry.amount}
            apricotAmount={apricot.amount}
            strawberryAmount={strawberry.amount}
            cherryPots={cherry.pots}
            apricotPots={apricot.pots}
            strawberryPots={strawberry.pots}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
