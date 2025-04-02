import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { useGoogleLogin } from "@/hooks/auth/use-google-login";

const GoogleLoginButton = () => {
  const { mutate: loginWithGoogle } = useGoogleLogin();

  const onSuccess = (response: CredentialResponse) => {
    loginWithGoogle(response.credential!);
  };

  const onFailure = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      useOneTap
      theme="filled_blue"
      size="large"
    />
  );
};

export default GoogleLoginButton;
