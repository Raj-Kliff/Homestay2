'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "../../../SectionGridFilterCard";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import { useLocation } from "react-use";
import StayCard2Copy from "@/components/StayCard2Copy";
import StayCard2 from "@/components/StayCard2";
import Heading2 from "@/shared/Heading2";
import SkeletonLoader3 from "@/components/skeleton/SkeletonLoader3";

export interface ListingStayPageProps { }
const itemsPerPage = 20;

const ListingStayPage: FC<ListingStayPageProps> = () => {

  const { allProperties, setAllProperties } = useImages()
  const [state, setState] = useState<any>()
  const [stayType, setStayType] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)


  // pagination 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(allProperties?.length / itemsPerPage);
  const currentItems = allProperties?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxPageNumbers = 3; // Limit the number of page numbers displayed
    const half = Math.floor(maxPageNumbers / 2);

    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      startPage = 1;
      endPage = Math.min(maxPageNumbers, totalPages);
    } else if (currentPage + half >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
      endPage = totalPages;
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageChange(1)} className="mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white bg-primary-600">
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis" className="mx-1 text-gray-500">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white ${currentPage === i ? "bg-primary-700" : "bg-primary-600"
            }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis" className="mx-1 text-gray-500">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white bg-primary-600"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  // pagination end 

  const location = useLocation()

  const fetchFilteredProperties = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties-search?state=${state}&name=${stayType}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      })
      if (data.status === 'success') {
        setLoading(false)
        setAllProperties(data?.data?.properties)
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false)
    }
  }

  console.log("all prperites:::", allProperties)
  console.log("location::", location)
  console.log("state", state)
  console.log("type", stayType)

  useEffect(() => {
    fetchFilteredProperties()
  }, [state, stayType])

  useEffect(() => {
    if (!location?.pathname) return

    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length >= 3) {
      setStayType(segments[1])
      setState(segments[2])
    }
  }, [location?.pathname])


  const hasAnyProperties = allProperties?.some((item: any) => item.properties.length > 0);

  if (loading) {
    return (
      <div
        className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
        data-nc-id="SectionGridFilterCard"
      >
        <Heading2 heading={`Stays in ${state || "your location"}`} />

        <SkeletonLoader3 className="h-[300px] rounded-lg" />

      </div>
    )
  }

  //   return <SectionGridFilterCard data={allProperties.length > 0  ? allProperties : featuredPlaces} className="container pb-24 lg:pb-28" />;
  return (
    <div
      className={`nc-SectionGridFilterCard container pb-24 lg:pb-28`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading={`Stays in ${state}`} />

      {hasAnyProperties ?

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProperties?.map((stay: any, index: number) => (
            <StayCard2 key={index} data={stay} />
          ))}
        </div>

        : "No Properties Found"}

      {/* pagination  */}
      {
        hasAnyProperties &&
        <div className="mt-16 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`inline-flex h-11 px-3 items-center justify-center border border-gray-400 rounded-full text-gray-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              &larr;
            </button>

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`inline-flex h-11 px-3 items-center justify-center border border-gray-400 rounded-full text-gray-700 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              &rarr;
            </button>
          </div>
        </div>
      }

    </div>
  )
};

export default ListingStayPage;
