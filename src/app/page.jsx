import AstroAISection from '@/components/Home/AstroAISection'
import CosmicSection from '@/components/Home/CosmicSection'
import CtaSection from '@/components/Home/CtaSection'
import FeaturesSection from '@/components/Home/FeaturesSection'
import FooterSection from '@/components/Home/FooterSection'
import HeroSection from '@/components/Home/HeroSection'
import TestimonialSection from '@/components/Home/TestimonialSection'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-[92vh] flex flex-col justify-center items-center text-2xl'>
      <HeroSection />
      <FeaturesSection />
      <CosmicSection />
      <AstroAISection />
      <TestimonialSection />
      <CtaSection />
      <FooterSection />
    </div>
  )
}

export default page