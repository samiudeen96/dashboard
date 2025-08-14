import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/authHook";
import toast from 'react-hot-toast';
import useUiStore from "../../store/uiStore";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {

  const { setTab } = useUiStore();
  const login = useLogin();
  const navigate = useNavigate();

  const initialData = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialData)

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    login.mutate(formData, {
      onSuccess: (data) => {
        toast.success("Login successfully")
        console.log("Logged data", data.user);

        navigate("/dashboard")

      },
      onError: (error) => {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
      }
    })
  }

  return (
    <div className="mt-6">
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        {/* <div className="text-end py-3">
          <Link to="/forgot-password" className="text-primary cursor-pointer underline text-sm">
            Forgot Password?
          </Link>
        </div> */}


        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="button_primary bg-primary hover:bg-primary transition"
          >
            Login
          </button>

        </div>
      </form>

      <p className="text-center my-6 text-sm">
        Not a member?{" "}
        <span
          className="text-primary cursor-pointer underline font-semibold"
          onClick={() => setTab("Signup")}
        >
          Signup{" "}
        </span>
        now
      </p>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <GoogleLoginButton />




    </div>
  );
};

export default Login;
