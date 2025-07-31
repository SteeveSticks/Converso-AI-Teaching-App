import CompanionCard from "@/components/CompanionCard";
import CompanionsLists from "@/components/CompanionsLists";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import React from "react";

const page = () => {
  return (
    <main className="px-30">
      <h1 className="text-2xl underline">Popular Companions </h1>

      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="456"
          name="Countsy the Number Wizard"
          topic="Drivaives & Integrals"
          subject="Maths"
          duration={30}
          color="#e5d0ff"
        />
        <CompanionCard
          id="789"
          name="Verba the Vocabulary Builder"
          topic="English Litrature"
          subject="science"
          duration={30}
          color="#bde7ff"
        />
      </section>

      <section className="home-section">
        <CompanionsLists
          title="Recently Completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-80"
        />
        <CTA />
      </section>
    </main>
  );
};

export default page;
