import React, { useEffect, useState } from 'react';
import './UserTeam.css';
import toast from 'react-hot-toast';
import axios from 'axios'

const UserTeam = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState('');
    const [membersDetails, setMembersDetails] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [teams, setTeams] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/ShowTeamsByEmail/${user.email}`)
            .then(result => {
                setTeams(result.data)
            })
            .catch(err => { console.log(err) })
    })

    const handleSave = () => {
        if (parseInt(teamMembers) === 3 && membersDetails.split(',').length > 2) {
            alert('Please select only 2 members. One will be the creator.');
            return;
        }
        if (!teamLeader) {
            alert('Please select a Team Leader.');
            return;
        }
        const memberList = membersDetails.split(',').map(member => member.trim());
        for (let i = 0; i < memberList.length; i++) {
            console.log("fdf", memberList[i]);
            axios.get('http://localhost:4000/CheckForEmail', {
                params: { email: memberList[i] },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    if (result.data.email) {
                        console.log(result.data.message)
                        toast(result.data.email + result.data.message)
                    }
                }
                )
                .catch((err) => {
                    console.log(err)
                })
        }

        // =================== db storing ==============
        const formData = new FormData()
        const dataformembers = membersDetails + "," + user.email
        formData.append('TeamName', teamName)
        formData.append('LeaderName', teamLeader)
        formData.append('TeamMembers', dataformembers)
        axios.post('http://localhost:4000/AddTeams', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((result) => {
                toast("Team Added Successfully")
                // console.log(result.data)
            })
            .catch((err) => { console.log(err) })


        closeModal();
    };

    const handleDelete = (id)=>{
        console.log("ifd:",id)
        axios.delete(`http://localhost:4000/DeleteTeams/${id}`)
        .then(result=>{
            toast(result.data.message)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const getTeamMembersList = () => {
        return membersDetails.split(',').map(member => member.trim()).concat(user.name);
    };

    return (
        <>
            <div className="user-team-wrapper">
                <div className="user-team-container">
                    <button className="create-team-button" onClick={openModal}>
                        Create Team
                    </button>
                </div>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Create a New Team</h2>
                                <span className="close" onClick={closeModal}>&times;</span>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="teamName">Name of the Team:</label>
                                <input
                                    type="text"
                                    id="teamName"
                                    className="modal-input"
                                    placeholder="Enter the team name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                                <label htmlFor="teamMembers">Number of Team Members:</label>
                                <input
                                    type="number"
                                    id="teamMembers"
                                    className="modal-input"
                                    placeholder="Enter number of team members"
                                    value={teamMembers}
                                    onChange={(e) => setTeamMembers(e.target.value)}
                                />
                                <label htmlFor="membersDetails">Members to Add Details:</label>
                                <input
                                    type="text"
                                    id="membersDetails"
                                    className="modal-input"
                                    placeholder="Enter details of members to add (comma-separated)"
                                    value={membersDetails}
                                    onChange={(e) => setMembersDetails(e.target.value)}
                                />
                                <label htmlFor="teamLeader">Team Leader:</label>
                                <select
                                    id="teamLeader"
                                    className="modal-input"
                                    value={teamLeader}
                                    onChange={(e) => setTeamLeader(e.target.value)}
                                >
                                    <option value="">Select Team Leader</option>
                                    {getTeamMembersList().map((member, index) => (
                                        <option key={index} value={member}>{member}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button onClick={closeModal}>Cancel</button>
                                <button onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {teams.length > 0 && (
                <div className="teams-list">
                    {teams.map((team, index) => (
                        <div key={index} className="team-details-card">
                            <h3>Team Details:</h3>
                            <p><strong>Team Name:</strong> {team.TeamName}</p>
                            <div><strong>Name of Team Members: </strong></div>
                            <div className="members-container">
                                {team.MemberName.map((member, index) => (
                                    <div key={index} className={`member-item ${member === team.LeaderName ? 'captain' : ''}`}>
                                        {member} {member === team.LeaderName ? '(Captain)' : ''}
                                    </div>
                                ))}
                            </div>
                            <br></br>
                            <button onClick={()=> handleDelete(team._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default UserTeam;
