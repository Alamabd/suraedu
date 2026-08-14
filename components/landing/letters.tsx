"use client"

import { ArrowRight, FilePenLine, FileText, SearchX, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import EmptyState from "../emptyState";
import { useEffect, useState } from "react";
import GenerateLetterSheet, { Fields } from "./generateLetterSheet";

export type LetterType = {
  id: string;
  title: string;
  category: string;
  description: string;
  keys: string;
  creator: string;
  file?: string;
};

type LettersType = LetterType[]

export default function Letter({ data, q }: { data: LettersType, q: string }) {
  const [selectLettter, setSellectLetter] = useState<null | number>(null)
  
  return (
    <section className="mb-8 container mx-auto sm:px-16 px-6">
      <div className="mb-8 flex items-end justify-between">

        <div>

          <h2 className="text-2xl font-semibold">
            Template Surat
          </h2>

          <p className="text-muted-foreground">
            {data.length} template tersedia
            {q && <> untuk "{q}"</>}
          </p>

        </div>

      </div>

      {data.length > 0 ? (
        <div className="grid min-h-[320px] content-start gap-5 rounded-2xl border border-dashed bg-muted/20 p-5 md:grid-cols-2 lg:grid-cols-3">
         {data.map((letter, index) => (
  <Card
    key={letter.id}
    className="group overflow-hidden rounded-xl border transition hover:border-primary/40 hover:shadow-md"
  >
    <CardContent className="p-4">

      <div className="flex gap-4">

        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText size={22} />
        </div>


        {/* Content */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <h3 className="line-clamp-1 font-semibold">
              {letter.title}
            </h3>

            <Badge
              variant="secondary"
              className="shrink-0"
            >
              DOCX
            </Badge>

          </div>


          <Badge
            variant="outline"
            className="mt-2"
          >
            {letter.category}
          </Badge>


          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {letter.description}
          </p>


          <p className="mt-2 text-xs text-muted-foreground">
            Oleh {letter.creator ?? "Tidak diketahui"}
          </p>

        </div>

      </div>


      {/* Action */}
      <Button
        onClick={() => setSellectLetter(index)}
        size="sm"
        className="mt-4 w-full justify-between"
      >
        Gunakan Template

        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />

      </Button>


    </CardContent>
  </Card>
))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX className="h-8 w-8" />}
          title="Surat tidak ditemukan"
          description="Coba gunakan kata kunci lain atau pilih kategori yang berbeda."
        />
      )}

      <GenerateLetterSheet
      data={data[selectLettter!]}
      open={selectLettter!==null}
      onOpenChange={() => setSellectLetter(null)} />
    </section>

  );
}