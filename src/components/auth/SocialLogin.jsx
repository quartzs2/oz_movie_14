import { supabase } from "@api";
import { GoogleLoginButton, KakaoLoginButton } from "@components";
import { AUTH_PROVIDERS, SOCIAL_LOGIN_SCOPES } from "@constants";
import { useState } from "react";

function SocialLogin() {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async ({ provider }) => {
    setLoadingProvider(provider);

    const options = {
      redirectTo: window.location.origin,
    };

    // 카카오의 경우 이메일 스코프 제외
    if (provider === AUTH_PROVIDERS.KAKAO) {
      options.queryParams = {
        scope: SOCIAL_LOGIN_SCOPES[AUTH_PROVIDERS.KAKAO],
      };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      options,
      provider,
    });

    if (error) {
      console.error(`${provider} 로그인 오류:`, error);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <GoogleLoginButton
        isLoading={loadingProvider === AUTH_PROVIDERS.GOOGLE}
        onClick={() => handleSocialLogin({ provider: AUTH_PROVIDERS.GOOGLE })}
      />
      <KakaoLoginButton
        isLoading={loadingProvider === AUTH_PROVIDERS.KAKAO}
        onClick={() => handleSocialLogin({ provider: AUTH_PROVIDERS.KAKAO })}
      />
    </div>
  );
}

export default SocialLogin;
