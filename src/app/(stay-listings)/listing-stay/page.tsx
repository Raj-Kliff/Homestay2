'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import axios from "axios";

export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState([])
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

useEffect(()=>{
  fetchFeaturedPlaces()
},[])

  return <SectionGridFilterCard data={featuredPlaces} className="container pb-24 lg:pb-28" />;
};

export default ListingStayPage;
