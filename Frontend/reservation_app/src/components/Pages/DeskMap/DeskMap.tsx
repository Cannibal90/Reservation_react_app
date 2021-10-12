import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DeskResponse } from "../../../models/DeskInterfaces";
import { LaboratoryService } from "../../../services/laboratory/LaboratoryService";
import "./DeskMap.css";
import Desk from "../../Desk/Desk";

const DeskMap = () => {
  const params = useParams() as any;
  const [desks, setDesks] = useState<DeskResponse[]>();
  const laboratoryService = new LaboratoryService();

  const fetchAllDesks = () => {
    laboratoryService.getAllDesksForRoom(params.id).then((result) => {
      setDesks(result);
    });
  };

  useEffect(() => {
    fetchAllDesks();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Paper className="mapContainer">
        <h2 className="mapTitle">
          Choose Computer Station to make reservation
        </h2>
        <Grid container spacing={0} justifyContent="left">
          {desks &&
            desks.map((desk) => {
              return <Desk desk={desk} />;
            })}
        </Grid>
        <Grid container spacing={0} style={{ marginTop: "300px" }}></Grid>
      </Paper>
    </>
  );
};

export default DeskMap;
