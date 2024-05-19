import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { PricingSection } from "./_components/pricing-section";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center p-24 ">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </main>
  );
}
