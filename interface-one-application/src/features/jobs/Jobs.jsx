import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getJobsActive } from "../../api/api/apis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "Ireland",
    searchText: "Software Engineer",
  });
  const [searchData, setSearchData] = useState({});

  const getJobsData = async (data) => {
    try {
      const response = await getJobsActive(filters);
      setJobs(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getJobsData();
  }, [filters]);

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="d-flex ">
        <div className="search-wrapper mr-2 col-md-4 col-lg-3">
          <input
            type="text"
            placeholder="Job"
            onChange={(e) => {
              setSearchData((prev) => ({
                ...prev,
                searchText: e.target.value,
              }));
            }}
            id="searchText"
            name="searchKeyword"
            onkeypress="handle"
          />
        </div>
        <div
          style={{ marginLeft: "5px", marginRight: "5px" }}
          className="search-wrapper mr-2  col-md-4 col-lg-3"
        >
          <form id="search" action="#">
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => {
                setSearchData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }));
              }}
              id="searchText"
              name="searchKeyword"
              onkeypress="handle"
            />
          </form>
        </div>

        <button
          type="button"
          style={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={() => {
            setFilters({
              location: searchData?.location,
              searchText: searchData.searchText,
            });
          }}
          id="form-submit"
          className="application-button col-md-3 col-lg-2 mr-2"
        >
          Filter
        </button>
        <button
          type="button"
          id="form-submit"
          className="application-button col-md-3 col-lg-2 mr-2"
          style={{ background: "grey" }}
          onClick={() => {
            setFilters({
              location: "Ireland",
              searchText: "Software Engineer",
            });
          }}
        >
          Reset
        </button>
      </div>

      <Container className="mt-5">
        <Grid container spacing={3}>
          {jobs?.length ? (
            jobs?.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: "#f1f0fe", marginBottom: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h7"
                      component="div"
                      sx={{
                        color: "#7a6ad8",
                        fontWeight: 600,
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      {job?.company_name}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: "#7a6ad8",
                        fontWeight: 600,
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                      }}
                    >
                      {job?.title}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        fontSize: "14px",
                        color: "#4a4a4a",
                      }}
                      color="text.secondary"
                    >
                      {job?.company} - {job?.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      - {job?.via}
                    </Typography>
                    <Typography variant="body2">
                      <div className="d-flex align-items-center">
                        {job?.detected_extensions?.posted_at && (
                          <>
                            {" "}
                            <AccessTimeIcon fontSize="small" />{" "}
                            <span style={{ marginRight: "10px" }}>
                              {job?.detected_extensions?.posted_at}
                            </span>
                          </>
                        )}
                        <WorkIcon />
                        {"  "}
                        <span>{job?.detected_extensions?.schedule_type}</span>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <p className="text-center">No Data Found</p>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Jobs;
