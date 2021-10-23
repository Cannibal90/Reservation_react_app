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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { LaboratoryResponse } from "../../models/LaboratoryInterfaces";
import { LaboratoryService } from "../../services/laboratory/LaboratoryService";
import LaboratoryFormLayer from "../LaboratoryFormLayer/LaboratoryFormLayer";

const LaboratoryAccordition = () => {
  const [rooms, setRooms] = useState<LaboratoryResponse[]>();
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
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
  const openDrawer = () => {
    setOpen(true);
  };

  const onLoadingChange = () => {
    setLoading(!loading);
  };

  const fetchAllRooms = () => {
    laboratoryService.getAllRooms().then((response) => {
      setRooms(response);
    });
  };

  const onLaboratoryDelete = (id: any) => {
    laboratoryService.deleteLaboratoryById(id).then(() => {
      fetchAllRooms();
    });
  };

  const onEditLaboratory = (laboratory: any) => {
    setSelectedId(laboratory.id);
    setSelectedSupervisor(laboratory.roomSupervisor);
    setSelectedFloor(laboratory.floor);
    openDrawer();
  };

  const onCreateLaboratory = (laboratory: any) => {
    setSelectedId(0);
    setSelectedSupervisor("");
    setSelectedFloor(0);
    openDrawer();
  };

  useEffect(() => {
    fetchAllRooms();
  }, [loading]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button
        className="button-color"
        variant="contained"
        onClick={onCreateLaboratory}
      >
        + Add room
      </Button>
      <TableContainer
        component={Paper}
        style={{ width: "100%", margin: "20px auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border">Id</TableCell>
              <TableCell className="header border">Floor</TableCell>
              <TableCell className="header border">Room supervisor</TableCell>
              <TableCell className="header border">Desk count</TableCell>

              <TableCell className="header border"></TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rooms &&
              rooms.map((room) => (
                <TableRow key={room.id} className="row">
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.roomSupervisor}</TableCell>
                  <TableCell>{room.deskCount}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon onClick={() => onLaboratoryDelete(room.id)} />
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon onClick={() => onEditLaboratory(room)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={closeDrawer}>
        <Paper className="pop-up">
          <LaboratoryFormLayer
            floor={selectedFloor}
            roomSupervisor={selectedSupervisor}
            laboratoryId={selectedId}
            closeModal={setOpen}
            loading={onLoadingChange}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default LaboratoryAccordition;
