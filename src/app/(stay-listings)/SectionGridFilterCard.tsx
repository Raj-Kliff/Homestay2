'use client'
import React, { FC, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import StayCard2Copy from "@/components/StayCard2Copy";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: any //StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {

  const [allInternalProperties, setAllInternalProperties] = useState([]);

  useEffect(() => {
    // Extract all internal 'properties' arrays and merge them
    const internalProperties = data.flatMap((property:any) => property.properties);
    
    // Update state with the combined internal properties
    setAllInternalProperties(internalProperties);
  }, [data]);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allInternalProperties.map((stay) => (
          <StayCard2Copy  data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
