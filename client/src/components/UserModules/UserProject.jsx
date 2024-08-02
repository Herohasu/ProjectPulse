import React, { useState } from 'react';
import './UserProject.css';

const UserProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="user-project-wrapper">
      <div className="user-project-container">
        <button className="create-project-button" onClick={openModal}>
          Create Project
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Create New Project</h2>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="projectTitle">Project Title</label>
                  <input type="text" id="projectTitle" name="projectTitle" required className="modal-input"/>
                </div>
                <div className="form-group">
                  <label htmlFor="projectDescription">Project Description</label>
                  <textarea id="projectDescription" name="projectDescription" required className="modal-input"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="mentorId">Mentor ID</label>
                  <input type="text" id="mentorId" name="mentorId" required className="modal-input"/>
                </div>
                <div className="form-group">
                  <label htmlFor="teamId">Team ID</label>
                  <input type="text" id="teamId" name="teamId" required className="modal-input"/>
                </div>
                <div className="form-group">
                  <label htmlFor="approvalForMentor">Approval For Mentor</label>
                  <select id="approvalForMentor" name="approvalForMentor" className="modal-input">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea id="comment" name="comment" className="modal-input"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <input type="number" id="year" name="year" required className="modal-input"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="modal-footer-button" onClick={closeModal}>Cancel</button>
              <button type="submit" className="modal-footer-button">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProject;
