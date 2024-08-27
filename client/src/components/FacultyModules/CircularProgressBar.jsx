import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressBar.css'

const CircularProgressBar = ({ progress }) => {
  return (
    <div className='circular-class-bar-faculty-project' style={{ width: '50px' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
      />
    </div>
  );
};

export default CircularProgressBar;
