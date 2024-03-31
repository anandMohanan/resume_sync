

import { createTagAction } from "@/actions/Tags"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/hooks"
import { cn } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useTransition } from "react"

export const CreateTag = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false)
    const [newTag, setNewTag] = useState("")
    const { toast } = useToast()
    const createTag = async () => {
        try {
            const res = await createTagAction(newTag)
            if (res.status === "error") {
                toast({
                    description: `${res.message}`,
                    variant: "default",
                })
            }
            else {
                toast({
                    description: "Tag created",
                    variant: "default",
                })
            }
            setOpen(false)
        } catch (e: any) {
            toast({
                description: `${e.message}`,
                variant: "default",
            })
            setOpen(false)

        }

    }
    const queryClient = useQueryClient()
    const { isPending, mutateAsync } = useMutation({
        mutationFn: createTag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        }
    })
    if (isDesktop) {
        return (

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className={cn(buttonVariants({ variant: "secondary" }), 'w-full')}>
                    Create Tag
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                    </DialogHeader>
                    <Input type="create tag" placeholder="Tag name" onChange={(e) => setNewTag(e.target.value)} />
                    <Button type="submit" disabled={isPending} onClick={() => mutateAsync()} >Create</Button>
                </DialogContent>
            </Dialog>
        )
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger className={cn(buttonVariants({ variant: "secondary" }), 'w-full')}>
                    Create Tag
                </DrawerTrigger>
                <DrawerContent >
                    <DrawerHeader> </DrawerHeader>
                    <div >
                        <Input type="create tag" className="mb-10" placeholder="Tag name" onChange={(e) => setNewTag(e.target.value)} />
                        <Button type="submit" className="mb-10 ml-5 w-full" disabled={isPending} onClick={() => mutateAsync()} >Create</Button>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

}
