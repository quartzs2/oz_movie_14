import { supabase } from "@api";
import { GoogleLoginButton } from "@components";
import { useState } from "react";

function SocialLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      options: {
        redirectTo: window.location.origin,
      },
      provider: "google",
    });

    if (error) {
      console.error("구글 로그인 오류:", error);
      setIsLoading(false);
    }
  };

  return (
    <GoogleLoginButton isLoading={isLoading} onClick={handleGoogleLogin} />
  );
}

export default SocialLogin;
