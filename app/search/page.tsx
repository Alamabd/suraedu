import Footer from "@/components/landing/footer";
import Letter, { LetterType } from "@/components/landing/letters";
import Navbar from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SearchX } from "lucide-react";

type Props = {
    searchParams: Promise<{
        q?: string;
    }>;
};

export default async function SearchPage({ searchParams }: Props) {
    const { q = "" } = await searchParams;
    let data: LetterType[] = []

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/letters/?search=${q}`,
            {
                method: "GET",
            }
        )
        const { status } = response
    
        if (status == 200) {
            const json = await response.json()
            data = json as LetterType[]
        }
    } catch (error) {
        
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <section className="relative overflow-hidden pb-4">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

                <div className="container relative mx-auto px-6 pt-28">

                    <div className="mx-auto max-w-4xl text-center">

                        <Badge className="rounded-full">
                            Hasil Pencarian
                        </Badge>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                            Cari dan Pilih
                            <span className="text-primary"> Template Surat</span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                            Jelajahi berbagai template surat administrasi pendidikan yang siap digunakan.
                            Pilih template yang sesuai, isi data yang diperlukan, lalu unduh dalam format
                            DOCX.
                        </p>


                    </div>

                    <form
                        action="/search"
                        method="GET"
                        className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl border bg-background p-3 shadow-lg"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-muted-foreground" />

                            <Input
                                name="q"
                                defaultValue={q}
                                placeholder="Cari nama surat..."
                                className="h-12 pl-10"
                            />
                        </div>

                        <Button type="submit" className="h-12 px-8">
                            Cari
                        </Button>
                    </form>
                </div>
            </section>
            <Letter data={data} q={q} />
            
            <Footer />
        </div>
    );
}