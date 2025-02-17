const clientId = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback";
const AUTH_URL = `https://accounts.spotify.com/authorize
?client_id=${clientId}
&response_type=code
&redirect_uri=${encodeURIComponent(REDIRECT_URI)}
&scope=user-read-private user-read-email user-top-read`;

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Benvenuto nella tua Web App Spotify!</h1>
      <a href={AUTH_URL}>
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          🎵 Accedi con Spotify
        </button>
      </a>
    </div>
  );
}
