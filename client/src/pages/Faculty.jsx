import React from 'react';
import FacultyLayout from '../Layouts/FacultyLayout';
import FacultyDashboard from '../components/FacultyModules/FacultyDashboard';

const Faculty = () => {
  return (
    <FacultyLayout>
      <FacultyDashboard />
    </FacultyLayout>
  );
};

export default Faculty;