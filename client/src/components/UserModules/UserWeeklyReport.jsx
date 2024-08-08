import React, { useState } from 'react';
import axios from 'axios';
import './UserWeeklyReport.css';
import toast from 'react-hot-toast';

const UserWeeklyReport = ({ project }) => {
  const [report, setReport] = useState('');
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().substr(0, 10));
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if(e.target.files[0].size > 2000000){
      toast.error("File Size Exceeds the limit (2MB)")
    }
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('projectId', project._id);
    formData.append('commentOnFileByStudent', report);
    formData.append('submissionDate', submissionDate);
    if (file) {
      formData.append('file', file);
    }

    try {
      axios.post('http://localhost:4000/AddWeeklyReportByStudent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(()=>{
        setReport('')
        setFile(null)
        setSubmissionDate('')
        toast.success("Weekly Report Submitted Successfully")
      })
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
