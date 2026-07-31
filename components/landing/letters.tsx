"use client"

import { ArrowRight, FilePenLine, FileText, SearchX } from "lucide-react";
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
  file?: string;
  keys: string
};

type LettersType = LetterType[]

export default function Letter({ data, q }: { data: LettersType, q: string }) {
  const [selectLettter, setSellectLetter] = useState<null | number>(null)
  
  return (
    <section className="mb-8 container mx-auto px-6">
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
        <div className="flex min-h-[320px] flex-wrap gap-3 items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-12 text-center">
          {data.map((letter, index) => (
            <Card key={index} className="group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">

              <CardHeader className="space-y-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-105">
                    <FileText size={24} />
                  </div>

                  <Badge variant="secondary">
                    DOCX
                  </Badge>

                </div>

                <div>

                  <h3 className="line-clamp-2 text-xl font-semibold leading-snug">
                    {letter.title}
                  </h3>

                  <Badge
                    variant="outline"
                    className="mt-3"
                  >
                    {letter.category}
                  </Badge>

                </div>

              </CardHeader>

              <CardContent className="flex-1">

                <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                  {letter.description}
                </p>

              </CardContent>

              <CardFooter className="border-t bg-muted/20">

                <Button
                  onClick={() => setSellectLetter(index)}
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FilePenLine size={18} />
                    Gunakan Template
                  </span>

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>

              </CardFooter>

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