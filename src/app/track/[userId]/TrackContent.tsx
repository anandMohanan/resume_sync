"use client"

import { DeleteTrackAction, UpdateTrackStatus } from "@/actions/Track";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";

interface TrackContentInterface {
    data: {
        id: string;
        companyName: string;
        dataApplied: string;
        status: string | null;
    }[]
    status: {
        status_id: string;
        status: string;
    }[]
}
export const TrackContent = ({ data, status }: TrackContentInterface) => {
    const { toast } = useToast()
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { mutateAsync: UpdateStatus, isPending: UpdateStatusPending } = useMutation({
        mutationFn: async ({ trackId, statusId }: { trackId: string, statusId: string }) => {
            try {
                const res = await UpdateTrackStatus({ trackId, statusId });
                if (res.status === "success") {
                    toast({
                        description: `${res.message}`,
                        variant: "default",
                    });
                } else {
                    toast({
                        description: `${res.message}`,
                        variant: "default",
                    });
                }
            } catch (e: any) {
                toast({
                    description: `${e.message}`,
                    variant: "default",
                })
            }
        }
    })
    const { mutateAsync: DeleteTrack, isPending: DeleteTrackPending } = useMutation({
        mutationFn: async ({ trackId }: { trackId: string }) => {
            try {
                const res = await DeleteTrackAction({ trackId });
                if (res.status === "success") {
                    toast({
                        description: `${res.message}`,
                        variant: "default",
                    });
                } else {
                    toast({
                        description: `${res.message}`,
                        variant: "default",
                    });
                }
            } catch (e: any) {
                toast({
                    description: `${e.message}`,
                    variant: "default",
                })
            }
        }
    })
    if (isDesktop) {
        return (
            <div className="">
                <Table className="border rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Company Name</TableHead>
                            <TableHead className="text-center">Date Applied</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="p-10">
                        {
                            data.map((track) => {
                                return (
                                    <>
                                        <TableRow className="">
                                            <TableCell className="text-center">
                                                <p className="">
                                                    {track.companyName}
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <p className="">
                                                    {track.dataApplied}
                                                </p>
                                            </TableCell>
                                            <TableCell className="flex items-center justify-center">
                                                <Select disabled={UpdateStatusPending} onValueChange={(status) => UpdateStatus({ trackId: track.id, statusId: status })}>
                                                    <SelectTrigger className="w-40 bg-green-700 text-center items-center">
                                                        {track.status}
                                                    </SelectTrigger>
                                                    <SelectContent className="text-center items-center">
                                                        <SelectGroup>
                                                            <SelectLabel>Change Status</SelectLabel>
                                                            {
                                                                status.map((status) => {
                                                                    return <SelectItem className="text-center" key={status.status_id} value={status.status_id}>{status.status}</SelectItem>
                                                                })
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild className="">
                                                        <Button variant="ghost" className="">
                                                            <Ellipsis />{" "}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            onClick={() => DeleteTrack({ trackId: track.id })}
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }
                    </TableBody >
                </Table>
            </div>
        )
    } else {
        return (
            <>
                <Accordion type="single" collapsible className="p-5">
                    {data.map((track) => {
                        return (
                            <AccordionItem key={track.id} value={track.companyName}>
                                <AccordionTrigger> {track.companyName} </AccordionTrigger>
                                <AccordionContent asChild>
                                    <div className="p-2">
                                        <p className="mb-2"><span className="font-bold">Company Name:</span> {track.companyName}</p>
                                        <p className="mb-2"><span className="font-bold">Date Applied: i</span>{track.dataApplied}</p>
                                        <Select disabled={UpdateStatusPending} onValueChange={(status) => UpdateStatus({ trackId: track.id, statusId: status })}>
                                            <SelectTrigger className="w-40 bg-green-700 text-center items-center">
                                                {track.status}
                                            </SelectTrigger>
                                            <SelectContent className="text-center items-center">
                                                <SelectGroup>
                                                    <SelectLabel>Change Status</SelectLabel>
                                                    {
                                                        status.map((status) => {
                                                            return <SelectItem className="text-center" key={status.status_id} value={status.status_id}>{status.status}</SelectItem>
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button variant="ghost" className="w-full mt-2" onClick={() => DeleteTrack({ trackId: track.id })} disabled={DeleteTrackPending}>Delete</Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </>

        )
    }

}

