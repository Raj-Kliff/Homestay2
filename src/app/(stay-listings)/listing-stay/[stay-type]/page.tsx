'use client'
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import { useLocation } from "react-use";
import StayCard2 from "@/components/StayCard2";
import Heading2 from "@/shared/Heading2";

export interface ListingStayPageProps { }

const ListingStayPage: FC<ListingStayPageProps> = () => {
    const { allProperties, setAllProperties } = useImages()
    const [state, setState] = useState<any>()

    const location = useLocation()


    const fetchFilteredProperties = async () => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties-search?state=${state}`, {
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

    console.log("setall prperites:::", allProperties)
    console.log("location::", location)
    console.log("state", state)

    useEffect(() => {
        fetchFilteredProperties()
    }, [state])

    useEffect(() => {
        if (!location?.pathname) return

        const segments = location.pathname.split('/').filter(Boolean)
        if (segments.length >= 2) {
            setState(segments[1])
        }
    }, [location?.pathname])


    return (
        <div
            className={`nc-SectionGridFilterCard container pb-24 lg:pb-28`}
            data-nc-id="SectionGridFilterCard"
        >
            <Heading2 heading={`Stays in ${state}`} />

            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allProperties?.map((stay: any, index: number) => (
                    <StayCard2 key={index} data={stay} />
                ))}
            </div>

            {!allProperties && 'No Properties Found'}
        </div>
    )
};

export default ListingStayPage;
