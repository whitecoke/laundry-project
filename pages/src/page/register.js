import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function App() {
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);

  // const cn_border = "rounded-md border-none bg-indigo-500 text-white p-3 m-5";
  const cn_border = "mt-3 mb-3 p-5 border shadow-sm border-slate-300 placeholder-slate-100 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 bg-indigo-500";

  return (
    <div className="App flex flex-col text-white">
      <div>
        <h1 className="underline">React Input Test!</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className={cn_border}
              name="email"
              placeholder="이메일"
              {...register("email")}
            />
          </div>
          <div>{errors.email && <p>{errors.email.message}</p>}</div>
          <div>
            <input
              className={cn_border}
              type="password"
              name="password"
              placeholder="비밀번호"
              {...register("password")}
            />
          </div>
          <div>{errors.password && <p>{errors.password.message}</p>}</div>
          <div>
            <input
              className={cn_border}
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm")}
            />
          </div>
          <div>
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          </div>
          <div>
            <input
              className={cn_border}
              type="submit"
              disabled={errors || watch()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
