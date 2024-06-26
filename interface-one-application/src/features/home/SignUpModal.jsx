import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { postSignUp } from "../../auth/api/loginapi";
import { toast } from "react-toastify";

const SignUpModal = ({ isOpen, toggle, signIn }) => {
  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createAccount = async () => {
    try {
      const data = await postSignUp(form);
      console.log("user->", data);
      setForm({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      toast.success("Successfully account created");
      signIn();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form?.userName) toast.error("Name is required");
    if (!form?.email) toast.error("Email is required");
    if (!form?.password) toast.error("Password is required");
    if (!form?.confirmPassword || form?.confirmPassword !== form?.password)
      toast.error("Confirm Password Date is required or not matching");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    console.log("vaa->", validate());
    if (validate()) {
      createAccount();
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
                  <h2 style={{ color: "white" }}>Sign Up</h2>
                </fieldset>
              </div>
              <form id="contact-form">
                <div class="row">
                  <div class="col-lg-12">
                    <fieldset>
                      <input
                        type="name"
                        name="userName"
                        id="name"
                        value={form?.userName || ""}
                        onChange={handleChange}
                        placeholder="Your Name..."
                        required
                      />
                    </fieldset>
                  </div>
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
                  <div class="col-lg-12">
                    <fieldset>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form?.confirmPassword || ""}
                        onChange={handleChange}
                        placeholder="Your Confirm Password..."
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
                        Sign Up
                      </button>
                    </fieldset>
                  </div>
                  <p className="toggle-signup-color">
                    Already have an account?{" "}
                    <button onClick={signIn}>Sign In</button>
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

export default SignUpModal;
