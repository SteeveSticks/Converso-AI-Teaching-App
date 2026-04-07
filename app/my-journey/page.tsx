import CompanionsLists from "@/components/CompanionsLists";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserCompanions, getUserSessions } from "@/lib/companions.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  console.log("companions", companions);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main className="min-lg-w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName}
            width={100}
            height={100}
            className="max-sm:w-fit rounded-sm"
          />

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="border border-black p-2 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={20}
                height={20}
                className="max-sm:w-fit"
              />
              <p className="font-bold text-xl">{sessionHistory.length}</p>
            </div>
            <div>Lessons Completed</div>
          </div>

          <div className="border border-black p-2 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/cap.svg"
                alt="cap"
                width={20}
                height={20}
                className="max-sm:w-fit"
              />
              <p className="font-bold text-xl">{companions.length}</p>
            </div>
            <div>Companins Created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="font-bold text-xl">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsLists
              title="Recent Session"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companins">
          <AccordionTrigger className="font-bold text-xl">
            My Companions {`${companions.length}`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsLists title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
