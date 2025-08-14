import { useState } from "react";
import { useRegister } from "../../hooks/authHook";
import toast from 'react-hot-toast';
import useUiStore from "../../store/uiStore";

const Register = () => {

  const { setTab } = useUiStore();
  const register = useRegister();

  const initialData = {
    firstName: '',
    lastName: '',
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

    register.mutate(formData, {
      onSuccess: () => {
        toast.success("Registered Successfully")
        setTab("Login")
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="label">First name</label>
              <input
                id="firstName"
                type="text"
                className="input"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="label">Last name</label>
              <input
                id="lastName"
                type="text"
                className="input"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
              />
            </div>

          </div>

          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Enter your email"
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

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="button_primary bg-primary w-fit hover:bg-primary transition"
            >
              Signup
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-[#785bf8] cursor-pointer underline font-semibold"
            onClick={() => setTab("Login")}
          >
            login{" "}
          </span>
          now
        </p>
      </form>
    </div>
  );
};

export default Register;
