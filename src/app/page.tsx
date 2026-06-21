import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { CourseCard } from "@/components/courses/course-card";
import { ProgrammeCarousel } from "@/components/courses/programme-carousel";
import { publishedProgrammes } from "@/data/courses";

const optionCards = [
  {
    image: "/images/heart.png",
    title: "Micro-programmes",
    text: "Deepen your expertise with our comprehensive micro-programmes designed to cover a wide range of topics in renewable energy",
    href: "/micro-programmes"
  },
  {
    image: "/images/optionicon.png",
    title: "Micro-credentials",
    text: "Boost your skill set with our targeted micro-credentials. These concise courses are ideal for those looking to enhance specific competencies",
    href: "/micro-credentials"
  }
];

const steps = [
  {
    title: "First Step",
    text: "Create your free account and explore our diverse range of micro-programmes and micro-credentials"
  },
  {
    title: "Second Step",
    text: "Choose the micro-programmes and/or micro-credentials that align with your goals and interests."
  },
  {
    title: "Third Step",
    text: "Start learning at your own pace and earn your certifications to boost your skills and career prospects."
  }
];

const benefits = [
  {
    icon: "/images/star.png",
    text: "Up skill for a Greener Future: Gain in-demand sustainability expertise and become a leader in the green economy"
  },
  {
    icon: "/images/labelicon.png",
    text: "Flexible Learning: Learn at your own pace, anytime, anywhere with our online courses and resources."
  },
  {
    icon: "/images/lightningicon.png",
    text: "Practical Skills: Apply your knowledge through real-world projects and case studies."
  },
  {
    icon: "/images/heart-black.png",
    text: "Positive Impact: Contribute to a sustainable future by developing solutions to environmental challenges."
  }
];

const testimonials = [
  {
    quote: "I was amazed by the breadth of renewable energy courses offered. I highly recommend BoostMySkills to anyone passionate about creating a sustainable future",
    name: "Anya Petrova",
    role: "Sustainability Consultant"
  },
  {
    quote: "The practical skills I gained have already helped me implement sustainable practices in my workplace",
    name: "Maria Gonzalez",
    role: "Renewable Energy Engineer"
  },
  {
    quote: "BoostMySkills helped me discover my passion for renewable energy and sustainability and explore potential career paths",
    name: "David Kim",
    role: "Student"
  }
];

export default function HomePage() {
  return (
    <>
      <section className="bms-page bms-hero">
        <div>
          <p className="bms-hero-eyebrow">FREE fully funded courses</p>
          <h1 className="bms-hero-title">Become a leader in sustainability</h1>
          <p className="bms-hero-text">Accelerate and future proof your career in sustainability or gain the skills to advance your organisations sustainability initiatives, through courses developed by pan-European and international universities - co-funded by the EU, Swiss Confederation and a consortia of South Korean universities (COSS) - and supported by the United Nations Institute for Training &amp; Research (UNITAR)</p>
          <div className="bms-hero-actions flex flex-wrap">
            <ButtonLink className="bms-hero-cta" href="/micro-programmes">Explore Micro-programmes</ButtonLink>
            <ButtonLink className="bms-hero-cta" href="/micro-credentials">Explore Micro-credentials</ButtonLink>
          </div>
        </div>
        <div className="bms-hero-visual relative mx-auto aspect-square w-full max-w-[532px]">
          <Image alt="Learners building sustainability skills" fill priority sizes="(min-width: 768px) 45vw, 90vw" src="/images/landing.png" className="object-contain" />
        </div>
      </section>

      <section className="bms-section bms-home-programmes">
        <span className="bms-section-eyebrow">Discover</span>
        <h2 className="bms-section-title">Our Trending Micro-programmes</h2>
        <ProgrammeCarousel>
          {publishedProgrammes.map((programme) => <CourseCard item={programme} key={programme.id} type="micro-programme" />)}
        </ProgrammeCarousel>
        <Link className="bms-view-all" href="/micro-programmes">View all Micro-programmes <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>

      <section className="bms-certificate">
        <div className="bms-certificate-content">
          <span className="bms-section-eyebrow">Earn BoostMySkills</span>
          <h2 className="bms-certificate-title">Micro-credential and Micro-programme Certificates</h2>
          <p className="bms-certificate-text">
            Develop and advance your expertise with our comprehensive micro-credential and micro-programme courses. Gain practical knowledge and skills to drive energy innovations and decarbonisation strategies.
          </p>
          <div className="bms-certified">
            <Image alt="certified icon" height={48} src="/images/certified.png" width={48} />
            <p>Developed by pan-European and international universities, co-funded by the EU, Swiss Confederation and a consortia of South Korean universities (COSS) - and supported by the United Nations Institute for Training &amp; Research (UNITAR)</p>
          </div>
        </div>
        <div className="bms-certificate-image">
          <Image alt="diploma image" height={540} src="/images/r4c-certificate.png" style={{ height: "auto" }} unoptimized width={650} />
        </div>
      </section>

      <section className="bms-options">
        <div className="bms-options-heading">
          <span className="bms-section-eyebrow">Expand your Knowledge with Specialised Learning Paths</span>
          <h2 className="bms-options-title">Choose your option</h2>
          <p className="bms-text">Choose a micro-programme, where each micro-programme consists of 10 micro-credentials. Or choose one or more individual micro-credentials.</p>
        </div>
        <div className="bms-options-grid">
          {optionCards.map((option, index) => (
            <div className={index === 0 ? "bms-option-card bms-option-featured" : "bms-option-card"} key={option.title}>
              <Image alt="" className="bms-option-icon" height={72} src={option.image} width={72} />
              <h3>{option.title}</h3>
              <p>{option.text}</p>
              <Link className="bms-option-button" href={option.href}>View all</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bms-steps">
        <div className="bms-steps-copy">
          <span className="bms-section-eyebrow">How to get started?</span>
          <h2>Get started in 3 simple steps</h2>
          <p className="bms-text">Achieve your learning goals quickly by following these straight-forward steps</p>
        </div>
        <ol className="bms-steps-list">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bms-benefits">
        <div className="bms-benefits-image">
          <Image alt="ipad image" height={620} src="/images/home-page-img.png" style={{ height: "auto" }} unoptimized width={720} />
        </div>
        <div className="bms-benefits-content">
          <span className="bms-section-eyebrow">Certifications to boost your skills and career prospects</span>
          <h2>Benefits of BoostMySkills</h2>
          <div className="bms-benefits-grid">
            {benefits.map((benefit) => (
              <div className="bms-benefit" key={benefit.text}>
                <Image alt="" height={32} src={benefit.icon} width={32} />
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bms-testimonials">
        <h2>What People Are Saying</h2>
        <div className="bms-testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="bms-testimonial" key={testimonial.name}>
              <p>&quot;{testimonial.quote}&quot;</p>
              <div className="bms-client">
                <div className="bms-client-avatar">
                  <Image alt="" height={16} src="/images/useravatar.png" width={16} />
                </div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bms-partners">
        <h2>Our Partners</h2>
        <Image alt="partner image" height={880} src="/images/partners.jpeg" style={{ height: "auto" }} unoptimized width={1440} />
        <div className="bms-extra-partners">
          <Image alt="extra partners image" height={240} src="/images/extra-partners.png" style={{ height: "auto", width: "100%" }} unoptimized width={1346} />
        </div>
      </section>
    </>
  );
}
