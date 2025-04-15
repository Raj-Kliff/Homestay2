'use client';
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import { useLocation } from "react-use";
import StayCard2 from "@/components/StayCard2";
import Heading2 from "@/shared/Heading2";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import StayCard2Copy from "@/components/StayCard2Copy";
import SkeletonLoader3 from "@/components/skeleton/SkeletonLoader3";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface ListingStayPageProps { }

const ListingStayPage: FC<ListingStayPageProps> = () => {
    const { allProperties, setAllProperties } = useImages();
    const [city, setCity] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false)
    const [toSlice, setToSlice] = useState<number>(4)


    const location = useLocation();

    const fetchFilteredProperties = async () => {
        if (!city) return;
        try {
            setLoading(true)
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/properties-cities?city=${city}`,
                {
                    headers: { "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY },
                }
            );
            if (data.status === 'success') {
                setLoading(false)
                setAllProperties(data.data.properties);
            } else {
                setAllProperties([]);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleShowMore = () => {
        setShowMoreLoading(true);
      
        setTimeout(() => {
          setToSlice(prev => prev + 8);
          setShowMoreLoading(false);
        }, 1000); // simulate 1 second loading
      };

    useEffect(() => {
        fetchFilteredProperties();
    }, [city]);

    useEffect(() => {
        if (!location?.pathname) return;
        const segments = location.pathname.split('/').filter(Boolean);
        if (segments.length >= 2) {
            setCity(segments[1]);
        }
    }, [location?.pathname]);

    const hasAnyProperties = allProperties?.some((item: any) => item.properties.length > 0);

    if (loading) {
        return (
            <div
                className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
                data-nc-id="SectionGridFilterCard"
            >
                <Heading2 heading={`Stays in ${city || "your location"}`} />

                <SkeletonLoader3 className="h-[300px] rounded-lg" />

            </div>
        )
    }

    return (

        <>
            <div
                className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
                data-nc-id="SectionGridFilterCard"
            >
                <Heading2 heading={`Stays in ${city || "your location"}`} />

                {hasAnyProperties ?

                    <div className="flex w-full justify-start px-4 dark:bg-black relative top-0">
                        <div className="w-full flex-1">
                            <TabGroup>
                                <TabList className="flex gap-4">
                                    {allProperties?.map(({ name, properties }: any) => (
                                        properties.length > 0 &&
                                        <Tab
                                            key={name}
                                            className="rounded-full py-1 px-3 text-sm/6 font-semibold 
                       text-black dark:text-white 
                       focus:outline-none 
                       data-[selected]:bg-black/10 dark:data-[selected]:bg-white/10 
                       data-[hover]:bg-black/5 dark:data-[hover]:bg-white/5"
                                        >
                                            {name}
                                        </Tab>
                                    ))}
                                </TabList>
                                <TabPanels className="mt-3">
                                    {allProperties.map(({ name, properties }: any) => (
                                        properties.length > 0 &&
                                        <TabPanel
                                            key={name}
                                            className="rounded-xl dark:bg-white/5 p-3"
                                        >
                                            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                {properties?.map((stay: any, index: number) => (
                                                    <StayCard2Copy key={index} data={stay} />
                                                ))}
                                            </div>
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </TabGroup>
                        </div>
                    </div>

                    : ""}

        {
          allProperties[0]?.properties?.length === 0 && "No Properties Found"
        }

          {/* Load more button  */}
          {/* {allProperties[0]?.properties?.length > toSlice &&
            <div className="mt-16 flex items-center justify-center">
            <ButtonPrimary loading={showMoreLoading} onClick={handleShowMore}>Show more</ButtonPrimary>
          </div>} */}


            </div>
        </>


    );
};

export default ListingStayPage;
