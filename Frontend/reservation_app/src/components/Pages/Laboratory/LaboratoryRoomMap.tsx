import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LaboratoryResponse } from "../../../models/LaboratoryInterfaces";
import { LaboratoryService } from "../../../services/laboratory/LaboratoryService";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./LaboratoryRoomMap.css";

const LaboratoryRoomMap = () => {
  const [rooms, setRooms] = useState<LaboratoryResponse[]>();
  const [floor, setFloor] = useState<any>(-1);
  const [options, setOptions] = useState<number[]>([0, 1, 2]);

  const laboratoryService = new LaboratoryService();

  const fetchAllRooms = () => {
    laboratoryService.getAllRooms().then((response) => {
      setRooms(response);
    });
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const handleChange = (event: any) => {
    if (event.target.value === -1) {
      setOptions([0, 1, 2]);
    } else {
      setOptions([event.target.value]);
    }
    setFloor(event.target.value);
  };

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
              <TableCell className="header border">
                Floor
                <Select value={floor} onChange={(event) => handleChange(event)}>
                  <MenuItem value={-1}>All</MenuItem>
                  <MenuItem value={0}>Ground</MenuItem>
                  <MenuItem value={1}>First</MenuItem>
                  <MenuItem value={2}>Second</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="header border">Room supervisor</TableCell>
              <TableCell className="header border">Desks</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rooms &&
              rooms
                .filter((r) => options.includes(r.floor))
                .map((room) => (
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
