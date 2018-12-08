import React from 'react';
import classes from "classnames";

import './Login.scss';

const Login = ({
   isFetching,
   __email,
   __password,
   __emailInputHasContent,
   __emailNotFound,
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
        <h2 className="sign-up__header-text sign-up__header-text--left">Welcome back to EventsBook</h2>
        <p className="sign-up__description-text sign-up__description-text--left">
        Mereu în căutarea de experiențe noi reprezintă diviza platformei, ce are drept scop promovarea cât și organizarea, cu ajutorul organizatorilor.
        </p>
        <div className="sign-up__email">
          <form onSubmit={onSubmit}>
            <div className="input-component">
              <div className="input-component__input-wrapper">
                <input
                  required
                  name="email"
                  type="email"
                  value={__email}
                  spellCheck="false"
                  autoComplete="username"
                  onChange={onEmailChange}
                  className="input-component__input"
                  title="Enter your email address in this field."
                />
                <label
                  htmlFor="email"
                  className={classes("input-component__label", {
                    "input-component__label--has-content": __emailInputHasContent
                  })}
                >
                  Email
                </label>
              </div>
              {__emailNotFound && (
                <p className="input_component__error">
                  Couldn't find your EventsBook account
                </p>
              )}
            </div>
            <input
              required
              type="password"
              value={__password}
              onChange={onPasswordChange}
              autoComplete="current-password"
              className="sign-up__input sign-up__input--second-form"
            />
            <button 
              className="sign-up__submit"
              title="Please, fill all the fields above with valid information to continue.">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
