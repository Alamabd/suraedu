"use client";

import { FileDown } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LetterType } from "./letters";

export type Fields = {
  key: string;
  label: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
};

type GenerateLetterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: LetterType
};

export default function GenerateLetterSheet({
  open,
  onOpenChange,
  data
}:
  GenerateLetterSheetProps) {

  const [values, setValues] = useState<Record<string, string>>({});
  const keys: string[] =  data?.keys ? JSON.parse(data.keys) : []
  const fields: Fields[] = keys.map((key) => ({
    key,
    label: key,
    type: "text",
  }));  

  const generate = async () => {
    try {
      if(!data.file) {
        throw new Error("Surat tidak ditemukan")
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            letter: data.file,
            data: values
          }),
        }
      );
      if(response.status == 200) {
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${data.title ?? "Surat"}_SuraEdu❤️.docx`

        document.body.appendChild(link);
        link.click();

        link.remove();
        URL.revokeObjectURL(url);
      } else {
        throw new Error("Gagal generate surat")
      }
    } catch (error) {
      toast.error("Gagal generate surat", {
        description: error instanceof Error ? error.message : "Internal server error",
        richColors: true,
        position: "top-center"
      })
    }
  }

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 "
      >
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>Generate Surat</SheetTitle>

          <SheetDescription>
            Lengkapi data berikut untuk membuat{" "}
            <span className="font-medium">{data?.title ?? "No letter"}</span>.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-5">
            {fields.map((field) => (
              <div key={field.key} className="grid gap-2">
                <Label htmlFor={field.key}>{field.label}</Label>

                <Input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  placeholder={field.label}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="border-t bg-background px-6 py-4">
          <div className="flex w-full justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>

            <Button onClick={generate}>
              <FileDown className="mr-2 h-4 w-4" />
              Generate DOCX
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}