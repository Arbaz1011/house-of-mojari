import GenderCollections from "@/components/home/GenderCollections";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import CustomizeSection from "@/components/home/CustomizeSection";
import Craftsmanship from "@/components/home/Craftsmanship";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GenderCollections />
      <FeaturedCollections />
      <CustomizeSection />
      <Craftsmanship />
      <Testimonials />
      <InstagramGallery />
      <WhatsAppCTA />
    </>
  );
}
