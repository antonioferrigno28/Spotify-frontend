import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AfterLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation(); // Per accedere alla query string
  const navigate = useNavigate(); // Per fare il redirect, se necessario

  useEffect(() => {
    // Recupera l'access token dalla query string
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (!accessToken) {
      setError("No access token found");
      return;
    }

    // Salva l'access token nel localStorage
    localStorage.setItem("access_token", accessToken);

    // Ora puoi fare la richiesta per recuperare i dettagli dell'utente
    fetch(`http://localhost:3000/user-info?access_token=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        setError("Failed to fetch user info");
      });
  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {userInfo.display_name}</h1>
    </div>
  );
}

export default AfterLogin;
