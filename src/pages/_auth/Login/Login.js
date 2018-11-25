import React from 'react';

import './Login.scss';

const Login = ({
   isFetching,
   __email,
   __password,
   onEmailChange,
   onPasswordChange,
   onSubmit
}) => (
  <div className='sign-up'>
    <div className="sign-up__container">
      <div className="sign-up__image-section">
        <img alt='' className="sign-up__image" />
      </div>
      <div className="sign-up__text-section sign-up__text-section--left">
        <h2 className="sign-up__header-text sign-up__header-text--left">WELCOME BACK<br /> TO EVENTSBOOK</h2>
        <p className="sign-up__description-text sign-up__description-text--left">
        Mereu în căutarea de experiențe noi reprezintă diviza platformei, ce are drept scop promovarea cât și organizarea, cu ajutorul organizatorilor.
        </p>
        <div className="sign-up__email">
          <form onSubmit={onSubmit}>
            <label className="sign-up__label">Email</label>
            <input
              className="sign-up__input sign-up__input--second-form"
              type="email"
              value={__email}
              required
              onChange={onEmailChange}
            />
            <label
              className="sign-up__label"
            >
              Password
            </label>
            <input
              className="sign-up__input sign-up__input--second-form"
              type="password"
              required
              onChange={onPasswordChange}
              value={__password}
            />
            <button className="sign-up__submit-google">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
