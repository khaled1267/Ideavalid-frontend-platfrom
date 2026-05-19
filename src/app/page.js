import AiAnalyticsSection from "@/component/Analices";
import Feturedcard from "@/component/Feturedcard";
import Footer from "@/component/Footer";
import Hero from "@/component/Herocard";


export default function Home() {
  return (
    <div>
     
      
      {/* তোমার নতুন স্লাইডার হিরো সেকশন */}
      <Hero />
      <Feturedcard />
      <AiAnalyticsSection />
      <Footer />
    </div>
  );
}