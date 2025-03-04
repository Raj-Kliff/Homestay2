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

const itemsPerPage = 20;

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {

  const [allInternalProperties, setAllInternalProperties] = useState([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
	const totalPages = Math.ceil(allInternalProperties?.length / itemsPerPage);
	const currentItems = allInternalProperties?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	const handlePageChange = (page:number) => {
		setCurrentPage(page);
	  };

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
        {currentItems?.map((stay) => (
          <StayCard2Copy  data={stay} />
        ))}
      </div>
      <div className="flex mt-[5rem] justify-center items-center">
        {/* <Pagination /> */}
        <div>
							<button 
							onClick={() => handlePageChange(currentPage - 1)} 
							disabled={currentPage === 1}
							className={` ${currentPage === 1 ? 'invisible' : ''} inline-flex h-11 px-3 items-center justify-center border border-gray-400 rounded-full text-gray-700`}
							>
							&larr;
							</button>

							{/* Display page numbers */}
							{Array.from({ length: totalPages }, (_, index) => (
							<button 
								key={index + 1} 
								onClick={() => handlePageChange(index + 1)} 
								className={` mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white ${currentPage === index+1 ? "bg-primary-700" : "bg-primary-600"}`}
							>
								{index + 1}
							</button>
							))}

							<button 
							onClick={() => handlePageChange(currentPage + 1)} 
							disabled={currentPage === totalPages}
							className={`${currentPage === totalPages ? 'invisible' : ''} border border-gray-400  inline-flex h-11 px-3 items-center justify-center rounded-full text-gray-700`}
							>
							&rarr;
							</button>
					</div>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
