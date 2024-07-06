import React, { useEffect, useState } from "react";
import "../user/userdashboard.scss";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
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
import AlertModal from "../user/AlertModal";
import { deleteJob, getConsultantList } from "../../api/api/apis";
import { toast } from "react-toastify";
import moment from "moment";
import ConsultantModal from "../home/ConsultantModal";

const Consultant = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [consultantData, setConsultantData] = useState([]);
  const [modal, setModal] = useState(false);

  const header = [
    "User Name",
    "Email",
    "Date Of Birth",
    "Phone Number",
    "Address",
    "Country",
    "Action",
  ];
  const handleGetConsultantData = async () => {
    try {
      const res = await getConsultantList();
      console.log(("data", res));
      setConsultantData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const res = await deleteJob(id);
      handleGetConsultantData();
      setAlertModal(false);
      toast.success("Deleted successfully");
      console.log(("data", res));
    } catch (e) {
      console.log("er->", e);
    }
  };

  useEffect(() => {
    handleGetConsultantData();
  }, []);

  const onConfirm = () => {
    handleDeleteJob(alertModal);
  };
  const onCancel = () => {
    setAlertModal(false);
  };
  return (
    <div className="user-wrapper">
      {" "}
      <Divider />
      <div className="filter-wrapper row">
        <div className="  col-md-4 col-lg-3" style={{ fontWeight: 600 }}>
          Consultant
        </div>

        <button
          type="button"
          onClick={() => {
            setModal({ isOpen: true, mode: true });
          }}
          id="form-submit"
          className="application-button col-md-3 col-lg-2"
        >
          Add Consultant
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
                {consultantData ? (
                  consultantData?.map((app, index) => (
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
                      <TableCell className="d-flex">
                        <div
                          onClick={() => {
                            setModal({
                              isOpen: true,
                              mode: false,
                              item: app,
                            });
                          }}
                          className="cursor-pointer"
                        >
                          {" "}
                          <EditNoteRoundedIcon className="icon-editor-wrapper" />
                        </div>
                      </TableCell>
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
      {modal?.isOpen && (
        <ConsultantModal
          isOpen={modal?.isOpen}
          toggle={() => {
            setModal(false);
          }}
          data={modal}
          handleGetConsultantData={handleGetConsultantData}
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

export default Consultant;
