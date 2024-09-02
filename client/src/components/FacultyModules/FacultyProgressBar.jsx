import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FacultyProgressBar.css';

// ProgressDisplay Component
export const ProgressDisplay = ({ progress }) => (
  <div className="faculty-progress-bar-display">
    <div className="progress-bar-background">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  </div>
);

const FacultyProgressBar = ({ projectId, onUpdateProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/ShowProgress/${projectId}`);
        if (response.data) {
          const fetchedProgress = response.data.progress || 0;
          setProgress(fetchedProgress);
          onUpdateProgress(fetchedProgress);  
        } else {
          console.log('No progress data found');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgress();
  }, [projectId, onUpdateProgress]);

  const handleProgressChange = (event) => {
    const newValue = Math.max(0, Math.min(100, event.target.value || 0));
    setProgress(newValue);
  };

  const handleUpdateProgress = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/AddProgressForStudent', { projectId, progress });
      console.log('Response:', response);
      alert('Progress updated successfully');
      onUpdateProgress(progress);  
    } catch (err) {
      console.error('Error:', err);
      alert('Error updating progress');
    }
  };

  // ProgressInput Component
  const ProgressInput = () => (
    <div className="faculty-progress-bar-add">
      <label htmlFor="progress-input">Enter Progress Percentage:</label>
      <input
        type="number"
        id="progress-input"
        value={progress} 
        onChange={handleProgressChange}
        min="0"
        max="100"
      />
      <button
        className="update-progress-button"
        onClick={handleUpdateProgress}
      >
        Update Progress
      </button>
    </div>
  );

  return (
    <div className="faculty-progress-bar-container">
      <ProgressInput />
      <ProgressDisplay progress={progress} />
    </div>
  );
};

export default FacultyProgressBar;
