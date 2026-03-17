import React from 'react'

export default function TopSearchedProperties() {
  return (
    <section className="container mx-auto  py-16 md:py-20 xl:py-24 space-y-24">
      <div className="mb-8 space-y-6">
        <h2 className="w-full text-center text-2xl md:text-4xl font-light text-dark-200">
          Top Searched <span className="text-accent-brown">Properties</span>
        </h2>
        <p className="text-sm md:text-base text-dark-50 text-center max-w-xl mx-auto font-medium">
          Discover what people are searching for. Find your next property among the most sought-after listings in your area.
        </p>
      </div>
    </section>
  )
}
