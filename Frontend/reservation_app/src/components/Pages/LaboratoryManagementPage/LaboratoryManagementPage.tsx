import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import LaboratoryAccordition from "../../LaboratoryAccordition/LaboratoryAccordition";
import DeskAccordition from "../../DeskAccordition/DeskAccordition";
import ComputerAccordition from "../../ComputerAccordition/ComputerAccordition";
const LaboratoryManagementPage = () => {
  return (
    <>
      <Paper style={{ width: "80%", margin: "20px auto" }}>
        <Typography variant="h3" component="div" className="title">
          Laboratory management
        </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4" style={{ fontWeight: 500 }}>
              Laboratory rooms
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LaboratoryAccordition />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4" style={{ fontWeight: 500 }}>
              Desks
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DeskAccordition />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4" style={{ fontWeight: 500 }}>
              Computer Stations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ComputerAccordition />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
};

export default LaboratoryManagementPage;
