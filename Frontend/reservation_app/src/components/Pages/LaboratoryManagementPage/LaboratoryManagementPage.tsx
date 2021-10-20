import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import LaboratoryAccordition from "../../LaboratoryAccordition/LaboratoryAccordition";

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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
};

export default LaboratoryManagementPage;
