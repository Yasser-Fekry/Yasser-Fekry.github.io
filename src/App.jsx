import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Video from "./pages/Video";

function App() {
  return (
    <BrowserRouter>
      <Navbar />


      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>

      </main>

      <Footer />

      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
