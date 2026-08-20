"use client";

import { FileDown } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { Letter, useLetters } from "@/store/useLetters";

export type Fields = {
  key: string;
  label: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
};

type GenerateLetterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  letter_id: number
};

export default function ModalPreview({
  open,
  onOpenChange,
  letter_id,
}: GenerateLetterDialogProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { letters, fetchLetters } = useLetters()
  const letter = letters.find(val => val.id === letter_id)

  const keys: string[] = letter?.keys
    ? JSON.parse(letter.keys)
    : [];

  const fields: Fields[] = keys.map((key) => ({
    key,
    label: key,
    type: "text",
  }));

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generate = async () => {
    try {
      if (!letter?.file) {
        throw new Error("Surat tidak ditemukan");
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate-preview`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keys: values,
            letter_id: letter.id
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal generate surat");
      }

      const json = await response.json()
      console.log(json)

      toast.success("Surat berhasil dibuat", {
        description: "File DOCX berhasil diunduh.",
        richColors: true,
        position: "top-center",
      });

      onOpenChange(false);
      fetchLetters()

      // Reset form
      setValues({});
    } catch (error) {
      toast.error("Gagal generate surat", {
        description:
          error instanceof Error
            ? error.message
            : "Internal server error",
        richColors: true,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Preview Surat
          </DialogTitle>

          <DialogDescription>
            Lengkapi data berikut untuk membuat{" "}
            <span className="font-medium text-foreground">
              {letter?.title ?? "Surat"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[40vh] sm:max-h-[60vh] overflow-y-auto py-2 pr-1">
          <div className="grid gap-4">
            {
              fields.length > 0 ?
            fields.map((field) => (
              <div
                key={field.key}
                className="grid gap-2"
              >
                <Label htmlFor={field.key}>
                  {field.label}
                </Label>

                <Input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  placeholder={`Masukkan ${field.label}`}
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    handleChange(
                      field.key,
                      e.target.value
                    )
                  }
                />
              </div>
            ))
            : <div>
              <p className="underline">Dokument Docx tidak sesuai dengan template, silahkan buka panduan</p>
            </div>
          }
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>

          <Button
            type="button"
            disabled={loading ||  Object.keys(fields).length === 0}
            onClick={generate}
          >
            <FileDown className="mr-2 h-4 w-4" />

            {loading
              ? "Membuat..."
              : "Generate DOCX"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}