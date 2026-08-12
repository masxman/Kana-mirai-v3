import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Solutions from "@/components/Solutions";
import Services from "@/components/Services";
import Dashboard from "@/components/Dashboard";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Solutions />
        <Services />
        <Dashboard />
        <Process />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
