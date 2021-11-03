import { Grid, Paper } from "@mui/material";
import React from "react";
import ManagementOption from "../../ManagementOption/ManagementOption";
import "./ManagementPage.css";

const ManagementPage = () => {
  const options = [
    {
      option: "Users",
      link: "/management/users",
    },
    {
      option: "Laboratory",
      link: "/management/laboratory",
    },
    {
      option: "Reservations",
      link: "/management/reservations",
    },
  ];

  return (
    <>
      <Paper className="managementContainer">
        <h2 className="managementTitle">Choose section to manage</h2>
        <Grid container spacing={1} className="gridContainer">
          {options.map((item) => {
            return (
              <Grid item xl={3} lg={3} md={4} sm={6} xs={9}>
                <ManagementOption option={item.option} link={item.link} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};

export default ManagementPage;
