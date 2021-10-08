import { Drawer, Paper } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import "./Desk.css";
import { useEffect, useState } from "react";
import { ComputerStationResponse } from "../../models/StationInterfaces";
import { LaboratoryService } from "../../services/laboratory/LaboratoryService";
import ComputerStation from "../ComputerStation/ComputerStation";

const Desk = (props: { desk: any }) => {
  const [stations, setStations] = useState<ComputerStationResponse[]>();
  const [selectedStation, setSelectedStation] =
    useState<ComputerStationResponse>();
  const [open, setOpen] = useState<boolean>(false);

  const laboratoryService = new LaboratoryService();

  const closeDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const openDrawer = (station: any) => {
    setSelectedStation(station as ComputerStationResponse);
    setOpen(true);
  };

  const fetchAllStations = () => {
    laboratoryService.getAllStationsForDesk(props.desk.id).then((result) => {
      setStations(result);
    });
  };

  useEffect(() => {
    fetchAllStations();
  }, []);

  return (
    <>
      <Paper className="desk" variant="outlined" square>
        {stations &&
          stations.map((station) => {
            return (
              <div className="icon-container">
                <ComputerIcon
                  className="station"
                  onClick={() => openDrawer(station)}
                />
                <h4 className="icon-caption">ID: {station.id}</h4>
              </div>
            );
          })}
      </Paper>
      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Paper className="drawer-container">
          <ComputerStation station={selectedStation} />
        </Paper>
      </Drawer>
    </>
  );
};

export default Desk;
