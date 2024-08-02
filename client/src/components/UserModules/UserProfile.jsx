import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './UserProfile.css';
import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const user = useSelector((state) => state.Auth.user);
    const [StuData, setStuData] = useState(null);

    useEffect(() => {
        const getDetails = () => {
            axios.post('http://localhost:4000/StudentDetailByEmail',  { email: user.email } , {
                headers: { // Use 'headers' instead of 'header'
                    'Content-Type': 'application/json'
                }
            })
            .then(result => {
                setStuData(result.data);
                setStuImage(result.data.image)
                // Setting individual states is not needed if you are using StuData
            })
            .catch(err => { console.log(err) })
        }
        getDetails();
    }, [user.email]);

    // Using destructuring to provide default values
    const {
        name = '',
        email = '',
        gender = '',
        enrollmentnumber = '',
        branch = '',
        semester = '',
        division = '',
        mobilenumber = '',
        image = ''
    } = StuData || {};

    const [StuImage, setStuImage] = useState(image);

    const fileInputRef = useRef(null);

    const handlePictureChange = (event) => {
        setStuImage(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleEditDetails = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('enrollmentnumber', enrollmentnumber);
        formData.append('branch', branch);
        formData.append('semester', semester);
        formData.append('division', division);
        formData.append('mobilenumber', mobilenumber);
        formData.append('image', StuImage);

        axios.put(`http://localhost:4000/EditStudent/${StuData._id}`, formData, {
            headers: { // Use 'headers' instead of 'header'
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            setStuData(result.data);
            setStuImage(result.data.image);
            // No need to update individual states here if you use StuData
        })
    }

    return (
        <div className="profile-container">
            <div className='top-profile-container'>
                <div className='profile-image-container'>
                    <div className="profile-image-display">
                        <h3>Profile Picture</h3>
                        <img src={`http://localhost:4000/${StuImage}`} alt="Profile" className="profile-image" />
                    </div>
                    <div className="profile-picture">
                        <button onClick={handleButtonClick}>Edit {<MdOutlineEdit />}</button>
                        <input
                            type="file"
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
                        <input type="text" value={name} onChange={(e) => setStuData(prev => ({ ...prev, name: e.target.value }))} name="name" required />
                    </div>
                    <div className="form-group-top">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setStuData(prev => ({ ...prev, email: e.target.value }))} name="email" required />
                    </div>
                </div>
            </div>

            <div className='profile-details'>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        value={gender}
                        onChange={(e) => setStuData(prev => ({ ...prev, gender: e.target.value }))}
                        required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Enrollment Number</label>
                    <input type="text" value={enrollmentnumber} onChange={(e) => setStuData(prev => ({ ...prev, enrollmentnumber: e.target.value }))} name="enrollmentNumber" required />
                </div>
                <div className="form-group">
                    <label>Branch</label>
                    <input type="text" value={branch} onChange={(e) => setStuData(prev => ({ ...prev, branch: e.target.value }))} name="branch" required />
                </div>
                <div className="form-group">
                    <label>Semester</label>
                    <input type="text" value={semester} onChange={(e) => setStuData(prev => ({ ...prev, semester: e.target.value }))} name="semester" required />
                </div>
                <div className="form-group">
                    <label>Division</label>
                    <input type="text" value={division} onChange={(e) => setStuData(prev => ({ ...prev, division: e.target.value }))} name="division" required />
                </div>
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="tel" value={mobilenumber} onChange={(e) => setStuData(prev => ({ ...prev, mobilenumber: e.target.value }))} name="mobileNumber" required />
                </div>
            </div>
            <button onClick={handleEditDetails}>Save</button>
        </div>
    );
};

export default ProfilePage;
