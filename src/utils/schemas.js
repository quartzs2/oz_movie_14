import { z } from "zod";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;

const VALIDATION_MESSAGES = {
  email: {
    invalid: "올바른 이메일 형식이 아닙니다",
    required: "이메일을 입력해주세요",
  },
  name: {
    maxLength: `이름은 ${NAME_MAX_LENGTH}자를 초과할 수 없습니다`,
    minLength: `이름은 최소 ${NAME_MIN_LENGTH}자 이상이어야 합니다`,
    required: "이름을 입력해주세요",
  },
  password: {
    lowercase: "비밀번호에 영어 소문자를 포함해야 합니다",
    minLength: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다`,
    mismatch: "비밀번호가 일치하지 않습니다",
    number: "비밀번호에 숫자를 포함해야 합니다",
    required: "비밀번호를 입력해주세요",
    uppercase: "비밀번호에 영어 대문자를 포함해야 합니다",
  },
};

export const signUpSchema = z
  .object({
    email: z.email(VALIDATION_MESSAGES.email.invalid),
    name: z
      .string()
      .min(1, VALIDATION_MESSAGES.name.required)
      .min(NAME_MIN_LENGTH, VALIDATION_MESSAGES.name.minLength)
      .max(NAME_MAX_LENGTH, VALIDATION_MESSAGES.name.maxLength),
    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.password.required)
      .min(PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES.password.minLength)
      .regex(/[a-z]/, VALIDATION_MESSAGES.password.lowercase)
      .regex(/[A-Z]/, VALIDATION_MESSAGES.password.uppercase)
      .regex(/[0-9]/, VALIDATION_MESSAGES.password.number),
    passwordConfirm: z.string().min(1, VALIDATION_MESSAGES.password.required),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: VALIDATION_MESSAGES.password.mismatch,
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.email(VALIDATION_MESSAGES.email.invalid),
  password: z.string().min(1, VALIDATION_MESSAGES.password.required),
});
