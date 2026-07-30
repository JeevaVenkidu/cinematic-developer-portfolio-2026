import { Navbar } from "@/components/Navbar";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Projects } from "@/components/Projects";
import { AboutContact } from "@/components/AboutContact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] text-zinc-100" style={{ overflowX: "clip" }}>
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Component 1 & 2: 500vh Sticky Scroller Canvas + Parallax Text Overlay */}
      <ScrollyCanvas>
        <Overlay progress={0} />
      </ScrollyCanvas>

      {/* Component 3: Work Grid */}
      <Projects />

      {/* About & Contact Section */}
      <AboutContact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
