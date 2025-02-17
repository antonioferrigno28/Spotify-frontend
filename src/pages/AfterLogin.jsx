import React, { useEffect, useState } from "react";

function AfterLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken =
      "BQAE-vdlCqBv4XDqZYrfuewW3EDP7mE-QOD-AlZn0txitj9zPwPsGth56dIKcuX7_acPPlYFF0qDQMTRPiOMJR2CesEJVfmGTxYH0sIVPitp7WCxfXZV8M54BGdN5QVWSq8ONX_ZEHAX6ewqUT-d5rCTq8yIr7czWEwrfSxpb5Pc3G706SDEjDM8pqAKbS8eRnxfUVzxFzFxgCNnQk16Q1CeSEcaBH8-M91bpMxhJ6ItYcXjyTtyFg"; // Sostituisci con l'access token dell'utente, che probabilmente otterrai dopo la callback

    fetch(`http://localhost:3000/user-info?access_token=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        setError("Failed to fetch user info");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.display_name}</h1>
      <p>Email: {userInfo.email}</p>
      <p>Country: {userInfo.country}</p>
      {/* Aggiungi altre informazioni se necessario */}
    </div>
  );
}

export default AfterLogin;
