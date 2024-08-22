import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './UserFileUpload.css';
import toast from 'react-hot-toast';

const UserFileUpload = ({ project }) => {
  const user = useSelector((state) => state.Auth.user);
  if (!user) {
    return null;
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [Files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [commentOnFileByStudent, setCommentOnFileByStudent] = useState('');
  const [viewFileUrl, setViewFileUrl] = useState(null);
  const [showFiles, setShowFiles] = useState(false); 

  const handleFileChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      toast.error("File Size Exceeds the limit (2MB)");
    }
    setFile(e.target.files[0]);
  };

  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = `http://localhost:4000/${fileUrl}`;
    link.download = true;
    link.click();
  };

  const handleView = (fileUrl) => {
    setViewFileUrl(`http://localhost:4000/${fileUrl}`);
  };

  const handleCloseViewer = () => {
    setViewFileUrl(null);
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/ShowFilesToStudent/${project._id}`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files', error);
      toast.error('Failed to fetch files');
    }
  };

  const handleShowFiles = () => {
    setShowFiles(true);
    fetchFiles();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('commentOnFileByStudent', commentOnFileByStudent);
    formData.append('projectId', project._id);

    try {
      await axios.post(`http://localhost:4000/AddProjectFilesByStudent`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        setFile(null);
        setFileName('');
        setCommentOnFileByStudent('');
        fetchFiles();
        toast.success("Uploaded Successfully");
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <>
      <div className="documents-button-container">
        <button className="documents-button" onClick={handleShowFiles}>
          Uploaded Documents
        </button>
      </div>

      {showFiles && (
        <div className="user-files-container">
          <h2>Your Uploaded Files</h2>
          <ul>
            {Files.length ? (
              Files.map((file) => (
                <li key={file._id} className="file-item">
                  <p><strong>File Name:</strong> {file.fileName}</p>
                  <p><strong>Comment By Student:</strong> {file.commentOnFileByStudent}</p>
                  <p><strong>Comment By Faculty:</strong> {file.commentOnFileByFaculty}</p>
                  <div className="file-actions">
                    <button onClick={() => handleView(file.file)}>View</button>
                    <button onClick={() => handleDownload(file.file)}>Download</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </ul>
        </div>
      )}

      <div className="user-file-upload-container">
        <h2>Upload File</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fileName">File Name:</label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="file">File:</label>
            <input type="file" id="file" onChange={handleFileChange} required />
          </div>
          <div>
            <label htmlFor="commentOnFileByStudent">Comment by Student:</label>
            <input
              type="text"
              id="commentOnFileByStudent"
              value={commentOnFileByStudent}
              onChange={(e) => setCommentOnFileByStudent(e.target.value)}
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>

      {viewFileUrl && (
        <div className="file-viewer">
          <iframe src={viewFileUrl} title="File Viewer" frameBorder="0"></iframe>
          <button className="close-button-file-upload" onClick={handleCloseViewer}>Close</button>
        </div>
      )}
    </>
  );
};

export default UserFileUpload;
