import React, { useState } from 'react';
import './UserProfile.css';
import { useRef } from 'react';
import { MdOutlineEdit } from "react-icons/md";

const ProfilePage = () => {
    const fileInputRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="profile-container">

            <div className='top-profilr-container'>
                <div className='profile-image-container'>
                    <div className="profile-image-display">
                        <h3>Profile Picture</h3>
                        {profilePicture && <img src={profilePicture} alt="Profile" className="profile-image" />}
                    </div>
                    <div className="profile-picture">
                        <button onClick={handleButtonClick}>Edit {<MdOutlineEdit />}</button>
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handlePictureChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div>
                    <div className="form-group-top">
                        <label>Name</label>
                        <input type="text" name="name" required />
                    </div>
                    <div className="form-group-top">
                        <label>Email</label>
                        <input type="email" name="email" required />
                    </div>
                </div>
            </div>


            <div className='profile-details'>
                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" name="gender" required />
                </div>
                <div className="form-group">
                    <label>Enrollment Number</label>
                    <input type="text" name="enrollmentNumber" required />
                </div>
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
                    <label>Mobile Number</label>
                    <input type="tel" name="mobileNumber" required />
                </div>
            </div>

            <button>Save</button>
        </div>
    );
};

export default ProfilePage;
