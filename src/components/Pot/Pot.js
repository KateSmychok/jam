import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pot.module.scss';

function Pot(props) {
  return (
    <article className={styles.pot}>
      <img className={styles.img} src={props.img} alt='банка'/>
      <span className={styles.text}>{props.amount} мл</span>
    </article>
  );
}

Pot.propTypes = {
  img: PropTypes.string,
  amount: PropTypes.string,
};

export default Pot;
