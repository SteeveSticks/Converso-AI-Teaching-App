"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState(query);
  console.log(subject);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });

      router.push(newUrl, { scroll: false });
    }
  }, [subject, router, searchParams]);

  return (
    <div className="relative border border-black rounded-lg items-center h-fit px-2">
      <Select value={subject} onValueChange={(value) => setSubject(value)}>
        <SelectTrigger className="cursor-pointer border-0 focus-visible:ring-0 focus-visible:border-0 shadow-none w-full">
          <SelectValue placeholder="Select subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem
              key={subject}
              value={subject} // Use subject as value
            >
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
