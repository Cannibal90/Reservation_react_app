import { Grid, Paper, Table } from "@mui/material";
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
  }, []);

  return (
    <>
      <Paper className="mapContainer">
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
