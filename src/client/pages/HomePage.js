import React from 'react';
import styles from './HomePage.module.scss';
import './HomePage.scss';

const Home = () => {
  return (
    <div className="center-align" style={{ marginTop: '200px' }}>
      <h3 className={styles.container}>Welcome</h3>
      <p>Check out these awesome features</p>
    </div>
  )
}

export default {
  component: Home
};