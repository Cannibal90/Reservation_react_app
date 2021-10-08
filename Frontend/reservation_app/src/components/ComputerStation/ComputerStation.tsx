import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import WindowIcon from "@mui/icons-material/Window";
import MemoryIcon from "@mui/icons-material/Memory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import { Link } from "react-router-dom";
import "./ComputerStation.css";

const ComputerStation = (props: { station: any }) => {
  const station = props.station;

  const booleanHandler = (value: boolean) => {
    if (value == true) return "Yes";
    return "No";
  };

  return (
    <>
      <Grid container direction="column">
        <TextField
          className="computer-title"
          defaultValue="Computer station info"
          InputProps={{
            readOnly: true,
          }}
        />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Grid3x3Icon />
            </ListItemIcon>
            <ListItemText primary={`ID number: ` + station.id} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <DesktopWindowsIcon />
            </ListItemIcon>
            <ListItemText primary={`Monitors: ` + station.monitors} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <HeadphonesIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Headphones: ` + booleanHandler(station.headphones)}
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <MicIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Microphone: ` + booleanHandler(station.microphone)}
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <WindowIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Operating system: ` + station.operatingSystem}
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText primary={`Graphic Card: ` + station.graphicCard} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={`CPU: ` + station.cpu} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ViewAgendaIcon />
            </ListItemIcon>
            <ListItemText primary={`RAM: ` + station.ram} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <DriveFolderUploadIcon />
            </ListItemIcon>
            <ListItemText primary={`Drive: ` + station.drive + " GB"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <NetworkWifiIcon />
            </ListItemIcon>
            <ListItemText primary={`Network type: ` + station.networkType} />
          </ListItem>
        </List>

        <Link to={"/station/" + station.id} className="link">
          <Button className="button-color" variant="contained">
            Reserve
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default ComputerStation;
