import { supabase } from "@api/supabase";
import { AuthFormContainer, FormField } from "@components";
import { ROUTE_PATHS } from "@constants/urls";
import { useAuthForm } from "@hooks";
import { signUpSchema } from "@utils";
import { Link, useNavigate } from "react-router";

const SIGNUP_FIELDS = [
  {
    autoComplete: "name",
    label: "이름",
    name: "name",
    placeholder: "이름을 입력하세요",
    type: "text",
  },
  {
    autoComplete: "email",
    label: "이메일",
    name: "email",
    placeholder: "email@example.com",
    type: "email",
  },
  {
    autoComplete: "new-password",
    label: "비밀번호",
    name: "password",
    placeholder: "8자 이상, 영어 대/소문자 + 숫자",
    type: "password",
  },
  {
    autoComplete: "new-password",
    label: "비밀번호 확인",
    name: "passwordConfirm",
    placeholder: "비밀번호를 다시 입력하세요",
    type: "password",
  },
];

function SignUp() {
  const navigate = useNavigate();

  const { errors, formData, handleChange, handleSubmit, isSubmitting } =
    useAuthForm({
      initialData: {
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
      },
      onSubmit: async (data) => {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          options: {
            data: {
              name: data.name,
            },
          },
          password: data.password,
        });

        if (error) {
          throw error;
        }

        alert("회원가입이 완료되었습니다!");
        navigate(ROUTE_PATHS.HOME);
      },
      schema: signUpSchema,
    });

  return (
    <AuthFormContainer subtitle="새로운 계정을 만들어보세요" title="회원가입">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {SIGNUP_FIELDS.map((field) => (
            <FormField
              autoComplete={field.autoComplete}
              error={errors[field.name]}
              id={field.name}
              key={field.name}
              label={field.label}
              onChange={handleChange({ field: field.name })}
              placeholder={field.placeholder}
              type={field.type}
              value={formData[field.name]}
            />
          ))}
        </div>

        <button
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        <div className="flex gap-1 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            이미 계정이 있으신가요?
          </span>
          <Link
            className="font-medium text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
            to={ROUTE_PATHS.LOGIN}
          >
            로그인
          </Link>
        </div>
      </form>
    </AuthFormContainer>
  );
}

export default SignUp;
