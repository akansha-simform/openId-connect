import "./App.css";
import { Avatar, Button } from "antd";
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import { useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

function GoogleApp() {
  const [credentialResponse, setCredentialResponse] =
    useState<CredentialResponse | null>();
  const [user, setUser] = useState({
    name: "",
    email: "",
    picture: "",
  });

  useMemo(() => {
    if (!credentialResponse?.credential) return;
    setUser(jwtDecode(credentialResponse.credential));
    return jwtDecode(credentialResponse.credential);
  }, [credentialResponse]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      setUser(userInfo);
      localStorage.setItem("access_token", JSON.stringify(tokenResponse));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const logout = () => {
    googleLogout();
    setUser({
      name: "",
      email: "",
      picture: "",
    });
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div className="App">
      <header>
        <>
          {!user.name && (
            <>
              <b>Login With google:</b>
              <Button onClick={() => googleLogin()}>Custom Google Login</Button>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  localStorage.setItem(
                    "access_token",
                    JSON.stringify(credentialResponse?.credential)
                  );
                  setCredentialResponse(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                // useOneTap
              />
            </>
          )}
          {user.name && (
            <>
              <h2>
                <b>User Information:</b>
              </h2>
              <Avatar src={<img src={user?.picture} alt="avatar" />} />

              <h4>User name : {user?.name}</h4>
              <h4>User email : {user?.email}</h4>

              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </>
      </header>
    </div>
  );
}

export default GoogleApp;
