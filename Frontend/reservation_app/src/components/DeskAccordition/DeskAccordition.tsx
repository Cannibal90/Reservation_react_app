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
import { DeskResponse } from "../../models/DeskInterfaces";
import DeskFormLayer from "../DeskFormLayer/DeskFormLayer";

const LaboratoryAccordition = () => {
  const [desks, setDesks] = useState<DeskResponse[]>();
  const [selectedDeskType, setSelectedDeskType] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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

  const fetchAllDeskForRoom = (room: any) => {
    laboratoryService.getAllDesksForRoom(room).then((response) => {
      setDesks(response);
    });
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

  const onDeskDelete = (id: any) => {
    laboratoryService.deleteDeskById(id).then(() => {
      fetchAllDeskForRoom(selectedRoom);
    });
  };

  const onEditDesk = (desk: any) => {
    setSelectedId(desk.id);
    setSelectedDeskType(desk.deskType);
    setSelectedRoom(selectedRoom);
    openDrawer();
  };

  const onCreateDesk = () => {
    setSelectedId(0);
    setSelectedDeskType("");
    setSelectedRoom(selectedRoom);
    openDrawer();
  };

  const handleSelect = (event: any) => {
    setSelectedRoom(event.target.value);
    fetchAllDeskForRoom(event.target.value);
  };

  useEffect(() => {
    fetchAllRooms();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button
        className="button-color"
        variant="contained"
        onClick={onCreateDesk}
        disabled={selectedRoom ? false : true}
      >
        + Add desk
      </Button>

      <FormControl fullWidth style={{ marginTop: "20px" }}>
        <InputLabel>Choose a Laboratory room</InputLabel>
        <Select
          label="Choose a Laboratory room"
          value={selectedRoom}
          onChange={(event) => handleSelect(event)}
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

      <TableContainer
        component={Paper}
        style={{ width: "100%", margin: "20px auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border">Id</TableCell>
              <TableCell className="header border">Desk type</TableCell>
              <TableCell className="header border">Stations count</TableCell>

              <TableCell className="header border"></TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {desks &&
              desks.map((desk) => (
                <TableRow key={desk.id} className="row">
                  <TableCell>{desk.id}</TableCell>
                  <TableCell>{desk.deskType}</TableCell>
                  <TableCell>{desk.stationsCount}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon onClick={() => onDeskDelete(desk.id)} />
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon onClick={() => onEditDesk(desk)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={closeDrawer}>
        <Paper className="pop-up">
          <DeskFormLayer
            deskId={selectedId}
            roomId={selectedRoom}
            deskType={selectedDeskType}
            closeModal={setOpen}
            loading={onLoadingChange}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default LaboratoryAccordition;
