'use client'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeaderFilter from './HeaderFilter'
import StayCard from './StayCard'
import StayCard2 from './StayCard2'

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8)

//
export interface SectionGridFeaturePlacesProps {
	stayListings?: any //StayDataType[]
	gridClass?: string
	heading?: ReactNode
	subHeading?: ReactNode
	headingIsCenter?: boolean
	tabs?: string[]
	cardType?: 'card1' | 'card2'
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
	stayListings = DEMO_DATA,
	gridClass = '',
	heading = 'Featured places to stay',
	subHeading = 'Popular places to stay that Homestays recommends for you',
	headingIsCenter,
	// tabs = ['New York', 'Tokyo', 'Paris', 'London'],
	tabs = ['All','Homestay', 'Farmstay', 'Second Home', 'Workstation'],
	cardType = 'card2',
}) => {

	const [currentActiveTab, setCurrentActiveTab] = useState('All')

	function filterListingByTab(tab:any) {
		return stayListings.filter((item:any) => item.name === tab);
	}

	// const [mergedProperties, setMergedProperties] = useState<any[]>([])

	// useEffect(()=>{

	// const allProperties = stayListings.flatMap((item:any) => item.properties);
	// setMergedProperties(allProperties)
	// },[])

 
	
	const filteredProducts = currentActiveTab != "All" ? filterListingByTab(currentActiveTab).slice(0, 8) : stayListings.slice(0, 8);
	console.warn('currentActiveTab ::',currentActiveTab);
	const renderCard = (stay: any) => {
		let CardName = StayCard
		switch (cardType) {
			case 'card1':
				CardName = StayCard
				break
			case 'card2':
				CardName = StayCard2
				break

			default:
				CardName = StayCard
		}

		return <CardName key={stay.id} data={stay} />
	}

	return (
		<div className="nc-SectionGridFeaturePlaces relative" style={{marginTop:'4rem'}}>
			<HeaderFilter
				tabActive={'All'}
				subHeading={subHeading}
				tabs={tabs}
				heading={heading}
				setCurrentActiveTab={setCurrentActiveTab}
			/>
			<div
				className={`grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
			>

				{filteredProducts.map((stay:any) => renderCard(stay))}
				{/* {stayListings.map((stay:any) => renderCard(stay))} */}

			</div>
			{/* <div className="mt-16 flex items-center justify-center">
				<ButtonPrimary loading>Show me more</ButtonPrimary>
			</div> */}
		</div>
	)
}

export default SectionGridFeaturePlaces
