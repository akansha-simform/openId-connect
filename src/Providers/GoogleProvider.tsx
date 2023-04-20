import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../Constant";

const GoogleProvider = (props: any) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {props.children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
