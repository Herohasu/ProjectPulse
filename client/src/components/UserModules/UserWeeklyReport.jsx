// import React, { useState } from 'react';
// import axios from 'axios';
// import './UserWeeklyReport.css';
// import toast from 'react-hot-toast';

// const UserWeeklyReport = ({ project }) => {
//   const [report, setReport] = useState('');
//   const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().substr(0, 10));
//   const [file, setFile] = useState(null);
//   const [weeklyReports, setWeeklyReports] = useState([]);
//   const [modalFile, setModalFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showReports, setShowReports] = useState(false); // New state for managing visibility

//   const handleFileChange = (e) => {
//     if (e.target.files[0].size > 2000000) {
//       toast.error("File Size Exceeds the limit (2MB)");
//     } else {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('projectId', project._id);
//     formData.append('commentOnFileByStudent', report);
//     formData.append('submissionDate', submissionDate);
//     if (file) {
//       formData.append('file', file);
//     }

//     try {
//       await axios.post('http://localhost:4000/AddWeeklyReportByStudent', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setReport('');
//       setFile(null);
//       setSubmissionDate('');
//       toast.success("Weekly Report Submitted Successfully");
//       fetchWeeklyReports(); // Refresh the report list
//     } catch (error) {
//       console.error('Error submitting report', error);
//       toast.error("Error submitting report");
//     }
//   };

//   const fetchWeeklyReports = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/ShowWeeklyReports/${project._id}`);
//       setWeeklyReports(response.data);
//     } catch (error) {
//       console.error('Error fetching weekly reports', error);
//       toast.error("Error fetching weekly reports");
//     }
//   };

//   const openModal = (file) => {
//     setModalFile(file);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalFile(null);
//   };

//   const handleShowReports = async () => {
//     if (!showReports) {
//       await fetchWeeklyReports(); // Fetch reports when showing
//     }
//     setShowReports(!showReports);
//   };

//   return (
//     <>
//       <button
//         className="documents-button"
//         onClick={handleShowReports}
//         style={{ marginBottom: 30, border: 0, borderRadius: 4, padding: 10 }}
//       >
//         {showReports ? 'Hide Reports' : 'Uploaded Reports'}
//       </button>

//       {showReports && weeklyReports.length > 0 && (
//         <div className="uploaded-reports">
//           <h3>Uploaded Weekly Reports</h3>
//           <ul>
//             {weeklyReports.map((report, index) => (
//               <li key={index} className="report-item">
//                 <p><strong>Submitted on:</strong> {new Date(report.submissionDate).toLocaleDateString()}</p>
//                 {report.commentOnFileByStudent && (
//                   <p><strong>Description:</strong> {report.commentOnFileByStudent}</p>
//                 )}
//                 {report.file && (
//                   <p>
//                     <strong>File:</strong> 
//                     <button className="view-file-modal-btn" onClick={() => openModal(report.file)}>
//                       View Uploaded Report
//                     </button>
//                   </p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="modal" onClick={closeModal}>
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <span className="close" onClick={closeModal}>&times;</span>
//             <iframe 
//               src={`http://localhost:4000/${modalFile}`} 
//               style={{ width: '100%', height: '80vh', border: 'none' }} 
//               title="Uploaded File"
//             ></iframe>
//           </div>
//         </div>
//       )}

//       <div className="user-weekly-report-container">
//         <h2>Submit Weekly Report</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="report">Weekly Report:</label>
//             <textarea
//               id="report"
//               value={report}
//               onChange={(e) => setReport(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div>
//             <label htmlFor="submissionDate">Date of Submission:</label>
//             <input
//               type="date"
//               id="submissionDate"
//               value={submissionDate}
//               onChange={(e) => setSubmissionDate(e.target.value)}
//               required
//               readOnly
//             />
//           </div>
//           <div>
//             <label htmlFor="file">Upload File:</label>
//             <input
//               type="file"
//               id="file"
//               onChange={handleFileChange}
//             />
//           </div>
//           <button type="submit">Submit Weekly Report</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default UserWeeklyReport;

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './UserWeeklyReport.css';

const WeeklyReportForm = ({ project, fetchWeeklyReports }) => {
  const [report, setReport] = useState('');
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().substr(0, 10));
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      toast.error("File Size Exceeds the limit (2MB)");
    } else {
      setFile(e.target.files[0]);
    }
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
      await axios.post('http://localhost:4000/AddWeeklyReportByStudent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setReport('');
      setFile(null);
      setSubmissionDate('');
      toast.success("Weekly Report Submitted Successfully");
      fetchWeeklyReports(); // Refresh the report list
    } catch (error) {
      console.error('Error submitting report', error);
      toast.error("Error submitting report");
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

const UploadedReports = ({ project }) => {
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [modalFile, setModalFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const fetchWeeklyReports = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/ShowWeeklyReports/${project._id}`);
      setWeeklyReports(response.data);
    } catch (error) {
      console.error('Error fetching weekly reports', error);
      toast.error("Error fetching weekly reports");
    }
  };

  const openModal = (file) => {
    setModalFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFile(null);
  };

  const handleShowReports = async () => {
    if (!showReports) {
      await fetchWeeklyReports(); // Fetch reports when showing
    }
    setShowReports(!showReports);
  };

  return (
    <>
      <button
        className="documents-button"
        onClick={handleShowReports}
        style={{ marginBottom: 30, border: 0, borderRadius: 4, padding: 10 }}
      >
        {showReports ? 'Hide Reports' : 'Uploaded Reports'}
      </button>

      {showReports && weeklyReports.length > 0 && (
        <div className="uploaded-reports-container">
          <div className="uploaded-reports">
            <h3>Uploaded Weekly Reports</h3>
            <ul>
              {weeklyReports.map((report, index) => (
                <li key={index} className="report-item">
                  <p><strong>Submitted on:</strong> {new Date(report.submissionDate).toLocaleDateString()}</p>
                  {report.commentOnFileByStudent && (
                    <p><strong>Description:</strong> {report.commentOnFileByStudent}</p>
                  )}
                  {report.file && (
                    <p>
                      <strong>File:</strong> 
                      <button className="view-file-modal-btn" onClick={() => openModal(report.file)}>
                        View Uploaded Report
                      </button>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe 
              src={`http://localhost:4000/${modalFile}`} 
              style={{ width: '100%', height: '80vh', border: 'none' }} 
              title="Uploaded File"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

const UserWeeklyReport = ({ project }) => {
  return (
    <>
      <WeeklyReportForm project={project} />
      <UploadedReports project={project} />
    </>
  );
};

export default UserWeeklyReport;
