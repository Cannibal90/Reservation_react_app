import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./DeskFormLayer.css";
import { useState } from "react";
import { LaboratoryService } from "../../services/laboratory/LaboratoryService";
import { DeskRequest } from "../../models/DeskInterfaces";
import { AnyAaaaRecord } from "dns";

const DeskFormLayer = (props: {
  roomId: any;
  deskId: any;
  deskType: any;
  loading: any;
  closeModal: any;
}) => {
  const [room, setRoom] = useState(props.roomId);
  const [deskType, setDeskType] = useState(props.deskType);

  const laboratoryService = new LaboratoryService();

  const handleSelect = (event: any) => {
    setDeskType(event.target.value);
  };

  const onDeskChange = () => {
    let newRequest = {
      deskType: deskType,
      roomId: room,
    } as DeskRequest;

    if (!props.deskId) {
      laboratoryService.createDesk(newRequest).then(() => {
        props.closeModal(false);
        props.loading();
      });
    } else {
      laboratoryService.updateDesk(newRequest, props.deskId).then(() => {
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
          defaultValue="Desk details"
          InputProps={{
            readOnly: true,
          }}
        />
        <List>
          <ListItem>
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <InputLabel>Choose a desk type</InputLabel>
              <Select
                label="Choose a desk type"
                value={deskType}
                onChange={(event) => handleSelect(event)}
              >
                <MenuItem value="NORMAL">NORMAL</MenuItem>
                <MenuItem value="ADJUSTABLE_HEIGHT">ADJUSTABLE_HEIGHT</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
        <Button
          className="button-color"
          variant="contained"
          onClick={onDeskChange}
        >
          {!props.deskId ? "Create room" : "Change room"}
        </Button>
      </Grid>
    </>
  );
};

export default DeskFormLayer;
