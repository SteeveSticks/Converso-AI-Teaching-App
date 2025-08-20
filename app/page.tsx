import CompanionCard from "@/components/CompanionCard";
import CompanionsLists from "@/components/CompanionsLists";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import { getAllCompanions, getRecentSessions } from "@/lib/companions.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSessions({ limit: 10 });

  return (
    <main className="px-30">
      <h1 className="text-2xl underline">Popular Companions </h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsLists
          title="Recently Completed sessions"
          companions={recentSessionCompanions}
          classNames="w-2/3 max-lg:w-80"
        />
        <CTA />
      </section>
    </main>
  );
};

export default page;
