import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  return (
    <section className="bms-contact">
      <div className="bms-contact-intro">
        <h1>Let’s get in touch!</h1>
        <p>Contact us if you have questions about BoostMySkills.</p>
        <div className="bms-contact-follow">
          <h2>Follow us</h2>
          <a aria-label="BoostMySkills on LinkedIn" href={siteConfig.social.linkedin} rel="noreferrer" target="_blank">
            <Image alt="LinkedIn" height={28} src="/icons/linkedin.png" style={{ height: "auto", width: "28px" }} width={28} />
          </a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
