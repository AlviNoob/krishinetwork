import React, { useState } from 'react';
import "../pages/CSS/LoginSignup.css"
export const LoginSignup = () => {
  const [role, setRole] = useState('farmer'); // default selected role

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up as {role === 'farmer' ? 'Farmer' : 'Expert'}</h1>

        <div className="role-selection">
          <button 
            className={role === 'farmer' ? 'active' : ''}
            onClick={() => setRole('farmer')}
          >
            Farmer
          </button>
          <button 
            className={role === 'expert' ? 'active' : ''}
            onClick={() => setRole('expert')}
          >
            Expert
          </button>
        </div>

        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="tel" placeholder='Phone Number' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
          {/* Phone number format: XXX-XXX-XXXX */}
          {role === 'expert' && (
            <input type="text" placeholder='Area of Expertise' />
          )}
        </div>

        <button className="continue-btn">Continue</button>

        <p className="loginsignup-login">
          Already have an account? <span>Login Here</span>
        </p>

        <div className="loginsignup-agree">
          <input type="checkbox" id="agree" />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
