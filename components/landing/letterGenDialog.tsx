import { Download, Sparkles } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface LetterFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    fields: String[];
}

export default function LetterGenDialog({
    open,
    onOpenChange,
    fields,
}: LetterFormDialogProps) {
    const onSubmit = () => {
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary h-5 w-5" />
                        Isi Informasi Surat
                    </DialogTitle>
                </DialogHeader>

                <Card className="border-0 shadow-none">
                    <CardContent className="p-3">
                        <div className="grid gap-5 md:grid-cols-1">
                            {
                                fields?.length > 0 ?
                            
                            fields.map((field, idx) => (
                                <div key={idx} className="space-y-">
                                    <Label>{field}</Label>

                                    <Input
                                        placeholder={"Enter"}
                                    />
                                </div>
                            ))

                            : <p className="text-center">Belum ada Field"</p>
                            }
                        </div>

                        <Button
                            size="lg"
                            className="mt-8 w-full gap-2"
                            onClick={onSubmit}
                        >
                            <Download size={20} />
                            Generate & Download DOCX
                        </Button>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}