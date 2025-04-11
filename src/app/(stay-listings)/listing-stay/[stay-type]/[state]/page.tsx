'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "../../../SectionGridFilterCard";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import { useLocation } from "react-use";
import StayCard2Copy from "@/components/StayCard2Copy";
import StayCard2 from "@/components/StayCard2";
import Heading2 from "@/shared/Heading2";

export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState([])
  const {allProperties, setAllProperties} = useImages()
  const [state, setState] = useState<any>()
  const [stayType, setStayType] = useState<any>()

  const location = useLocation()

  const fetchFeaturedPlaces = async () => {
				
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-properties?items&type_items`,{
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
        },
      })
      if (data.status === 'success') {
      setFeaturedPlaces(data.data.properties)
      }
    } catch (error) {
      console.error(error)
    }
}

const fetchFilteredProperties = async () => {
  try {
    
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties-search?state=${state}&type_items=10&items=10&name=${stayType}`,{
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
        },
      })
      if (data.status === 'success') {
        setAllProperties(data?.data?.properties)
      }
  } catch (error) {
    
  }
}

console.log("all prperites:::", allProperties)
console.log("location::", location)
console.log("state", state)
console.log("type", stayType)

useEffect(()=>{
  fetchFilteredProperties()
},[state, stayType])

useEffect(() => {
    if (!location?.pathname) return
  
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length >= 3) {
      setStayType(segments[1])
      setState(segments[2])
    }
  }, [location?.pathname])
  
  

  
//   return <SectionGridFilterCard data={allProperties.length > 0  ? allProperties : featuredPlaces} className="container pb-24 lg:pb-28" />;
return (
    <div
      className={`nc-SectionGridFilterCard container pb-24 lg:pb-28`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading={`Stays in ${state}`} />

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProperties?.map((stay:any,index:number) => (
          <StayCard2 key={index} data={stay} />
        ))}
      </div>

      {!allProperties && 'No Properties Found'}
    </div>
)
};

export default ListingStayPage;
