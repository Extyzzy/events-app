import React from "react";
import "./SignUp.scss";
import classes from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  __passwordConfirmation
}) => (
  <div className="sign-up">
    <div className="sign-up__container">
      <div className="sign-up__image-section">
        <img 
          src="https://images.unsplash.com/photo-1523791906223-5cef82f180ea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=623e58ad29dead46b99b4dc3094c635d&auto=format&fit=crop&w=1351&q=80"
          alt="event" 
          className="sign-up__image" />
      </div>
      {(__secondForm && (
        <div className="sign-up__text-section sign-up__text-section--left">
          <h2 className="sign-up__header-text sign-up__header-text--left">
            Avem grija de datele oferite de dvs.
          </h2>
          <p className="sign-up__description-text sign-up__description-text--left">
            Mereu în căutarea de experiențe noi reprezintă diviza platformei, ce
            are drept scop promovarea cât și organizarea, cu ajutorul.
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
                  "sign-up__label--green": __passwordsMatch,
                  "sign-up__label--red":
                    !__passwordsMatch &&
                    __password !== "" &&
                    __passwordConfirmation !== ""
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
                  "sign-up__label--green": __passwordsMatch,
                  "sign-up__label--red":
                    !__passwordsMatch &&
                    __password !== "" &&
                    __passwordConfirmation !== ""
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
              <button className="sign-up__submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )) || (
        <div className="sign-up__text-section">
          <h2 className="sign-up__header-text">
          Show your<br />Property to a Whole<br />New Audience
          </h2>
          <p className="sign-up__description-text">
            Mereu în căutarea de experiențe noi reprezintă diviza platformei, ce
            are drept scop promovarea cât și organizarea, cu ajutorul
            organizatorilor, a evenimentelor ce urmează ținta de a crea un
            social - networking nou pentru toate tipurile de vârste cât și
            interese.
          </p>
          <div className="sign-up__email">
            <form onSubmit={sendEmail}>
              <input
                className="sign-up__input"
                type="email"
                onChange={onEmailChange}
                value={__email}
                placeholder="Introduceti adresa de email"
                spellCheck="false"
                required
              />
              <button
                className={classes("sign-up__submit-email", {
                  "sign-up__submit-email--succes": __emailSentSucces
                })}
              >
                <FontAwesomeIcon
                  size="2x"
                  color="white"
                  icon={["fab", "telegram-plane"]}
                />

              </button>
            </form>
            </div>
          <button className="sign-up__submit sign-up__submit--google">
            Sign Up With Google
          </button>
        </div>
      )}
    </div>
  </div>
);

export default SignUp;
