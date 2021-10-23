import {
  Modal,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { LaboratoryService } from "../../services/laboratory/LaboratoryService";
import { ComputerStationResponse } from "../../models/StationInterfaces";
import StationFormLayer from "../StationFormLayer/StationFormLayer";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const ComputerAccordition = () => {
  const [stations, setStations] = useState<ComputerStationResponse[]>();
  const [selectedStation, setSelectedStation] = useState<any>({
    monitors: 0,
    headphones: false,
    microphone: false,
    operatingSystem: "",
    graphicCard: "",
    cpu: "",
    ram: 0,
    drive: 0,
    networkType: "",
    deskId: 0,
  });
  const [selectedId, setSelectedId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [desks, setDesks] = useState<any[]>();
  const [selectedDesk, setSelectedDesk] = useState<any>();

  const [rooms, setRooms] = useState<any[]>();
  const [selectedRoom, setSelectedRoom] = useState<any>();

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
  const openDrawer = () => {
    setOpen(true);
  };

  const onLoadingChange = () => {
    setLoading(!loading);
  };

  const fetchAllRooms = () => {
    laboratoryService.getAllRooms().then((response) => {
      if (response) {
        let roomsId = response.map((res) => {
          return res.id;
        });
        setRooms(roomsId);
      }
    });
  };

  const fetchAllDeskForRoom = (room: any) => {
    laboratoryService.getAllDesksForRoom(room).then((response) => {
      if (response) {
        let desksId = response.map((res) => {
          return res.id;
        });
        setDesks(desksId);
      }
    });
  };

  const fetchAllStationsForDesk = (desk: any) => {
    laboratoryService.getAllStationsForDesk(desk).then((response) => {
      setStations(response);
    });
  };

  const onStationDelete = (id: any) => {
    laboratoryService.deleteStationById(id).then(() => {
      fetchAllStationsForDesk(selectedDesk);
    });
  };

  const onStationEdit = (station: any) => {
    setSelectedId(station.id);
    setSelectedStation({
      monitors: station.monitors,
      headphones: station.headphones,
      microphone: station.microphone,
      operatingSystem: station.operatingSystem,
      graphicCard: station.graphicCard,
      cpu: station.cpu,
      ram: station.ram,
      drive: station.drive,
      networkType: station.networkType,
      deskId: selectedDesk,
    });
    openDrawer();
  };

  const onCreateStation = () => {
    setSelectedId(0);
    setSelectedStation({
      monitors: 0,
      headphones: false,
      microphone: false,
      operatingSystem: "",
      graphicCard: "",
      cpu: "",
      ram: 0,
      drive: 0,
      networkType: "",
      deskId: selectedDesk,
    });
    openDrawer();
  };

  const handleRoomSelect = (event: any) => {
    setSelectedRoom(event.target.value);
    fetchAllDeskForRoom(event.target.value);
  };

  const handleDeskSelect = (event: any) => {
    setSelectedDesk(event.target.value);
    fetchAllStationsForDesk(event.target.value);
  };

  useEffect(() => {
    fetchAllRooms();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDesk && selectedRoom) {
      fetchAllStationsForDesk(selectedDesk);
    }
  }, [loading]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button
        className="button-color"
        variant="contained"
        onClick={onCreateStation}
        disabled={selectedRoom && selectedDesk ? false : true}
      >
        + Add computer station
      </Button>

      <FormControl fullWidth style={{ marginTop: "20px" }}>
        <InputLabel>Choose a Laboratory room</InputLabel>
        <Select
          label="Choose a Laboratory room"
          value={selectedRoom}
          onChange={(event) => handleRoomSelect(event)}
        >
          {rooms &&
            rooms.map((r) => {
              return <MenuItem value={r}>{r}</MenuItem>;
            })}
        </Select>
        {!selectedRoom && (
          <FormHelperText>
            Choose laboratory room before add/update
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth style={{ marginTop: "20px" }}>
        <InputLabel>Choose a desk</InputLabel>
        <Select
          label="Choose a desk"
          value={selectedDesk}
          onChange={(event) => handleDeskSelect(event)}
        >
          {desks &&
            desks.map((r) => {
              return <MenuItem value={r}>{r}</MenuItem>;
            })}
        </Select>
        {!selectedDesk && (
          <FormHelperText>Choose desk before add/update</FormHelperText>
        )}
      </FormControl>

      <TableContainer
        component={Paper}
        style={{ width: "100%", margin: "20px auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border">Id</TableCell>
              <TableCell className="header border">Monitors</TableCell>
              <TableCell className="header border">Headphones</TableCell>
              <TableCell className="header border">Microphone</TableCell>
              <TableCell className="header border">Operating system</TableCell>
              <TableCell className="header border">Graphic card</TableCell>
              <TableCell className="header border">CPU</TableCell>
              <TableCell className="header border">RAM</TableCell>
              <TableCell className="header border">Drive</TableCell>
              <TableCell className="header border">Network Type</TableCell>

              <TableCell className="header border"></TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stations &&
              stations.map((station) => (
                <TableRow key={station.id} className="row">
                  <TableCell>{station.id}</TableCell>
                  <TableCell>{station.monitors}</TableCell>
                  <TableCell>
                    {station.headphones ? <CheckIcon /> : <ClearIcon />}
                  </TableCell>
                  <TableCell>
                    {station.microphone ? <CheckIcon /> : <ClearIcon />}
                  </TableCell>
                  <TableCell>{station.operatingSystem}</TableCell>
                  <TableCell>{station.graphicCard}</TableCell>
                  <TableCell>{station.cpu}</TableCell>
                  <TableCell>{station.ram}</TableCell>
                  <TableCell>{station.drive}</TableCell>
                  <TableCell>{station.networkType}</TableCell>

                  <TableCell align="right">
                    <DeleteIcon onClick={() => onStationDelete(station.id)} />
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon onClick={() => onStationEdit(station)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={closeDrawer}>
        <Paper className="pop-up">
          <StationFormLayer
            stationId={selectedId}
            station={selectedStation}
            closeModal={setOpen}
            loading={onLoadingChange}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default ComputerAccordition;
