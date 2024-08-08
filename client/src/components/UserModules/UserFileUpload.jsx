import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './UserFileUpload.css';
import toast from 'react-hot-toast'
import { useEffect } from 'react';

const UserFileUpload = ({ project }) => {
  const user = useSelector((state) => state.Auth.user);
  if (!user) {
    return null;
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const [Files, setFiles] = useState([])
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [commentOnFileByStudent, setCommentOnFileByStudent] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      toast.error("File Size Exceeds the limit (2MB)")
    }
    setFile(e.target.files[0]);
  };

  const handleFileClick = (fileUrl) => {
    setSelectedFile(fileUrl);
  };

  const handleCloseViewer = () => {
    setSelectedFile(null);
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/ShowFilesToStudnet/${project._id}`);
      console.log(response.data)
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files', error);
      toast.error('Failed to fetch files');
    }
  };

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user])

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
          setFile(null)
          setFileName('')
          setCommentOnFileByStudent('')
          fetchFiles();
          toast.success("Uploaded Successfully")
        })
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <>
      <div className="user-files-container">
        <h2>Your Uploaded Files</h2>
        <ul>
          {Files != null ? (
            Files.map((file) => (
              <li key={file._id} className="file-item">
                <p><strong>File Name:</strong> {file.fileName}</p>
                <p><strong>Comment By Student:</strong> {file.commentOnFileByStudent}</p>
                <p><strong>Comment By Faculty:</strong> {file.commentOnFileByFaculty}</p>
                {/* <button onClick={() => handleFileClick(`http://localhost:4000/${file.file}`)}>
                  View
                </button> */}
                <a href={`http://localhost:4000/${file.file}`} download>
                  Download
                </a>
              </li>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </ul>


      {/* {selectedFile && (
        <div className="file-viewer">
          <button onClick={handleCloseViewer} className="close-button">Close</button>
          <iframe
            src={selectedFile}
            style={{ width: '100%', height: '80vh', border: 'none' }}
            title="File Viewer"
          />
        </div>
      )} */}
      </div>

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


    </>
  );
};

export default UserFileUpload;
