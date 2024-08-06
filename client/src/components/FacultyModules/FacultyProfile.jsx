import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios'
import toast from 'react-hot-toast';

const FacultyProfile = () => {
  const user = useSelector((state) => state.Auth.user);
  if(!user){
    return
  }
  const [FacutlyData, setFacutlyData] = useState([]);
  const [FacImage, setFacImage] = useState(null);

  useEffect(() => {
    const getDetails = () => {
      axios.get(`http://localhost:4000/FacultyDetailByEmail`, {
        params: { email: user.email },
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(result => {
          setFacutlyData(result.data);
          setFacImage(result.data.image)
        })
        .catch(err => { console.log(err) })
    }
    getDetails();
  }, [user.email])

  const {
    name = user.name,
    gender = '',
    facultyid = '',
    email = user.email,
    mobilenumber = '',
    image = ''
  } = FacutlyData || {};

  const fileInputRef = useRef(null);
  const handlePictureChange = (event) => {
    setFacImage(event.target.files[0]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleEditDetails = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('gender', gender)
    formData.append('facultyid', facultyid)
    formData.append('email', email)
    formData.append('mobilenumber', mobilenumber)
    formData.append('image', FacImage) 

    axios.put(`http://localhost:4000/EditFaculty/${FacutlyData._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(result => {
        toast("edited Successfully")
        setFacutlyData(result.data)
        setFacImage(result.data.image)
      })
  }

  return (
    <div className="profile-container">
      <div className='top-profile-container'>
        <div className='profile-image-container'>
          <div className="profile-image-display">
            <h3>Profile Picture</h3>
            <img src={`http://localhost:4000/${FacImage}`} alt="Profile" className="profile-image" />
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
            <input type="text" value={name} name="name" required />
          </div>
          <div className="form-group-top">
            <label>Email</label>
            <input type="email" value={email} name="email" required />
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
            onChange={(e) => setFacutlyData(prev => ({ ...prev, gender: e.target.value }))}
            required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Faculty Id</label>
          <input type="text" value={facultyid} onChange={(e) => setFacutlyData(prev => ({ ...prev, facultyid: e.target.value }))} name="enrollmentNumber" required />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" value={mobilenumber} onChange={(e) => setFacutlyData(prev => ({ ...prev, mobilenumber: e.target.value }))} name="mobileNumber" required />
        </div>
      </div>
      <button onClick={handleEditDetails}>Save</button>
    </div>
  )
}

export default FacultyProfile