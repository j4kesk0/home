import { Hero } from "@/components/sections/Hero";
import { FlagshipProject } from "@/components/sections/FlagshipProject";
import { Promise } from "@/components/sections/Promise";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Forum";

export default function Home() {
  return (
    <>
      <Hero />
      <FlagshipProject />
      <Promise />
      <Skills />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
