import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackgroundDecoration from '../components/layout/BackgroundDecoration';
import Hero from '../components/hero/Hero';
import WhyEnglishClub from '../components/why-event/WhyEnglishClub';
import WhyThisEvent from '../components/why-event/WhyThisEvent';
import JourneyMap from '../components/journey/JourneyMap';
import MissionPreview from '../components/mission/MissionPreview';
import BeyondClassroom from '../components/why-event/BeyondClassroom';
// import MemberStories from '../components/why-event/MemberStories';
import JourneyRoadmap from '../components/why-event/JourneyRoadmap';
// import CommunityStories from '../components/why-event/CommunityStories';
import MemoryCapsule from '../components/memory/MemoryCapsule';
import EventInformation from '../components/information/EventInformation';
import FAQ from '../components/faq/FAQ';
import FinalCTA from '../components/cta/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <BackgroundDecoration />
      <Navbar />
      <main>
        <Hero />
        <WhyEnglishClub />
        <WhyThisEvent />
        <JourneyMap />
        <MissionPreview />
        <BeyondClassroom />
        {/* <MemberStories /> */}
        <JourneyRoadmap />
        {/* <CommunityStories /> */}
        <MemoryCapsule />
        <EventInformation />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
