import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import QuestionCard from "@/components/global/QuestionCard";
import NoResult from "@/components/global/NoResult";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
    filter: string;
    q: string;
  };
}) {
  const Questions = await db.question.findMany({
    // skip: 10 * Number(10),
    // take: 10,
    include: {
      tags: true,
      answer: true,
      downvotes: true,
      saves: true,
      upvotes: true,
      user: true,
    },
    where: {
      title: {
        contains: searchParams.q,
      },
    },
    orderBy: {
      createdAt: searchParams.filter === "newest" ? "desc" : "asc",
    },
  });

  return (
    <div>
      {Questions?.length > 0 && (
        <>
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="h1-bold text-dark100_light900">All Questions</h1>
            <Link
              href={"/askQuestion"}
              className="flex justify-end max-sm:w-full"
            >
              <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                Ask a Question
              </Button>
            </Link>
          </div>
          <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
            SearchBar MobileFilters
          </div>
          Filters
        </>
      )}
      <div className="mt-10 flex w-full flex-col gap-6">
        {Questions.length > 0 ? (
          <>
            {Questions.map((question) => {
              <QuestionCard
                key={question.id}
                question={question}
                tags={question.tags}
                user={question.user}
                Upvotes={question.upvotes}
                answers={question.answer}
              />;
            })}
          </>
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/askQuestion"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </div>
  );
}
