import React, {useEffect, useState} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service"

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
      navigate('/profile/mytuits');
    } catch (e) {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    service.logout()
    .then(() => navigate('/login'));
  }

  return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button onClick={logout}>
          Logout</button>
      </div>
  );
};
export default Profile;