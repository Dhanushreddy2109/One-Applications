import React, { useEffect, useState } from "react";
import "../user/userdashboard.scss";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getUsers } from "../../api/api/apis";
import moment from "moment";

const AdminDashBoard = () => {
  const [jobsData, setJobsData] = useState([]);

  const header = [
    "User Name",
    "Email",
    "Date Of Birth",
    "Phone Number",
    "Address",
    "Country",
    "Role",
  ];

  const handleGetUsers = async () => {
    try {
      const res = await getUsers();
      console.log(("data", res));
      setJobsData(res);
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
          <h4>Users</h4>

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
                {jobsData?.length ? (
                  jobsData?.map((app, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{app?.userName || "-"}</TableCell>
                      <TableCell>{app?.email || "-"}</TableCell>
                      <TableCell>
                        {app?.dateOfBirth
                          ? moment(app?.dateOfBirth).format("DD/MM/YY")
                          : "-"}
                      </TableCell>
                      <TableCell>{app?.phoneNumber || "-"}</TableCell>
                      <TableCell>{app?.address || "-"}</TableCell>
                      <TableCell>{app?.country || "-"}</TableCell>

                      <TableCell>{app?.role || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className="text-center">No Data Found</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashBoard;
