import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AfterLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [topArtists, setTopArtists] = useState([]); // Assicurati che sia un array vuoto di default
  const location = useLocation(); // Per accedere alla query string

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (!accessToken) {
      setError("No access token found");
      return;
    }

    // Salva l'access token nel localStorage
    localStorage.setItem("access_token", accessToken);

    // Prima recupera i dettagli dell'utente
    fetch(`http://localhost:3000/user-info?access_token=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        setError("Failed to fetch user info");
      });

    // Poi, una volta che l'access token è disponibile, fai la richiesta per i top artisti
    fetch(`http://localhost:3000/top-artists?access_token=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dati dei top artisti ricevuti:", data);

        // Assicurati che 'data' sia un array prima di impostarlo in topArtists

        setTopArtists(data);
      })
      .catch((err) => {
        setError("Error fetching top artists");
      });
  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo || topArtists.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
        {/* Puoi aggiungere qui un spinner o un'animazione di caricamento */}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mt-5">Welcome, {userInfo.display_name}</h1>
      <h2 className="my-5">Your Top Artists</h2>
      <div className="d-flex row row-cols-lg-6 row-cols-md-3 row-cols-sm-1 g-3 flex-wrap">
        {topArtists.items.map((artist, index) => (
          <div className="col-lg-4" key={artist.id}>
            <div className="card h-100">
              <div className="card-header ">
                <h3>{artist.name}</h3>
              </div>

              <div className="card-body ">
                <img
                  src={artist.images[0]?.url || "default_image_url.jpg"} // Assicurati che ci sia un URL immagine valido
                  alt={artist.name}
                  className="img-fluid dolo-img"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AfterLogin;
