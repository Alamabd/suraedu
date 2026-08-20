"use client"

import {
    FileText,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import LetterList, { Letter } from "./lettersList"

interface LetterGridProps {
    letters: Letter[]
    loading: boolean
}

export default function Main({
    letters,
    loading,
}: LetterGridProps) {
    return (
        <main className="min-w-0 flex-1">

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Template Surat
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Pilih template surat yang sesuai dengan
                            kebutuhan Anda.
                        </p>
                    </div>

                    <Badge
                        variant="secondary"
                        className="hidden sm:flex"
                    >
                        {letters.length} Template
                    </Badge>

                </div>
            </div>

            {/* Grid */}
            {!loading ?
                letters.length > 0 ? (
                    <div>
                        <LetterList letters={letters} />
                    </div>
                ) : (
                    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed">

                        <FileText className="h-10 w-10 text-muted-foreground" />

                        <h3 className="mt-4 font-medium">
                            Template tidak ditemukan
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Coba gunakan kata pencarian atau kategori lain.
                        </p>

                    </div>
                )
                : [1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="flex min-h-[180px] gap-5 rounded-xl border bg-card p-4 sm:p-5"
                    >
                        {/* Preview */}
                        <div className="hidden aspect-[210/297] w-[110px] shrink-0 rounded-sm bg-muted sm:block" />

                        {/* Content */}
                        <div className="flex min-w-0 flex-1 flex-col">
                            {/* Meta */}
                            <div className="mb-3 flex items-center gap-2">
                                <div className="h-4 w-16 rounded bg-muted" />
                                <div className="h-3 w-3 rounded-full bg-muted" />
                                <div className="h-4 w-14 rounded bg-muted" />
                            </div>

                            {/* Title */}
                            <div className="h-6 w-3/4 max-w-md rounded bg-muted" />

                            {/* Description */}
                            <div className="mt-3 space-y-2">
                                <div className="h-4 w-full max-w-3xl rounded bg-muted" />
                                <div className="h-4 w-5/6 max-w-2xl rounded bg-muted" />
                            </div>

                            {/* Creator */}
                            <div className="mt-auto flex items-center gap-2 pt-4">
                                <div className="h-4 w-20 rounded bg-muted" />
                                <div className="h-4 w-24 rounded bg-muted" />
                                <div className="h-4 w-28 rounded bg-muted" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="hidden shrink-0 items-start gap-2 sm:flex">
                            <div className="h-9 w-9 rounded-md bg-muted" />
                            <div className="h-9 w-9 rounded-md bg-muted" />
                        </div>
                    </div>
                ))}
        </main>
    )
}