import rightImg from "@/images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import Heading from "@/shared/Heading";

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="‘Homestays of India’ is dedicated to support authentic family run homestays across India. We aim to provide travelers a unique culturally immersive experience and the locals an alternate source of income while preserving their heritage, culture and traditions."
        />

        <SectionFounder />
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> */}

        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">
            🎯 &nbsp;Mission
          </h2>
          <p className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
          Our mission is to promote sustainable tourism in India through homestays and create opportunities for people to learn and earn in their villages.
          </p>
          <p className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
          Not only do we provide the alternate livelihood to the host families but also support the local communities that help reducing migration from villages. In addition to engaging local staff and using local resources, we train the women in various aspects of hospitality like guest handling, cooking, hygiene, adopting eco-practices etc. The youth of the area are also trained in tourism activities so they get the employment opportunities in the village itself and do not have to go to the cities in search of jobs. We work actively with locals to create outlets for local produce and handicrafts to boost the local economy.
          </p>
        </div>

        <SectionStatistic />

        {/* <SectionSubscribe2 /> */}
      </div>
    </div>
  );
};

export default PageAbout;
