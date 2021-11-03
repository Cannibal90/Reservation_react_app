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
  FormControl,
  InputLabel,
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
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

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
      <TableContainer component={Paper} className="laboratoryContainer">
        <Typography component="div" className="title">
          Choose one of Laboratory rooms!
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border">Id</TableCell>
              <TableCell className="header border">
                <FormControl fullWidth>
                  <InputLabel style={{ fontWeight: 600, fontSize: "20px" }}>
                    Floor
                  </InputLabel>
                  <Select
                    label="Floor__"
                    value={floor}
                    onChange={(event) => handleChange(event)}
                  >
                    <MenuItem className="floorSelect" value={-1}>
                      All
                    </MenuItem>
                    <MenuItem className="floorSelect" value={0}>
                      Ground
                    </MenuItem>
                    <MenuItem className="floorSelect" value={1}>
                      First
                    </MenuItem>
                    <MenuItem className="floorSelect" value={2}>
                      Second
                    </MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell className="header border">Room supervisor</TableCell>
              <TableCell className="header border">Desks</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rooms &&
              rooms
                // .filter((r) => options.includes(r.floor))
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
