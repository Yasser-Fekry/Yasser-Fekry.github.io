import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/LatestProjects.jsx";
import Expertise from "../components/Expertise";
import Arsenal from "../components/Arsenal";
import Certifications from "../components/Certifications";
import TrustedCompanies from "../components/TrustedCompanies";
import RecentBlog from "../components/RecentBlog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Skills from "../components/skills";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Expertise />
      <Skills />
      <TrustedCompanies />

      {/* <About /> */}
      {/* <Arsenal /> */}
      {/* <Certifications /> */}
      {/* <RecentBlog /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </>
  );
}

export default Home;
