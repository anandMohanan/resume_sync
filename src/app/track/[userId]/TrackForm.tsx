"use client"


import { CreateTrackAction } from "@/actions/Track"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
const TrackFormSchema = z.object({
    companyName: z.string().min(1, { message: "Company name is required" }),
    dateApplied: z.date({
        required_error: "Please select a date",
    }),
})
export const TrackForm = () => {
    const form = useForm<z.infer<typeof TrackFormSchema>>({
        resolver: zodResolver(TrackFormSchema),
    })
    const { toast } = useToast()
    const onSubmit = async (values: z.infer<typeof TrackFormSchema>) => {
        try {
            const res = await CreateTrackAction({ companyName: values.companyName, dateApplied: values.dateApplied.toDateString() });
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

    return (
        <div className=" p-10">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="lg:flex lg:justify-center " >
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem className="m-4">
                                <FormControl>
                                    <Input
                                        placeholder="Company name"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="dateApplied"
                        render={({ field }) => (
                            <FormItem className="m-4">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="m-4">Submit</Button>
                </form>
            </Form>
        </div>




    )

}
