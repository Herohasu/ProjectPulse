import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const FacultyLayout = () => {
    const user = useSelector((state) => state.Auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'faculty') {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            {/* You can add faculty-specific header, sidebar, etc. here */}
            <Outlet />
        </div>
    );
};

export default FacultyLayout;
