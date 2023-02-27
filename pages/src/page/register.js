import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as css  from "./register.css";

export default function App() {
  const formSchema = yup.object({
    name: yup
      .string()
      .required("성을 포함한 이름을 입력해주세요.")
      .min(2, "최소 2자 이상 가능합니다.")
      .max(5, "최대 5자 까지만 가능합니다."),
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .matches(
        /.+@.+\..+/g,
        "이메일 형식이 아닙니다."
      ),
    phone: yup
      .string()
      .required("전화번호를 입력해주세요.")
      .matches(
        /^[0-9]{11}$/g,
        "11자리를 모두 입력해주세요."
      )
      .max(11, "최대 11자리까지 입력 가능합니다."),
    check: yup
      .boolean()
      .oneOf([true], "회원가입을 위해 동의 부탁드립니다.")
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

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-12 md:pb-20 px-7 md:px-0">
      <div className="">
        <header className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">회원가입</h1>
        </header>

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">할인 정보를 드리기 위한,</h3>
            <p className="text-gray-600 pt-2"> 정보를 입력해주세요!</p>
          </section>

          <section className="mt-10">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {/* <InputComponent labelName="이름" inputType="text" inputId="name" /> */}
              <div className="pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                  이름
                </label>
                <input 
                  type="text" 
                  id={"name"} 
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" 
                  {...register("name")}
                />
              </div>
              <div>{errors.name && <p className="mt-1 text-sm text-pink-600">{errors.name.message}</p>}</div>
              <div className="mt-6 pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                  이메일
                </label>
                <input 
                  type="email" 
                  id={"email"} 
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" 
                  {...register("email")}
                />
              </div>
              <div>{errors.email && <p className="mt-1 text-sm text-pink-600">{errors.email.message}</p>}</div>
              <div className="mt-6 pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                  핸드폰
                </label>
                <input 
                  type="number" 
                  id={"phone"} 
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 invalid:border-pink-500 invalid:text-pink-600" 
                  {...register("phone")}
                />
              </div>
              <div>{errors.phone && <p className="mt-1 text-sm text-pink-600">{errors.phone.message}</p>}</div>
              <label className="mt-6 flex justify-end items-center space-x-2 cursor-pointer">
                <input 
                    type="checkbox"
                    id="check"
                    className="accent-purple-600"
                    {...register("check")}
                />
                <div className="text-sm text-purple-600 hover:text-purple-700 hover:underline"> 개인정보 수집 동의</div>
              </label>
              <div className="flex justify-end">{errors.check && <p className="mt-1 text-sm text-pink-600">{errors.check.message}</p>}</div>
                <button 
                  className="mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 text-white disabled:text-gray-500 font-bold py-2 rounded shadow-lg disabled:shadow-none hover:shadow-xl transition duration-200"
                  type="submit"
                  disabled={Object.keys(errors).length !== 0}
                >
                  가입하기
                </button>
            </form>
          </section>
        </main>

        <footer className="max-w-lg mx-auto flex justify-center text-white">
          <a href="#" className="hover:underline">
            인천광역시 공촌동 314
          </a>
          <span className="mx-3">•</span>
          <a href="#" className="hover:underline">
            세탁소
          </a>
        </footer>
      </div>
    </div>
  );
}
