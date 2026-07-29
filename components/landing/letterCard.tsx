import { FileText, FilePenLine, ArrowRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type LetterType = {
  id: string
  title: string
  category: string
  description: string
  onPress: () => void
  keys?: string
}

export default function LetterCard({
  id,
  title,
  category,
  description,
  onPress
}: LetterType) {
  return (
    <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText />
          </div>

          <Badge variant="secondary">Docx</Badge>
        </div>

        <h3 className="mt-5 leading-6 font-semibold">{title}</h3>

        <Badge className="mt-2 w-fit">{category}</Badge>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full gap-2" onClick={onPress}>
          <FilePenLine size={18} />
          Gunakan Surat
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
