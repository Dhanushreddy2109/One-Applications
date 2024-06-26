import React, { useEffect, useState } from "react";
import "../user/userdashboard.scss";

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

import {
  addJob,
  deleteJob,
  editJob,
  getJobs,
  getUsers,
} from "../../auth/api/loginapi";
import { toast } from "react-toastify";
import moment from "moment";

const AdminDashBoard = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [isOpen, setIsOpen] = useState({ isOpen: false });

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

  const handleGetUsers = async () => {
    try {
      const res = await getUsers();
      console.log(("data", res));
      setJobsData(res?.rows);
    } catch (e) {
      console.log("er->", e);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="user-wrapper">
      {" "}
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
                          //   onClick={() => {
                          //     setIsOpen({ isOpen: true, mode: false, item: app });
                          //   }}
                          className="cursor-pointer"
                        >
                          {" "}
                          <EditNoteRoundedIcon className="icon-editor-wrapper" />
                        </div>
                        <div
                          //   onClick={() => {
                          //     setAlertModal(app?.id);
                          //   }}
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
    </div>
  );
};

export default AdminDashBoard;
