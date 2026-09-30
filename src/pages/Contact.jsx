import { Helmet } from "react-helmet-async";
import Contact from "../components/Contact";

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Yasser Fekry</title>
        <meta
          name="description"
          content="Get in touch with Yasser Fekry for bug bounty, security testing, and technical consulting."
        />
      </Helmet>
      <Contact />
    </>
  );
}

export default ContactPage;
