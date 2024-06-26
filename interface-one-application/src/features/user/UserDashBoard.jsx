import React, { useEffect, useState } from "react";
import "./userdashboard.scss";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import {
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormModal from "./Modal";
import AlertModal from "./AlertModal";
import { addJob, deleteJob, editJob, getJobs } from "../../auth/api/loginapi";
import { toast } from "react-toastify";
import moment from "moment";

const UserDashBoard = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [isOpen, setIsOpen] = useState({ isOpen: false });

  const toggle = () => {
    setIsOpen({ isOpen: false });
  };

  const header = [
    "Job Title",
    "Company Name",
    "Platform",
    "Application Date",
    "Description",
    "Status",
    "FollowUp Date",
    "Notes",
    "Action",
  ];

  const handleGetJobsList = async () => {
    try {
      const params = {};
      if (activeStatus) {
        params.applicationStatus = activeStatus;
      }
      console.log("params->", params);
      const res = await getJobs(params);
      console.log(("data", res));
      setJobsData(res?.rows);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const res = await deleteJob(id);
      handleGetJobsList();
      setAlertModal(false);
      toast.success("Deleted successfully");
      console.log(("data", res));
    } catch (e) {
      console.log("er->", e);
    }
  };

  useEffect(() => {
    handleGetJobsList();
  }, [activeStatus]);

  const onConfirm = () => {
    console.log("modal->", alertModal);
    handleDeleteJob(alertModal);
  };
  const onCancel = () => {
    setAlertModal(false);
  };

  return (
    <div className="user-wrapper">
      {" "}
      <ul className="event_filter">
        <li>
          <span
            className={`cursor-pointer ${activeStatus === "" && "bar-active"}`}
            onClick={() => {
              setActiveStatus("");
            }}
          >
            All
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "Applied" && "bar-active"
            }`}
            onClick={() => {
              setActiveStatus("Applied");
            }}
          >
            Applied
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "Not Shortlisted" && "bar-active"
            }`}
            onClick={() => {
              setActiveStatus("Not Shortlisted");
            }}
          >
            Not Shortlisted
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "InProgress" && "bar-active"
            }`}
            onClick={() => {
              setActiveStatus("InProgress");
            }}
          >
            InProgress
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              setActiveStatus("Rejected");
            }}
            className={`cursor-pointer ${
              activeStatus === "Rejected" && "bar-active"
            }`}
          >
            Rejected
          </span>
        </li>
      </ul>
      <Divider />
      <div className="filter-wrapper row">
        <div className="search-wrapper  col-md-4 col-lg-3">
          <form id="search" action="#">
            <input
              type="text"
              placeholder="Search"
              id="searchText"
              name="searchKeyword"
              onkeypress="handle"
            />
            <SearchIcon />
          </form>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsOpen({ isOpen: true, mode: true });
          }}
          id="form-submit"
          className="application-button col-md-3 col-lg-2"
        >
          Add Application
        </button>
      </div>
      <Card style={{ marginTop: "2rem", backgroundColor: "#ffffff" }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {header?.map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsData &&
                  jobsData?.map((app, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{app?.jobTitle || "-"}</TableCell>
                      <TableCell>{app?.companyName || "-"}</TableCell>
                      <TableCell>{app?.jobPlatform || "-"}</TableCell>
                      <TableCell>
                        {app?.applicationDate
                          ? moment(app?.applicationDate).format("DD/MM/YY")
                          : "-"}
                      </TableCell>
                      <TableCell>{app?.description || "-"}</TableCell>
                      <TableCell>{app?.applicationStatus || "-"}</TableCell>
                      <TableCell>
                        {app?.followUpDate
                          ? moment(app?.followUpDate).format("DD/MM/YY")
                          : "-"}
                      </TableCell>
                      <TableCell>{app?.notes || "-"}</TableCell>
                      <TableCell className="d-flex">
                        <div
                          onClick={() => {
                            setIsOpen({ isOpen: true, mode: false, item: app });
                          }}
                          className="cursor-pointer"
                        >
                          {" "}
                          <EditNoteRoundedIcon className="icon-editor-wrapper" />
                        </div>
                        <div
                          onClick={() => {
                            setAlertModal(app?.id);
                          }}
                          className="cursor-pointer"
                        >
                          <DeleteSweepRoundedIcon color="error" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {isOpen?.isOpen && (
        <FormModal
          isOpen={isOpen?.isOpen}
          data={isOpen}
          toggle={toggle}
          handleGetJobsList={handleGetJobsList}
        />
      )}
      {!!alertModal && (
        <AlertModal
          isOpen={!!alertModal}
          toggle={() => {
            setAlertModal(false);
          }}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default UserDashBoard;
