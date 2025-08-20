import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/companions.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

// params /url/{id}
// searchParams /url?key=value&key1=value1

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const { name, subject, topic, duration } = companion;

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!name || !subject || !topic || !duration) {
    redirect("/companions");
  }

  return (
    <main>
      <article className="flex rounded-border justify-between gap-30 p-5 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="size-[52px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-xl">{name}</p>
              <div className="bg-black text-white rounded-4xl text-[11px] px-2 py-1 capitalize max-sm:hidden">
                {subject}
              </div>
            </div>
            <p className="text-base">{topic}</p>
          </div>
        </div>

        <div className="items-start text-xl max-md:hidden">
          {duration} minutes
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
