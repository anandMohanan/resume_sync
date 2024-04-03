"use client";

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "./desktop-view";
import { useMediaQuery } from "@/hooks/hooks";
import { ResumeMobile } from "./mobile-view";

interface ResumePageProps {
  data: {
    id: string | null;
    resume_name: string | null;
    version: string | null;
    file_url: string | null;
    comments: string | null;
  }[];
}
export const ResumeTableContent = ({ data }: ResumePageProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <div className="rounded-md sm:border">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium ml-20">Resume</TableHead>
              <TableHead className="font-medium text-center">Version</TableHead>
              <TableHead className="font-medium text-center">URL</TableHead>
              <TableHead className="font-medium text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <DataTable data={data} />
        </Table>
      </div>
    );
  } else {
    return (
    <ResumeMobile data={data} />
    );
  }
};
