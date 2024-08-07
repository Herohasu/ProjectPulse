import React, { useState } from 'react';
import axios from 'axios';
import './UserWeeklyReport.css';

const UserWeeklyReport = ({ project }) => {
  const [report, setReport] = useState('');
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().substr(0, 10));
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('projectId', project._id);
    formData.append('report', report);
    formData.append('submissionDate', submissionDate);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('/api/weekly-report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Report submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting report', error);
    }
  };

  return (
    <div className="user-weekly-report-container">
      <h2>Submit Weekly Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="report">Weekly Report:</label>
          <textarea
            id="report"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="submissionDate">Date of Submission:</label>
          <input
            type="date"
            id="submissionDate"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            required
            readOnly
          />
        </div>
        <div>
          <label htmlFor="file">Upload File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit Weekly Report</button>
      </form>
    </div>
  );
};

export default UserWeeklyReport;
