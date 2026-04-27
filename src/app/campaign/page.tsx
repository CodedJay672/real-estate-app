import React from 'react'
import CampaignCard from './campaign-card'

export default function CampaignsPage() {
  return (
    <section className='container mx-auto p-4 pt-26 space-y-16'>
      <div className='w-full space-y-4 max-w-2xl mx-auto text-center'>
        <h2 className='text-2xl md:text-4xl text-primary text-pretty font-bold'>
          Check out amazing offers that are currently trending.
        </h2>
        <p className='text-base text-muted-foreground font-medium'>Save up to 50% from amazing offers currently trending in the real estate markets. From, Prelaunch prizes to distress sales and also get timely price increase alerts.</p>
      </div>

      <div className='w-full property-grid'>
        <CampaignCard img="/assets/downtown.jpeg" title="Pre-launch Prices Closes April 30th" subtitle="Downtown Lagos Commercial City, Ibeju-Lekki Phase 2" />
      </div>
    </section>
  )
}
