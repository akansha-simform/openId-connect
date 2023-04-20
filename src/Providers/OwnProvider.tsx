import { AuthProvider } from "react-oidc-context";
import {
  OWN_PROVIDER_AUTHORITY,
  OWN_PROVIDER_CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "../Constant";

const OwnProvider = (props: any) => {
  const oidcConfig = {
    onSigninCallback: (user: any) => {
      loginUser(user);
    },
    authority: OWN_PROVIDER_AUTHORITY,
    client_id: OWN_PROVIDER_CLIENT_ID,
    response_type: RESPONSE_TYPE,
    redirect_uri: REDIRECT_URI,
  };

  const loginUser = (user: any) => {
    localStorage.setItem("access_token", user?.access_token);
  };

  return <AuthProvider {...oidcConfig}>{props.children}</AuthProvider>;
};

export default OwnProvider;
