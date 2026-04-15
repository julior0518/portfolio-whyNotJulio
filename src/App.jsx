import Navbar from "./sections/Navbar";
import CustomCursor from "./components/cursor/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About/About";
import Work from "./sections/Work/Work";
import TechStack from "./sections/TechStack/TechStack";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col bg-canvas">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
