import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { addConsultant, editConsultant } from "../../api/api/apis";
import moment from "moment";

const ConsultantModal = ({ isOpen, toggle, data, handleGetConsultantData }) => {
  const editData = !data?.mode
    ? {
        userName: data?.userName || "name",
        email: data?.email || "email",
        accessLevel: data?.item?.ConsultantAccesses?.[0]?.accessLevel || "Edit",
        expiryDate: data?.item?.ConsultantAccesses?.[0]?.expiryDate
          ? moment(data?.item?.ConsultantAccesses?.[0]?.expiryDate).format(
              "YYYY-MM-DD"
            )
          : "",
      }
    : {};
  const [form, setForm] = useState(editData);

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
    if (!form?.password && data?.mode)
      newErrors.password = "Password is required";
    if (!form?.confirmPassword && data?.mode)
      newErrors.confirmPassword = "Confirm Password Date is required";
    if (!form?.accessLevel) newErrors.accessLevel = "Access Level  is required";
    if (!form?.expiryDate) newErrors.expiryDate = "Expiry Date   is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditConsultant = async (newData) => {
    try {
      await editConsultant(newData, data?.item?.ConsultantAccesses?.[0]?.id);
      toast.success("Saved successfully");
      handleGetConsultantData();
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleAddConsultant = async (id) => {
    try {
      await addConsultant(id);
      toast.success("Added successfully");
      handleGetConsultantData();
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      if (!data?.mode) {
        handleEditConsultant({
          expiryDate: form?.expiryDate,
          accessLevel: form?.accessLevel,
        });
      } else {
        handleAddConsultant(form);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader toggle={toggle}>Consultant</ModalHeader>
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
                disabled={!data?.mode}
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
                disabled={!data?.mode}
                onChange={handleChange}
              />
              {errors?.email && (
                <div className="text-danger error-wrapper">{errors.email}</div>
              )}
            </div>
            {!!data?.mode && (
              <>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={form?.password || ""}
                    onChange={handleChange}
                  />
                  {errors?.password && (
                    <div className="text-danger error-wrapper">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={form?.confirmPassword || null}
                    onChange={handleChange}
                  />
                  {errors?.confirmPassword && (
                    <div className="text-danger error-wrapper">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="accessLevel" className="form-label">
                accessLevel
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="accessLevel"
                value={form?.accessLevel || null}
                onChange={handleChange}
              >
                <option selected>Select</option>
                <option value="Edit">Edit</option>
                <option value="View">View</option>
              </select>
              {errors?.accessLevel && (
                <div className="text-danger error-wrapper">
                  {errors.accessLevel}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                className="form-control"
                id="expiryDate"
                value={form?.expiryDate || null}
                onChange={handleChange}
              />
              {errors?.expiryDate && (
                <div className="text-danger error-wrapper">
                  {errors.expiryDate}
                </div>
              )}
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          type="submit"
          id="form-submit"
          onClick={toggle}
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
          {!data?.mode ? "Edit" : "Add"}Consultant
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConsultantModal;
