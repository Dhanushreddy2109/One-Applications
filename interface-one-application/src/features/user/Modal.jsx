import React, { useState } from "react";
import { ModalBody, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { addJob, editJob } from "../../auth/api/loginapi";
import { toast } from "react-toastify";

const FormModal = ({ isOpen, data, toggle, handleGetJobsList }) => {
  console.log("date->", data?.item);
  const [form, setForm] = useState(
    !data?.mode
      ? {
          jobTitle: data?.item?.jobTitle,
          companyName: data?.item?.companyName,
          jobPlatform: data?.item?.jobPlatform,
          applicationDate: data?.item?.applicationDate
            ? new Date(data?.item?.applicationDate).toISOString().split("T")[0]
            : null,
          description: data?.item?.description,
          applicationStatus: data?.item?.applicationStatus,
          followUpDate: data?.item?.followUpDate
            ? new Date(data?.item?.followUpDate).toISOString().split("T")[0]
            : null,
          notes: data?.item?.notes,
        }
      : {
          jobTitle: "",
          companyName: "",
          jobPlatform: "",
          applicationDate: "",
          description: "",
          applicationStatus: "",
          followUpDate: "",
          notes: "",
        }
  );

  console.log("form->", !data?.mode, form);

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
    if (!form?.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!form?.companyName) newErrors.companyName = "Company is required";
    if (!form?.jobPlatform) newErrors.jobPlatform = "Platform is required";
    if (!form?.applicationDate)
      newErrors.applicationDate = "Application Date is required";
    if (!form?.applicationStatus)
      newErrors.applicationStatus = "Application Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (validate()) {
      if (data?.mode) {
        handleAddJob(form);
      } else {
        handleEditJob(form, data?.item?.id);
      }
    }
  };

  const handleAddJob = async (data) => {
    try {
      const res = await addJob(data);
      console.log(("data", res));
      handleGetJobsList();
      toast.success("Created successfully");
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };
  const handleEditJob = async (data, id) => {
    try {
      const res = await editJob(data, id);
      console.log(("data", res));
      handleGetJobsList();
      toast.success("Saved successfully");
      toggle();
    } catch (e) {
      console.log("er->", e);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {data?.mode ? "Add" : "Edit"} Application
        </ModalHeader>
        <ModalBody>
          <form className="add-application-wrapper" onSubmit={handleSubmit}>
            <div>
              <div className="mb-3">
                <label htmlFor="jobTitle" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  className="form-control"
                  id="jobTitle"
                  value={form?.jobTitle || ""}
                  onChange={handleChange}
                />
                {errors?.jobTitle && (
                  <div className="text-danger error-wrapper">
                    {errors.jobTitle}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  id="companyName"
                  value={form?.companyName || ""}
                  onChange={handleChange}
                />
                {errors?.companyName && (
                  <div className="text-danger error-wrapper">
                    {errors.companyName}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="jobPlatform" className="form-label">
                  Platform
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="jobPlatform"
                  id="jobPlatform"
                  value={form?.jobPlatform || ""}
                  onChange={handleChange}
                />
                {errors?.jobPlatform && (
                  <div className="text-danger error-wrapper">
                    {errors.jobPlatform}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="applicationDate" className="form-label">
                  Application Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="applicationDate"
                  id="applicationDate"
                  value={form?.applicationDate || null}
                  onChange={handleChange}
                />
                {errors?.applicationDate && (
                  <div className="text-danger error-wrapper">
                    {errors.applicationDate}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={form?.description || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="applicationStatus" className="form-label">
                  Application Status
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="applicationStatus"
                  value={form?.applicationStatus || null}
                  onChange={handleChange}
                >
                  <option selected>Select</option>
                  <option value="Applied">Applied</option>
                  <option value="Not Shortlisted">Not Shortlisted</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {errors?.applicationStatus && (
                  <div className="text-danger error-wrapper">
                    {errors.applicationStatus}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="followUpDate" className="form-label">
                  FollowUp Date
                </label>
                <input
                  type="date"
                  name="followUpDate"
                  className="form-control"
                  id="followUpDate"
                  value={form?.followUpDate || null}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <textarea
                  name="notes"
                  className="form-control"
                  id="notes"
                  value={form?.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            id="form-submit"
            class="application-button cancel-button"
            onClick={toggle}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            id="form-submit"
            class="application-button "
          >
            {data?.mode ? "Add" : "Edit"} Application
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FormModal;
