import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './UserProfile.css';
import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const user = useSelector((state) => state.Auth.user);
    const [StuData, setStuData] = useState([]);

    useEffect(() => {
        const getDetails = () => {
            axios.post('http://localhost:4000/StudentDetailByEmail',  { email: user.email } , {
                header: {
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    setStuData(result.data);
                    setStuName(result.data.name);
                    setStuEmail(result.data.email);
                    setStuGender(result.data.gender);
                    setStuEnroll(result.data.enrollmentnumber);
                    setStuBranch(result.data.branch);
                    setStuSemester(result.data.semester);
                    setStuDiv(result.data.division);
                    setStuMobile(result.data.mobilenumber);
                    setStuImage(result.data.image);
                })
                .catch(err => { console.log(err) })
        }
        getDetails();
    }, [user.email]);

    const [StuName, setStuName] = useState('');
    const [StuEmail, setStuEmail] = useState('');
    const [StuGender, setStuGender] = useState('');
    const [StuEnroll, setStuEnroll] = useState('');
    const [StuBranch, setStuBranch] = useState('');
    const [StuSemester, setStuSemester] = useState('');
    const [StuDiv, setStuDiv] = useState('');
    const [StuMobile, setStuMobile] = useState('');
    const [StuImage, setStuImage] = useState('');

    const fileInputRef = useRef(null);

    const handlePictureChange = (event) => {
        setStuImage(event.target.files[0])
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleEditDetails = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',StuName)
        formData.append('email',StuEmail)
        formData.append('gender',StuGender)
        formData.append('enrollmentnumber',StuEnroll)
        formData.append('branch',StuBranch)
        formData.append('semester',StuSemester)
        formData.append('division',StuDiv)
        formData.append('mobilenumber',StuMobile)
        formData.append('image',StuImage)

        axios.put(`http://localhost:4000/EditStudent/${StuData._id}`,formData,{
            header:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            setStuData(result.data);
            setStuName(result.data.name);
            setStuEmail(result.data.email);
            setStuGender(result.data.gender);
            setStuEnroll(result.data.enrollmentnumber);
            setStuBranch(result.data.branch);
            setStuSemester(result.data.semester);
            setStuDiv(result.data.division);
            setStuMobile(result.data.mobilenumber);
            setStuImage(result.data.image);
        })
    }

    return (
        <div className="profile-container">
            <div className='top-profile-container'>
                <div className='profile-image-container'>
                    <div className="profile-image-display">
                        <h3>Profile Picture</h3>
                        <img src={`http://localhost:4000/${StuImage}`}  alt="Profile" className="profile-image" />
                    </div>
                    <div className="profile-picture">
                        <button onClick={handleButtonClick}>Edit {<MdOutlineEdit />}</button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e)=> setStuImage(e.target.files[0])}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div>
                    <div className="form-group-top">
                        <label>Name</label>
                        <input type="text" value={StuData.name} onChange={(e) => setStuName(e.target.value)} name="name" required />
                    </div>
                    <div className="form-group-top">
                        <label>Email</label>
                        <input type="email" value={StuEmail} onChange={(e) => setStuEmail(e.target.value)} name="email" required />
                    </div>
                </div>
            </div>

            <div className='profile-details'>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        value={StuData.gender}
                        onChange={(e) => setStuGender(e.target.value)}
                        required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Enrollment Number</label>
                    <input type="text" value={StuData.enrollmentnumber} onChange={(e) => setStuEnroll(e.target.value)} name="enrollmentNumber" required />
                </div>
                <div className="form-group">
                    <label>Branch</label>
                    <input type="text" value={StuData.branch} onChange={(e) => setStuBranch(e.target.value)} name="branch" required />
                </div>
                <div className="form-group">
                    <label>Semester</label>
                    <input type="text" value={StuData.semester} onChange={(e) => setStuSemester(e.target.value)} name="semester" required />
                </div>
                <div className="form-group">
                    <label>Division</label>
                    <input type="text" value={StuData.division} onChange={(e) => setStuDiv(e.target.value)} name="division" required />
                </div>
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="tel" value={StuData.mobilenumber} onChange={(e) => setStuMobile(e.target.value)} name="mobileNumber" required />
                </div>
            </div>
            <button onClick={handleEditDetails}>Save</button>
        </div>
    );
};

export default ProfilePage;
