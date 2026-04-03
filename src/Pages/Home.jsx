import React from 'react';
import HeroSection from '../Components/HeroSection';
import FeaturedMatchSection from '../Components/FeaturedMatchSection';
import SportsCategoriesSection from '../Components/SportsCategoriesSection';
import TodaysProgramsSection from '../Components/TodaysProgramsSection';
import SocialPostsSection from '../Components/SocialPostsSection';
import LatestNewsSection from '../Components/LatestNewsSection';
import ProgramSection from '../Components/ProgramSection';
import ArticleSection from '../Components/ArticleSection';
import MatchFixturesSection from '../Components/MatchFixtureSection';
import UpcomingMatchesSection from '../Components/UpcomingFixtureSection';
import GallerySection from '../Components/GallerySection';
import ResultMatchSection from '../Components/ResultMatchSection';

export const metadata = {
  title: 'MehHom — Africa\'s Home of Sport | Live TV & Sports News',
  description: 'Watch live sports, catch replays, and follow your favourite leagues on MehHom TV. Africa\'s premium sports broadcast station.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <HeroSection />
      <ProgramSection />
      <ArticleSection />
      <SportsCategoriesSection />
      <TodaysProgramsSection />
      <LatestNewsSection />
      <UpcomingMatchesSection />
      <MatchFixturesSection />
      <ResultMatchSection />
      {/*<FeaturedMatchSection />*/}
      <GallerySection />
      <SocialPostsSection />
    </main>
  );
}