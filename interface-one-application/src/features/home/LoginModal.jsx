import React, { useState } from "react";

import { Modal, ModalBody } from "reactstrap";
import { toast } from "react-toastify";
import { loginApi, postLogin } from "../../auth/api/loginapi";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, toggle, signUp }) => {
  const [form, setForm] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form?.email) toast.error("Email is required");
    if (!form?.password) toast.error("Password is required");

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      const userData = await loginApi({
        email: form?.email,
        password: form?.password,
      });
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      login();
      toast.success("Login successfully");
      toggle();
      if (userData?.role === "Admin") navigate("/admindashboard");
      else navigate("/interview");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.error("Error fetching user data:", error?.error);
    }
  };
  const handleSubmit = () => {
    if (validate()) {
      handleLogin();
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalBody className="signin-modal-wrapper">
        <form className="add-application-wrapper">
          <div class="contact-us sign-in-wrapper">
            <div class="contact-us-content">
              <div class="col-lg-12 text-center mb-4 signin-header-wrapper">
                <fieldset>
                  <h2 style={{ color: "white" }}>Sign In</h2>
                </fieldset>
              </div>
              <form id="contact-form" action="" method="post">
                <div class="row">
                  <div class="col-lg-12">
                    <fieldset>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form?.email || ""}
                        onChange={handleChange}
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your E-mail..."
                        required
                      />
                    </fieldset>
                  </div>
                  <div class="col-lg-12">
                    <fieldset>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={form?.password || ""}
                        onChange={handleChange}
                        placeholder="Your Password..."
                        required
                      />
                    </fieldset>
                  </div>
                  <div class="col-lg-12 text-end">
                    <fieldset>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        id="form-submit"
                        class="orange-button"
                      >
                        Sign In
                      </button>
                    </fieldset>
                  </div>
                  <p className="toggle-signup-color">
                    Not have an account?{" "}
                    <button onClick={signUp}>Sign Up</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
