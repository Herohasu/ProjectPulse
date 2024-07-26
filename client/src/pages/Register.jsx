// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { post } from '../services/ApiEndpoint';
// import toast from 'react-hot-toast';
// import './Register.css';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       const request = await post('/api/auth/register', { name, email, password });
//       const response = request.data;

//       if (request.status === 200) {
//         toast.success(response.message);
//       }
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//       toast.error('Registration failed');
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-image"></div>
//       <div className="register-form">
//         <form onSubmit={handleSubmit}>
//           <h2>Register</h2>
//           <div className="input-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="confirm-password">Confirm Password</label>
//             <input
//               type="password"
//               id="confirm-password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">Register</button>
//           <p className="register-link">
//             Already have an Account? <Link to={'/login'}>Login Here</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import toast from 'react-hot-toast';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const request = await post('/api/auth/register', { name, email, password });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-image"></div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
          <p className="register-link">
            Already have an Account? <Link to={'/login'}>Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

