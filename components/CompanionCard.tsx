"use client";
import { bookmarkCompanion } from "@/lib/companions.actions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const createBookmark = async () => {
    const bookmark = await bookmarkCompanion(id);
    if (bookmark) {
      toast.success("Bookmarked To Companion Library");
      setIsBookmarked(true);
    }
  };

  return (
    <div>
      <article className="companion-card" style={{ backgroundColor: color }}>
        <div className="flex justify-between items-center">
          <div className="subject-badge">{subject}</div>
          <button
            className="companion-bookmark"
            onClick={() => createBookmark()}
          >
            {isBookmarked ? (
              <Image
                src="/icons/bookmark-filled.svg"
                alt="bookmark"
                width={12.5}
                height={15}
              />
            ) : (
              <Image
                src="/icons/bookmark.svg"
                alt="bookmark"
                width={12.5}
                height={15}
              />
            )}
          </button>
        </div>

        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm">{topic}</p>

        <div className="flex items-center gap-2">
          <Image
            src="/icons/clock.svg"
            alt="duration"
            width={13.5}
            height={13.5}
          />
          <p className="text-sm">{duration} minutes</p>
        </div>

        <Link href={`/companions/${id}`} className="w-full">
          <button className="btn-primary w-full justify-center">
            Lunch Lesson
          </button>
        </Link>
      </article>
    </div>
  );
};

export default CompanionCard;
