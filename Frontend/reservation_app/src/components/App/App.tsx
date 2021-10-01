import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MainContainer from "../MainContainer/MainContainer";
import { BrowserRouter as Router } from "react-router-dom";
import MessageSnackbar from "../MessageSnackbar/MessageSnackbar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <MainContainer />
        <Footer />
        <MessageSnackbar />
      </Router>
    </div>
  );
};

export default App;
