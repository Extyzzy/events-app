import React from 'react';
import './SignUp.scss';
import classes from 'classnames';

const SignUp = ({
  sendEmail,
  sendSignUpData,
  onEmailChange,
  onNameChange,
  onPasswordChange,
  onPasswordConfirmationChange,
  __email,
  __emailSentSucces,
  __secondForm,
  __passwordsMatch,
  __password,
  __passwordConfirmation,
}) => (
    <div className='sign-up'>
      <div className="sign-up__container">
        <div className="sign-up__image-section">
          <img className="sign-up__image" />
        </div>
        {
          (
            __secondForm && (
            <div className="sign-up__text-section sign-up__text-section--left">
            <h2 className="sign-up__header-text sign-up__header-text--left">JOIN EVENTSBOOK</h2>
            <p className="sign-up__description-text sign-up__description-text--left">
            Mereu în căutarea de experiențe noi reprezintă diviza platformei, ce are drept scop promovarea cât și organizarea, cu ajutorul organizatorilor, a evenimentelor ce urmează ținta de a crea un social - networking nou pentru toate tipurile de vârste cât și interese.
            </p>
            <div className="sign-up__email">
              <form onSubmit={sendSignUpData}>
                <label className="sign-up__label">Email</label>
                <input
                  className="sign-up__input sign-up__input--second-form"
                  type="email"
                  value={__email}
                  readOnly
                />
                <label className="sign-up__label">Name</label>
                <input 
                  className="sign-up__input sign-up__input--second-form"
                  type="text"
                  onChange={onNameChange}
                  required
                />
                <label
                  className={classes("sign-up__label", {
                    ["sign-up__label--green"]: __passwordsMatch,
                    ["sign-up__label--red"]: !__passwordsMatch && __password !== '' && __passwordConfirmation  !== '',
                  })}
                >
                  Password
                </label>
                <input
                  className="sign-up__input sign-up__input--second-form"
                  type="password"
                  onChange={onPasswordChange}
                  required
                />
                <label
                  className={classes("sign-up__label", {
                    ["sign-up__label--green"]: __passwordsMatch,
                    ["sign-up__label--red"]: !__passwordsMatch && __password !== '' && __passwordConfirmation  !== '',
                  })}
                >
                  Confirm Password
                </label>
                <input
                  className="sign-up__input sign-up__input--second-form"
                  type="password"
                  onChange={onPasswordConfirmationChange}
                  required
                />
                <button className="sign-up__submit-google">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          )) || (
          <div className="sign-up__text-section"> 
            <h2 className="sign-up__header-text">JOIN EVENTSBOOK</h2>
            <p className="sign-up__description-text">
            Mereu în căutarea de experiențe noi reprezintă diviza platformei, ce are drept scop promovarea cât și organizarea, cu ajutorul organizatorilor, a evenimentelor ce urmează ținta de a crea un social - networking nou pentru toate tipurile de vârste cât și interese.
            </p>
            <div className="sign-up__email">
              <form onSubmit={sendEmail}>
                <input
                  className="sign-up__input"
                  type="email"
                  onChange={onEmailChange}
                  value={__email}
                  required
                />
                <button
                  className={classes("sign-up__submit-email", {
                    ["sign-up__submit-email--succes"]: __emailSentSucces,
                  })}
                >
                  ✈️
                </button>
              </form>
            </div>
            <button className="sign-up__submit-google">Sign Up With Google</button>
          </div>
          )
        }

      
      </div>
    </div>
  );

export default SignUp;
