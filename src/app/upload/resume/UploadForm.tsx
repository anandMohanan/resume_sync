"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CreateTag } from "./CreateTag";
import { Cross, Loader2, X } from "lucide-react";
import { deleteTagsAction, getTagsAction } from "@/actions/Tags";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import { uploadFiles } from "@/lib/uploadthing";
import { InsertResume } from "@/actions/Resume";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(3).max(100),
  version: z.number().min(1),
  comments: z.string(),
  tags: z.array(z.string()),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((val) => val.length > 0, "Required"),
});

export const UploadResume = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      version: undefined,
      comments: "",
      tags: [],
      file: undefined,
    },
  });
  const { data: items } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await getTagsAction();
      console.log(res);
      return res;
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (tagId: string) => {
      await deleteTag(tagId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const { toast } = useToast();
  const deleteTag = async (tagId: string) => {
    const res = await deleteTagsAction(tagId);
    if (res.status === "error") {
      toast({
        description: `${res.message}`,
        variant: "default",
      });
    } else {
      toast({
        description: "Tag deleted",
        variant: "default",
      });
    }
  };
  const router = useRouter();
  const [isCreateResumePending, setIsCreateResumePending] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreateResumePending(true);
    const fileArray = Array.from(values.file);
    console.log("vales ------>", values);
    const [res] = await uploadFiles("pdfUploader", {
      files: fileArray,
    });

    try {
      console.log(values);
      console.log(values.tags);
      const response = await InsertResume(
        values.name,
        values.version,
        values.comments,
        res.key,
        res.url,
        values.tags,
      );
      if (response.status === "success") {
        setIsCreateResumePending(false);
        router.push(`/resume`);
      } else {
        toast({
          description: `${response.message}`,
          variant: "default",
        });
      }
    } catch (e) {}
  };
  const fileRef = form.register("file");
  return (
    <Form {...form}>
      <div className="m-10">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-center mb-2  lg:text-5xl">
          Upload Resume{" "}
        </h1>
        <p className="lg:text-md text-sm text-center text-muted-foreground">
          Enter your resume details and click the submit button.
        </p>
      </div>
      <form className="w-full p-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="" htmlFor="grid-resume-name">
                    Resume Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      id="grid-resume-name"
                      type="text"
                      placeholder="Enter the name of your resume"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="" htmlFor="grid-version">
                    Version
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          Number.isNaN(parseFloat(e.target.value))
                            ? 0
                            : parseFloat(e.target.value),
                        )
                      }
                      className="w-full"
                      id="grid-version"
                      type="number"
                      placeholder="1.0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter your comments" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>{" "}
        </div>

        <div className="flex items-end flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3  mb-6 md:mb-0">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <DropdownMenu>
                    <FormControl className="w-full">
                      <DropdownMenuTrigger
                        className={cn(buttonVariants(), "w-full")}
                        asChild
                      >
                        <Button>Add Tags</Button>
                      </DropdownMenuTrigger>
                    </FormControl>

                    <DropdownMenuContent className="">
                      {!items ||
                        (items.length <= 0 && (
                          <p className="text-secondary text-center p-5">
                            No tags found
                          </p>
                        ))}
                      {items &&
                        items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <DropdownMenuCheckboxItem
                              key={item.id}
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            >
                              {item.label}
                            </DropdownMenuCheckboxItem>
                            <Button
                              variant={"ghost"}
                              disabled={isPending}
                              onClick={() => mutateAsync(item.id)}
                            >
                              {" "}
                              <X />
                            </Button>
                          </div>
                        ))}
                      <Separator className="w-full mb-5 text-primary" />
                      <CreateTag />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} accept="application/pdf" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">
          {" "}
          {isCreateResumePending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}{" "}
          Submit
        </Button>
      </form>
    </Form>
  );
};
