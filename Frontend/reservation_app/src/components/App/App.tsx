import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MainContainer from "../MainContainer/MainContainer";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <MainContainer />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
