import React, { useState } from 'react';
import './FacultyProgressBar.css';

const FacultyProgressBar = ({ project, onUpdateProgress }) => {
  const [progress, setProgress] = useState(project.Progress || 0);

  const handleProgressChange = (event) => {
    const newValue = Math.max(0, Math.min(100, event.target.value));
    setProgress(newValue);
  };

  const handleUpdateProgress = () => {
    onUpdateProgress(progress); 
  };

  return (
    <div className="faculty-progress-bar-container">
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
    </div>
  );
};

export default FacultyProgressBar;
