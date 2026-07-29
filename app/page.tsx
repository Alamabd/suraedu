import Benefits from "@/components/landing/benefits"
import Footer from "@/components/landing/footer"
import Hero from "@/components/landing/hero"
import Navbar from "@/components/landing/navbar"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <Benefits />
      </main>

      <Footer />
    </div>
  )
}
