import "./App.css";
import { useAuth } from "react-oidc-context";
import { Button, Result, Spin } from "antd";
import { REDIRECT_URI } from "./Constant";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="spin-style App-header">
        <Spin tip="Loading..."></Spin>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="spin-style">
        <Result status="500" title="Sorry, something went wrong." />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect();
  } else {
    console.log("authenticated :: ", auth?.user);
  }

  return (
    <div className="App">
      <header>
        {auth.isAuthenticated && (
          <>
            <h2>
              <b>User Information:</b>
            </h2>
            <h4>User name : {`${auth?.user?.profile?.username}`}</h4>
            <h4>
              User Type :{" "}
              {auth?.user?.profile?.user_type === "A"
                ? "Admin User"
                : "Operator User"}
            </h4>
            <h4>Tenant name : {`${auth?.user?.profile?.tenant_name}`}</h4>

            <Button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                auth.signoutRedirect({
                  post_logout_redirect_uri: REDIRECT_URI,
                });
              }}
            >
              Logout
            </Button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
