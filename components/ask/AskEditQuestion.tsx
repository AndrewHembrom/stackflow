"use client";

import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import { question, tag } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionsSchema } from "@/lib/validation";
import TagInput from "@/components/ask/TagInput";

const AskEditQuestion = () => {
  const [isPending, startTransition] = useTransition();
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const onSubmit = (values: z.infer<typeof QuestionsSchema>) => {
    startTransition(async () => {
      // TODO: Implement submit logic
    });
  };

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title*/}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Question Title *
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Be specific and imagine you`&apos;`re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Explanation */}
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Question Title *
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onBlur={field.onBlur}
                      initialValue={field.value || "Welcome to StackFlow!"}
                      onEditorChange={(content) => field.onChange(content)}
                      init={{
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                        content_style:
                          "body { font-family:Inter; font-size:16px }",
                        skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
                        content_css:
                          resolvedTheme === "dark" ? "dark" : "light",
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Be specific and imagine you`&apos;`re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Question Title *
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <TagInput
                      disabled={isPending}
                      onChange={(tags) => {
                        field.onChange(tags);
                      }}
                      questionTags={field.value}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Be specific and imagine you`&apos;`re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="primary-gradient w-full !text-lime-900"
              disabled={isPending}
            >
              Ask Question
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AskEditQuestion;
