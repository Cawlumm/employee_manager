import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

import { ReactComponent as Error } from "../../src/assets/error.svg";
const Authentication = () => {
  // State and hooks
  const navigate = useNavigate();
  const { registerUser, loginUser } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

    // Function to display a message with a given type
    const displayMessage = (type, message, duration = 3000) => {
      setMessage({ type, message });
      setTimeout(() => setMessage(""), duration);
    };

  // Form fields configuration
  const formFields = [
    { name: "username", label: "Username", type: "both" },
    { name: "password", label: "Password", type: "both" },
    { name: "confirmPassword", label: "Confirm Password", type: "register" },
    { name: "fullName", label: "Full Name", type: "register" },
    { name: "email", label: "Email", type: "register" },
  ];

  // Helper function to check if a value is empty
  const isEmpty = (value) => value.trim() === "";

  // Helper function to check if an email is valid
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation logic for the form
  const validateForm = () => {
    const validationErrors = {};

    if (isEmpty(formData.username)) {
      validationErrors.username = "Please enter a username";
    }
    if (isEmpty(formData.password)) {
      validationErrors.password = "Please enter a password";
    }

    if (mode === "register") {
      if (isEmpty(formData.fullName)) {
        validationErrors.fullName = "Please enter a name";
      }
      if (isEmpty(formData.email)) {
        validationErrors.email = "Please provide an email";
      } else if (!isValidEmail(formData.email)) {
        validationErrors.email = "Invalid email format";
      }
      if (formData.password !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match.";
      }
    }

    return validationErrors;
  };

  // Login logic
  const handleLogin = async () => {
    setMessage("");

    // Handle login logic
    const user = {
      username: formData.username,
      password: formData.password,
    };
    const response = await loginUser(user);
    // Add any necessary logic after login
    if (response.ok) {
      displayMessage("success", response.message);
      navigate("/");
    } else {
      displayMessage("error", response.message);
    }
  };
  
  // Register logic
  const handleRegister = async () => {
    // Handle register logic
    const user = {
      username: formData.username,
      password: formData.password,
      fullname: formData.fullName,
      email: formData.email,
    };
    const response = await registerUser(user);

    if (response.ok) {
      setMode("login");
    } else {
      alert("Registration failed. Please check your details and try again.");
    }
  };
  
  // Form submission handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Perform validation logic
      const validationErrors = validateForm();
      setErrors(validationErrors);

      // Start loading
      setLoading(true);

      // If there are validation errors, stop the form submission
      if (Object.keys(validationErrors).length > 0) {
        setLoading(false);
        return;
      }

      // Continue with form submission logic based on the mode
      if (mode === "login") {
        await handleLogin();
      } else {
        await handleRegister();
      }
      //Stop loading after successful submission
      setLoading(false);
    },
    [formData, mode, handleRegister, handleLogin, validateForm]
  );
 
  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex login-container w-screen h-screen">
      <div className="p-4 flex flex-col bg-gray-200 w-full max-w-[300px]">
        <div className="p-2 text-blue-500 text-lg hover:text-blue-700 hover:bg-gray-300 cursor-pointer">
          <Link to="/">Home</Link>
        </div>
        <div
          className="p-2 text-blue-500 text-lg hover:text-blue-700 hover:bg-gray-300 cursor-pointer"
          onClick={() => setMode("login")}
        >
          Login
        </div>
        <div
          className="p-2 text-blue-500 text-lg hover:text-blue-700 hover:bg-gray-300 cursor-pointer"
          onClick={() => setMode("register")}
        >
          Register
        </div>
      </div>
      <div className="flex flex-col sm:p-6 sm:px-20 sm:m-0 m-3 px-0  p-0 w-full">
        <div className="text-4xl py-2">
          {mode === "login" ? "Login" : "Register"}
        </div>
        {message && <div className={`text-${message.type === "success" ? "green" : "red"}-500 py-2 mb-4`}>{message.message}</div>}
        <form
          className="flex flex-col text-gray-500 text-2xl"
          onSubmit={handleSubmit}
        >
          {formFields.map(
            (field) =>
              (field.type === "both" || field.type === mode) && (
                <div key={field.name} className="flex flex-col mb-4">
                  <label htmlFor={field.name} className="text-lg">
                    {field.label}
                  </label>
                  <input
                    type={
                      field.name === "password" ||
                      field.name === "confirmPassword"
                        ? "password"
                        : "text"
                    }
                    value={formData[field.name] || ""}
                    name={field.name}
                    onChange={handleChange}
                    className="h-12 border border-stone-200 mt-1 max-w-[300px]"
                  />
                  {errors[field.name] && (
                    <div className="flex flex-row mt-1 items-center">
                      <Error />
                      <p className="text-red-500 sm:text-xl text-sm pl-2">{errors[field.name]}</p>
                    </div>
                  )}
                </div>
              )
          )}
          <div className="flex">
            <button
              type="submit"
              className={`bg-gray-500 text-whitesmoke px-4 mx-4 py-2 shadow ${
                loading ? "opacity-75 cursor-wait" : "cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
            </button>
            <button className="bg-gray-500 text-whitesmoke px-4 mx-4 py-2 shadow">
              <Link to="/">Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
