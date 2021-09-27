import { Container, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <Container className="footer-container">
        <Typography className="typography" variant="h6" component="div">
          FAQ
        </Typography>
        <Typography className="typography" variant="h6" component="div">
          Kontakt
        </Typography>
        <Typography className="typography" variant="h6" component="div">
          Polityka prywatnosci
        </Typography>
      </Container>

      <Container className="border-footer">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          © All Rights Reserved. 2021
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Created by Krystian Kopeć 2021
        </Typography>
        <Typography variant="h6" component="div">
          <FacebookIcon className="icons" />
          <TwitterIcon className="icons" />
          <InstagramIcon className="icons" />
          <YouTubeIcon className="icons" />
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
