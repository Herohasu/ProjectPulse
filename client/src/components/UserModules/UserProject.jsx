import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProject.css';
import toast from 'react-hot-toast';
import UserModalProject from './UserModalProject';

const UserProject = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Facultylist, setFacultylist] = useState([]);
  const [TeamsList, setTeamsList] = useState([]);
  const [ProjectTitle, setProjectTitle] = useState('');
  const [ProjectDescription, setProjectDescription] = useState('');
  const [MentorId, setMentorId] = useState('');
  const [TeamId, setTeamId] = useState('');
  const [currentYear] = useState(new Date().getFullYear());

  const [ProjectsData, setProjectsData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`)
      .then(result => {
        setProjectsData(result.data)
        // console.log(result.data)
      })
  })
  const openModal = () => {
    setIsModalOpen(true);
  };


  const getFacultyDetails = () => {
    axios.get('http://localhost:4000/ShowFacultysData')
      .then(result => {
        // console.log(result.data)
        setFacultylist(result.data)
      })
      .catch(err => console.log(err));
  };

  const getTeamsData = () => {
    axios.get(`http://localhost:4000/ShowTeamsByEmail/${user.email}`)
      .then(result => {
        setTeamsList(result.data);
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ProjectTitle: ProjectTitle,
      ProjectDescription: ProjectDescription,
      Mentorid: MentorId,
      Teamid: TeamId,
      Year: currentYear
    }

    axios.post('http://localhost:4000/AddProjects', newProject, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        toast("Project Created Successfully")
      })

    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/DeleteProjects/${id}`)
      .then(result => { toast("Project Deleted Successfully") })
      .catch(err => { console.log(err) })
  }


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>



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
                    <input type="text" id="projectTitle" name="projectTitle" required className="modal-input" onChange={(e) => setProjectTitle(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectDescription">Project Description</label>
                    <textarea id="projectDescription" name="projectDescription" required className="modal-input" onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mentorId">Mentor Name</label>
                    <select onClick={() => getFacultyDetails()} onChange={(e) => setMentorId(e.target.value)} id="mentorId" name="mentorId" required className="modal-input">
                      <option value="">Select The Mentor</option>
                      {Facultylist.map((faculty, index) => (
                        <option key={index} value={faculty._id}>{faculty.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="teamId">Team ID</label>
                    <select onClick={() => getTeamsData()} onChange={(e) => setTeamId(e.target.value)} id='teamId' name='teamId' required className='modal-input'>
                      <option value="">Select The Team</option>
                      {TeamsList.map((team, index) => (
                        <option key={index} value={team._id}>{team.TeamName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input type="number" id="year" name="year" value={currentYear} readOnly required className="modal-input" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="modal-footer-button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="modal-footer-button" onClick={(e) => handleSubmit(e)} >Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <br></br>
      <UserModalProject
        isModalOpen={isModalOpen}
        ProjectsData={ProjectsData}
        handleDelete={handleDelete} />
    </>
  );
};

export default UserProject;
