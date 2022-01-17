import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import styles from './Jam.module.scss';
import { JamSchema } from '../../utils/validation';

const cx = cn.bind(styles);

function Jam(props) {
  return (
    <div className={styles.jamPage}>
      <h1 className={styles.title}>Сколько у бабушки варенья?</h1>
      <Formik
        initialValues={{
          cherry: '',
          apricot: '',
          strawberry: '',
        }}

        validationSchema={ JamSchema }

        onSubmit={ (values) => {
          props.onSubmit({
            cherryValue: values.cherry,
            apricotValue: values.apricot,
            strawberryValue: values.strawberry,
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
            <div className={styles.field}>
              <div className={styles.inputWithLabel}>
                <label className={cn(styles.label, styles.labelCherry)} htmlFor='cherry'> </label>
                <Field
                  name='cherry'
                  type='text'
                  placeholder='500'
                  className={cx({
                    input: true,
                    inputValid: !errors.cherry && touched.cherry,
                    inputInvalid: errors.cherry && touched.cherry,
                  })}
                  id='cherry'
                  autoComplete='off'
                />
                <span className={styles.unit}>мл</span>
              </div>
              {
                errors.cherry && touched.cherry
                  ? (<span className={styles.error}>{errors.cherry}</span>)
                  : <span className={styles.error}> </span>
              }
            </div>

            <div className={styles.field}>
              <div className={styles.inputWithLabel}>
                <label className={cn(styles.label, styles.labelApricot)} htmlFor='apricot'> </label>
                <Field
                  name='apricot'
                  type='text'
                  placeholder='1000'
                  className={cx({
                    input: true,
                    inputValid: !errors.apricot && touched.apricot,
                    inputInvalid: errors.apricot && touched.apricot,
                  })}
                  id='apricot'
                  autoComplete='off'
                />
                <span className={styles.unit}>мл</span>
              </div>
              {
                errors.apricot && touched.apricot
                  ? (<span className={styles.error}>{errors.apricot}</span>)
                  : <span className={styles.error}> </span>
              }
            </div>

            <div className={styles.field}>
              <div className={styles.inputWithLabel}>
                <label className={cn(styles.label, styles.labelStrawberry)} htmlFor='strawberry'> </label>
                <Field
                  name='strawberry'
                  type='text'
                  placeholder='500'
                  className={cx({
                    input: true,
                    inputValid: !errors.strawberry && touched.strawberry,
                    inputInvalid: errors.strawberry && touched.strawberry,
                  })}
                  id='strawberry'
                  autoComplete='off'
                />
                <span className={styles.unit}>мл</span>
              </div>
              {
                errors.strawberry && touched.strawberry
                  ? (<span className={styles.error}>{errors.strawberry}</span>)
                  : <span className={styles.error}> </span>
              }
            </div>

            <button type='submit' className={styles.goOnBtn} disabled={!(dirty && isValid)}>
              Продолжить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

Jam.propTypes = {
  onSubmit: PropTypes.func,
};

export default Jam;
