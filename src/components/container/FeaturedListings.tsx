import React from "react";
import ChooseItem from "../shared/ChooseItem";
import { Button } from "../ui/button";

const FeaturedListings = () => {
  return (
    <section className="container py-10  p-2.5 md:py-16 xl:py-24 flex-center flex-col mx-auto space-y-12">
      <div className="space-y-6">

        <h2 className="w-full text-2xl text-center md:text-4xl font-light text-dark-200">
          Committed to <span className="text-accent-brown">Real Estate</span> Excellence
        </h2>
        <p className="text-sm md:text-base text-dark-50 max-w-xl font-medium text-center">
          Driven by passion for real estate, we are committed to help you find the perfect property, whether lands or houses. Experience personalized service and unparalleled expertise with us.
        </p>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        <ChooseItem
          title="P1"
          text="Local Market Expertise"
          bgColor="#6C8DACA3"
        />
        <ChooseItem
          title="P2"
          text="Tailored Solutions For Your Needs"
          bgColor="#5E5FA4A3"
        />
        <ChooseItem
          title="P3"
          text="Access to Exclusive Listings"
          bgColor="#E0B435A3"
        />
        <ChooseItem
          title="P4"
          text="Dedicated Support From Start To Finish"
          bgColor="#D6C3A9A3"
        />
      </div>
      <p className="text-center mt-4 w-full max-w-lg mx-auto my-10 text-sm md:text-base">
        Ready to experience the difference? Schedule a consultation now!
      </p>

      <Button type="button" className="h-10 md:h-14 text-gold font-semibold bg-primary text-light-50 mx-auto hover:opacity-85 cursor-pointer">
        Schedule Consultation
      </Button>

    </section>
  );
};

export default FeaturedListings;
