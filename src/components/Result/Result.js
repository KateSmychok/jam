import React from 'react';
import PropTypes from 'prop-types';
import styles from './Result.module.scss';
import Pot from '../Pot/Pot';
import { choosePot } from '../../utils/common-functions';
import cherryImage from '../../img/cherry.png';
import apricotImage from '../../img/apricot.png';
import strawberryImage from '../../img/strawberry.png';

function Result(props) {
  return (
    <div className={styles.resultPage}>
      <h1 className={styles.title}>
        Сколько банок понадобится для каждого варенья?
      </h1>
      <div className={styles.resultBlock}>
        <section className={styles.pots}>
          <div className={styles.kindOfJamBlock}>
            <h2 className={styles.kindOfJam}>Вишневого варенья - {props.cherryAmount} мл</h2>
            <img src={cherryImage} className={styles.img} alt='Вишня'/>
          </div>
          <ul className={styles.potsList}>
            {props.cherryPots.map((pot, i) => <Pot
              key = {i}
              img = {choosePot(pot)}
              amount = {pot}
            />)
            }
          </ul>
        </section>
        <section className={styles.pots}>
          <div className={styles.kindOfJamBlock}>
            <h2 className={styles.kindOfJam}>Абрикосового варенья - {props.apricotAmount} мл</h2>
            <img src={apricotImage} className={styles.img} alt='Абрикос'/>
          </div>
          <ul className={styles.potsList}>
            {props.apricotPots.map((pot, i) => <Pot
              key = {i}
              img = {choosePot(pot)}
              amount = {pot}
            />)
            }
          </ul>
        </section>
        <section className={styles.pots}>
          <div className={styles.kindOfJamBlock}>
            <h2 className={styles.kindOfJam}>Клубничного варенья - {props.strawberryAmount} мл</h2>
            <img src={strawberryImage} className={styles.img} alt='Клубника'/>
          </div>
          <ul className={styles.potsList}>
            {props.strawberryPots.map((pot, i) => <Pot
              key = {i}
              img = {choosePot(pot)}
              amount = {pot}
            />)
            }
          </ul>
        </section>
      </div>
    </div>
  );
}

Result.propTypes = {
  cherryPots: PropTypes.array,
  apricotPots: PropTypes.array,
  strawberryPots: PropTypes.array,
  cherryAmount: PropTypes.string,
  apricotAmount: PropTypes.string,
  strawberryAmount: PropTypes.string,
};

export default Result;
