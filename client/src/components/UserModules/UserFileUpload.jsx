import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserFileUpload = ({project}) => {
  const user = useSelector((state) => state.Auth.user);
  if (!user) {
    return
  }
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [commentOnFileByStudent, setCommentOnFileByStudent] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('commentOnFileByStudent', commentOnFileByStudent);
    formData.append('projectId',project._id)

    try {
      axios.post(`http://localhost:4000/AddProjectFilesByStudent`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(tost("Uploaded Successfully"))
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="fileName">File Name:</label>
          <input
            type="text"
            id="fileName"
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
  );
};

export default UserFileUpload;
