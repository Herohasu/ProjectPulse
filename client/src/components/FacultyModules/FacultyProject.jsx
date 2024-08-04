import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserModalProject from '../UserModules/UserModalProject'
import axios from 'axios'

const FacultyProject = () => {
  const user = useSelector((state) => state.Auth.user);
  const [ProjectsData, setProjectsData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
      .then(result => {
        setProjectsData(result.data)
      })
  })

  return (
    <div>
      <div className="project-page-wrapper">
        <div className="projects-list">
          {ProjectsData.map((project, index) => (
            <div key={index} className="project-card">
              <center><h2>{project.ProjectTitle}</h2></center>
              <p><strong>Description:</strong> {project.ProjectDescription}</p>
              <p><strong>Mentor Name:</strong> {user.name}</p>
              <p><strong>Team Name:</strong> {project.TeamName}</p>
              <p><strong>Approval:</strong> {project.Approval}</p>
              <p><strong>Year:</strong> {project.Year}</p>
              <div className="button-container">
                <button className="go-to-button">GO TO</button>
                <button
                  className="delete-button"
                  onClick={() => handleShowConfirmModal(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* <ConfirmDeleteModal
        show={showConfirmModal}
        handleClose={handleCloseConfirmModal}
        handleConfirm={handleConfirmDelete}
      /> */}
      </div>
    </div>
  )
}

export default FacultyProject