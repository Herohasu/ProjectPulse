import React, { useState } from 'react';
import './UserProfile.css';

const ProfilePage = () => {
    const [profilePicture, setProfilePicture] = useState(null);

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-image-display">
                {profilePicture && <img src={profilePicture} alt="Profile" className="profile-image" />}
            </div>
            <div className="profile-details">
                <div className="profile-left">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" required />
                        </div>
                        <div className="form-group">
                            <label>Enrollment Number</label>
                            <input type="text" name="enrollmentNumber" required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobileNumber" required />
                        </div>
                    </form>
                </div>
                <div className="profile-right">
                    <form>
                        <div className="form-group">
                            <label>Branch</label>
                            <input type="text" name="branch" required />
                        </div>
                        <div className="form-group">
                            <label>Semester</label>
                            <input type="text" name="semester" required />
                        </div>
                        <div className="form-group">
                            <label>Division</label>
                            <input type="text" name="division" required />
                        </div>
                        <div className="form-group">
                            <label>Other Information</label>
                            <input type="text" name="division" required />
                        </div>
                    </form>
                </div>
            </div>
            <div className="profile-picture">
                <label>Profile Picture</label>
                <input type="file" name="profilePicture" accept="image/*" onChange={handlePictureChange} />
            </div>
        </div>
    );
};

export default ProfilePage;
