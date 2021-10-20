import { Button, Grid, List, ListItem, TextField } from "@mui/material";
import "./LaboratoryFormLayer.css";
import { useState } from "react";
import { LaboratoryService } from "../../services/laboratory/LaboratoryService";
import { LaboratoryRequest } from "../../models/LaboratoryInterfaces";

const LaboratoryFormLayer = (props: {
  floor: any;
  roomSupervisor: any;
  laboratoryId: any;
  loading: any;
  closeModal: any;
}) => {
  const [floor, setFloor] = useState(props.floor);
  const [roomSupervisor, setRoomSupervisor] = useState(props.roomSupervisor);

  const laboratoryService = new LaboratoryService();

  const onLaboratoryChange = () => {
    let newRequest = {
      floor: floor,
      roomSupervisor: roomSupervisor,
    } as LaboratoryRequest;

    if (!props.laboratoryId) {
      laboratoryService.createRoom(newRequest).then(() => {
        props.closeModal(false);
        props.loading();
      });
    } else {
      laboratoryService.updateRoom(newRequest, props.laboratoryId).then(() => {
        props.closeModal(false);
        props.loading();
      });
    }
  };

  return (
    <>
      <Grid container direction="column">
        <TextField
          className="pop-up-title"
          defaultValue="Reservation details"
          InputProps={{
            readOnly: true,
          }}
        />
        <List>
          <ListItem>
            <TextField
              label="Floor"
              value={floor}
              onChange={(event: any) => {
                setFloor(event.target.value);
              }}
            />
          </ListItem>

          <ListItem>
            <TextField
              label="Room supervisor"
              value={roomSupervisor}
              onChange={(event: any) => {
                setRoomSupervisor(event.target.value);
              }}
            />
          </ListItem>
        </List>
        <Button
          className="button-color"
          variant="contained"
          onClick={onLaboratoryChange}
        >
          {!props.laboratoryId ? "Create room" : "Change room"}
        </Button>
      </Grid>
    </>
  );
};

export default LaboratoryFormLayer;
