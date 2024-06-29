import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { editProfile, getProfile } from "../../api/api/apis";

const ProfileModal = ({ isOpen, toggle }) => {
  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form?.userName) newErrors.userName = "Name is required";
    if (!form?.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetConsultantData = async () => {
    try {
      const params = {};
      const res = await getProfile(params);
      console.log(("data", res));
      setForm(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleEditConsultant = async (data) => {
    try {
      const payload = {
        userName: form.userName,
        email: form.email,
        phoneNumber: form?.phoneNumber || "",
        dateOfBirth: form?.dateOfBirth || "",
        address: form?.address || "",
        country: form?.country || "",
        pinCode: form?.pinCode,
      };
      const res = await editProfile(payload);
      toast.success("Saved successfully");
      console.log(("data", res));
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      handleEditConsultant();
    }
  };

  useEffect(() => {
    handleGetConsultantData();
  }, []);

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader toggle={toggle}>Profile</ModalHeader>
      <ModalBody>
        <form className="add-application-wrapper">
          <div>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="userName"
                className="form-control"
                id="userName"
                value={form?.userName || ""}
                onChange={handleChange}
              />
              {errors?.userName && (
                <div className="text-danger error-wrapper">
                  {errors.userName}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={form?.email || ""}
                onChange={handleChange}
              />
              {errors?.email && (
                <div className="text-danger error-wrapper">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                id="phoneNumber"
                value={form?.phoneNumber || ""}
                onChange={handleChange}
              />
              {errors?.phoneNumber && (
                <div className="text-danger error-wrapper">
                  {errors.phoneNumber}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                id="dateOfBirth"
                value={form?.dateOfBirth || null}
                onChange={handleChange}
              />
              {errors?.expiryDate && (
                <div className="text-danger error-wrapper">
                  {errors.expiryDate}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="address"
                value={form?.address || ""}
                onChange={handleChange}
              />
              {errors?.address && (
                <div address="text-danger error-wrapper">{errors.address}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="form-control"
                id="country"
                value={form?.country || ""}
                onChange={handleChange}
              />
              {errors?.country && (
                <div className="text-danger error-wrapper">
                  {errors.country}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="number"
                name="pinCode"
                className="form-control"
                id="pinCode"
                value={form?.pinCode || ""}
                onChange={handleChange}
              />
              {errors?.pincode && (
                <div className="text-danger error-wrapper">
                  {errors.pincode}
                </div>
              )}
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          onClick={toggle}
          id="form-submit"
          class="application-button cancel-button"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          id="form-submit"
          class="application-button "
        >
          Edit Profile
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ProfileModal;
