import Navbar from "./sections/Navbar";
import CustomCursor from "./components/cursor/CustomCursor";
import Home from "./sections/home/Home";
import About from "./sections/about/About";
import Work from "./sections/Work/Work";
import Tools from "./sections/tools/Tools";
import Contact from "./sections/contact/Contact";
import Footer from "./sections/Footer";
import SectionOrbitDivider from "./components/SectionOrbitDivider";

const App = () => {
  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col bg-canvas overflow-hidden">
      <CustomCursor />
      <Navbar />
      <Home />
      <About />
      <SectionOrbitDivider variant="comet" />
      <Tools />
      <Work />
      <SectionOrbitDivider variant="cometLeft" />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
