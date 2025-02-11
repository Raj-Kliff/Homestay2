'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridHasMap from "../SectionGridHasMap";
import axios from "axios";

export interface ListingStayMapPageProps {}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({}) => {

  const [featuredPlaces, setFeaturedPlaces] = useState<any>([]);

  const fetchFeaturedPlaces = async () => {
	  try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-properties?items&type_items`, {
		  headers: {
			"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		  },
		});
		if (data.status === 'success') {
		  setFeaturedPlaces(data.data.properties);
		}
	  } catch (error) {
		console.error(error);
	  }
	};

  useEffect(()=>{
    fetchFeaturedPlaces()
  },[])

  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap stayListings={featuredPlaces} />
    </div>
  );
};

export default ListingStayMapPage;
