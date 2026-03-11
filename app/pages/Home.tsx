import Image from "next/image";
import Link from "next/link";
import { Download, Star, Users, Calendar, ArrowRight, Heart, MessageCircle, Share2 , Smartphone} from "lucide-react";

import {HeroSection} from "@/components/HomeComponents/HeroSection";
import { StatsSection } from "@/components/HomeComponents/StatsSection";
import { FeaturedEventsSection } from "@/components/HomeComponents/FeaturedEventsSection";
import { HowItWork } from "@/components/HomeComponents/HowItWork";
import { FeedPreview } from "@/components/HomeComponents/FeedPreview1";
import { FinalCTA } from "@/components/HomeComponents/FinalCTA";

export const Home: React.FC = () => {


 

  return (
    <div className="pt-20">
      {/* Hero Section */}
        <HeroSection />

      {/* Stats Section */}
      <StatsSection/>

      {/* Featured Events */}
   
 <FeaturedEventsSection/>
      {/* How it Works */}
     <HowItWork/>

      {/* Feed Preview */}
    <FeedPreview/>

      {/* Final CTA */}
     <FinalCTA/>
    </div>
  );
};
