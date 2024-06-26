import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  addConsultant,
  editConsultant,
  getConsultant,
} from "../../auth/api/loginapi";

const ConsultantModal = ({ isOpen, toggle }) => {
  const [form, setForm] = useState({});
  const [consultantData, setConsultantData] = useState(null);
  const [isConsultantAvailble, setIsConsultsntAvailble] = useState(false);

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
    if (!form?.userName && !isConsultantAvailble)
      newErrors.userName = "Name is required";
    if (!form?.email && !isConsultantAvailble)
      newErrors.email = "Email is required";
    if (!form?.password && !isConsultantAvailble)
      newErrors.password = "Password is required";
    if (!form?.confirmPassword && !isConsultantAvailble)
      newErrors.confirmPassword = "Confirm Password Date is required";
    if (!form?.accessLevel) newErrors.accessLevel = "Access Level  is required";
    if (!form?.expiryDate) newErrors.expiryDate = "Expiry Date   is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetConsultantData = async () => {
    try {
      const params = {};
      const res = await getConsultant(params);
      console.log(("data", res));
      setIsConsultsntAvailble(!!res?.userName);
      if (!!res?.userName)
        toast.warning(
          "You don't have any consultant, please create if you want.! "
        );

      setConsultantData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleEditConsultant = async (data) => {
    try {
      const res = await editConsultant(data);
      toast.success("Saved successfully");
      console.log(("data", res));
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleAddConsultant = async (id) => {
    try {
      const res = await addConsultant(id);
      toast.success("Added successfully");
      console.log(("data", res));
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      if (isConsultantAvailble) {
        handleEditConsultant({
          expiryDate: form?.expiryDate,
          accessLevel: form?.accessLevel,
        });
      } else {
        handleAddConsultant(form);
      }
    }
  };

  useEffect(() => {
    handleGetConsultantData();
  }, []);

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
                disabled={isConsultantAvailble}
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
                disabled={isConsultantAvailble}
                onChange={handleChange}
              />
              {errors?.email && (
                <div className="text-danger error-wrapper">{errors.email}</div>
              )}
            </div>
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
                disabled={isConsultantAvailble}
                onChange={handleChange}
              />
              {errors?.password && (
                <div className="text-danger error-wrapper">
                  {errors.password}
                </div>
              )}
            </div>
            {!isConsultantAvailble && (
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
          {isConsultantAvailble ? "Edit" : "Add"}Consultant
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConsultantModal;
