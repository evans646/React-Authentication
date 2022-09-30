import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";

export const ProfilePage = () => {
  const [success, setSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [token] = useToken();
  const history = useHistory();
  const user = useUser();
  const { email, info, id } = user;
  JSON.stringify(info);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const abortController = new AbortController()
  const signal = abortController.signal


  const deleteProfile = async () => {
    try {
      await axios 
        .delete(`/api/users/${id}/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        }, {signal})
        .then(() => setSuccess(true))
        .then(() => setShowSuccessMessage(true));
      setTimeout(() => {
        history.push("/login");
      }, 3000);
      return () => {
        abortController.abort();
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(true);
    }
  };

  return success ? (
    <div className="content-container">
      {showSuccessMessage && (
        <div className="success">User account deleted successfully</div>
      )}
    </div>
  ) : (
    <div className="content-container">
      {showErrorMessage && <div className="fail"> {errorMessage}</div>}
      <div>
        <Link to={"/"}>Back to home</Link>
      </div>
      <hr />
      <b>Email:</b>
      <p>{email}</p>
      <b> favorite Food:</b>
      <p>{info.favoriteFood}</p>
      <b> Hair Color: </b> <p>{info.hairColor}</p>
      <b> Bio:</b>
      <p>{info.bio}</p>
      <hr />
      <b>Want to delete your account ?</b>
      <button onClick={() => deleteProfile()}>Delete profile</button>
    </div>
  );
};
