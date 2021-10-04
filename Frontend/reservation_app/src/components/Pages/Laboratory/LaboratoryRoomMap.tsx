import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LaboratoryResponse } from "../../../models/LaboratoryInterfaces";
import { LaboratoryService } from "../../../services/laboratory/LaboratoryService";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./LaboratoryRoomMap.css";

const LaboratoryRoomMap = () => {
  const [rooms, setRooms] = useState<LaboratoryResponse[]>();

  const laboratoryService = new LaboratoryService();

  const fetchAllRooms = () => {
    laboratoryService.getAllRooms().then((response) => {
      setRooms(response);
    });
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: "80%", margin: "20px auto" }}
      >
        <Typography variant="h3" component="div" className="title">
          Wybierz jedna z sal!
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border">Id</TableCell>
              <TableCell className="header border">Floor</TableCell>
              <TableCell className="header border">Room supervisor</TableCell>
              <TableCell className="header border">Desks</TableCell>
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
                    <Link to={`/classroom/${room.id}`}>
                      <ChevronRightIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LaboratoryRoomMap;
