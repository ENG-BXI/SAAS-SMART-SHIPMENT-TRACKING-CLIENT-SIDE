import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <div>Logo</div>
      <ul className='flex items-center gap-x-4'>
        <li>Home</li>
        <li>Services</li>
        <li>Company</li>
        <li>Contact</li>
        <li>Register</li>
      </ul>
      <div>Register now</div>
    </div>
  );
};

export default Header;
