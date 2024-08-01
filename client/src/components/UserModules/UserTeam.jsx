import React, { useState } from 'react';
import './UserTeam.css';

const UserTeam = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState('');
    const [membersDetails, setMembersDetails] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [teams, setTeams] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        const newTeam = {
            teamName,
            teamMembers,
            membersDetails: [user.name, ...memberList],
            teamLeader
        };
        setTeams([...teams, newTeam]);
        closeModal();
    };

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
                            <p><strong>Team Name:</strong> {team.teamName}</p>
                            <p><strong>Number of Team Members:</strong> {team.teamMembers}</p>
                            <div><strong>Name of Team Members: </strong></div>
                            <div className="members-container">
                                {team.membersDetails.map((member, index) => (
                                    <div key={index} className={`member-item ${member === team.teamLeader ? 'captain' : ''}`}>
                                        {member} {member === team.teamLeader ? '(Captain)' : ''}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default UserTeam;
