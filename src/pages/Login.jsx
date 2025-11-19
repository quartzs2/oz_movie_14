import {
  AuthFormContainer,
  FormDivider,
  LoginForm,
  SocialLogin,
} from "@components";

function Login() {
  return (
    <AuthFormContainer title="로그인">
      <div className="mt-8 space-y-6">
        <SocialLogin />
        <FormDivider />
        <LoginForm />
      </div>
    </AuthFormContainer>
  );
}

export default Login;
