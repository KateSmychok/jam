import React from 'react';
import cn from 'classnames/bind';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import PropTypes from 'prop-types';
import styles from './Pots.module.scss';
import { PotsSchema } from '../../utils/validation';
import Pot from '../Pot/Pot';
import { choosePot } from '../../utils/common-functions';

const cx = cn.bind(styles);

function Pots(props) {
  return (
    <div className={styles.potsPage}>
      <div className={cx({
        titleArea: true,
        grandMaSad: !props.haveSomePots,
        grandMaGlad: props.haveSomePots,
      })}>
        <h1 className={styles.title}>Сколько у бабушки банок?</h1>
      </div>
      <Formik
        initialValues={{
          pots: '',
        }}

        validationSchema={ PotsSchema }

        onSubmit={ (values, actions) => {
          props.onSubmit({
            amount: values.pots,
          });
          actions.resetForm({
            values: {
              pots: '',
            },
          });
        }}
      >
        {({
          errors,
          touched,
          dirty,
          isValid,
        }) => (
          <Form className={styles.form}>
            <section className={styles.inputSection}>
              <div className={styles.inputWithLabel}>
                <label className={styles.label} htmlFor='pots'>Объем банки</label>
                <Field
                  name='pots'
                  type='text'
                  placeholder='500'
                  className={cx({
                    input: true,
                    inputValid: !errors.pots && touched.pots,
                    inputInvalid: errors.pots && touched.pots,
                  })}
                  id='pots'
                  autoComplete='off'
                />
                <span className={styles.unit}>мл</span>
                {errors.pots && touched.pots ? (
                  <span className={styles.error}>
                {errors.pots}</span>
                ) : <span className={styles.error}> </span>
                }
              </div>
              <button type='submit' className={styles.submitBtn} disabled={!(dirty && isValid)}>
                Добавить банку
              </button>
            </section>
          </Form>
        )}
      </Formik>
      {props.pots.length === 0
      && <section className={styles.pots}>
        <h2 className={styles.text}>Нет ни одной банки</h2>
      </section>
      }
      {props.pots.length > 0
      && <section className={styles.pots}>
        <ul className={styles.potsList}>
          {props.pots.map((pot, i) => <Pot
              key = {i}
              img = {choosePot(pot.amount)}
              amount = {pot.amount}
            />)
          }
        </ul>
      </section>
      }
      <button
        type='button'
        className={styles.goOnBtn}
        onClick={props.onContinueClick}
        disabled={!props.haveSomePots}>
        Продолжить
      </button>
    </div>
  );
}

Pots.propTypes = {
  onSubmit: PropTypes.func,
  pots: PropTypes.array,
  haveSomePots: PropTypes.bool,
  onContinueClick: PropTypes.func,
};

export default Pots;
