import { supabase } from "@api/supabase";
import { AuthFormContainer, FormField } from "@components";
import { ROUTE_PATHS } from "@constants/urls";
import { useAuthForm } from "@hooks";
import { loginSchema } from "@utils";
import { Link } from "react-router";

const LOGIN_FIELDS = [
  {
    autoComplete: "email",
    label: "이메일",
    name: "email",
    placeholder: "email@example.com",
    type: "email",
  },
  {
    autoComplete: "current-password",
    label: "비밀번호",
    name: "password",
    placeholder: "비밀번호를 입력하세요",
    type: "password",
  },
];

function Login() {
  const { errors, formData, handleChange, handleSubmit, isSubmitting } =
    useAuthForm({
      initialData: {
        email: "",
        password: "",
      },
      onSubmit: async (data) => {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) {
          throw error;
        }
      },
      schema: loginSchema,
    });

  return (
    <AuthFormContainer title="로그인">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {LOGIN_FIELDS.map((field) => (
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
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <div className="flex gap-1 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            계정이 없으신가요?
          </span>
          <Link
            className="font-medium text-black hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
            to={ROUTE_PATHS.SIGNUP}
          >
            회원가입
          </Link>
        </div>
      </form>
    </AuthFormContainer>
  );
}

export default Login;
