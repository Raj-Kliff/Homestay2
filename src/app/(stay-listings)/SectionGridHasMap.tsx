'use client'

import { FC, useState } from 'react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import MapContainer from '@/components/MapContainer'
import { MapIcon } from '@heroicons/react/24/outline'
import StayCard2Copy from '@/components/StayCard2Copy'

const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12)
export interface SectionGridHasMapProps {
	stayListings: any
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({stayListings}) => {
	const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
	const [showFullMapFixed, setShowFullMapFixed] = useState(false)

	return (
		<div>
			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]">
					<Heading2 className="!mb-8" />
					<div className="mb-8 lg:mb-11">
						<TabFilters />
					</div>
					<div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6">
						{stayListings.map((item:any) => (
							<div
								key={item.id}
								onMouseEnter={() => setCurrentHoverID((_) => item.id)}
								onMouseLeave={() => setCurrentHoverID((_) => -1)}
							>
								<StayCard2Copy data={item} />
							</div>
						))}
					</div>
					<div className="mt-16 flex items-center justify-center">
						<Pagination />
					</div>
				</div>

				{!showFullMapFixed && (
					<div
						className={`fixed bottom-16 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl md:bottom-8 xl:hidden`}
						onClick={() => setShowFullMapFixed(true)}
					>
						<MapIcon className="h-5 w-5" />
						<span>Show map</span>
					</div>
				)}

				{/* MAPPPPP */}
				<div
					className={`xl:static xl:block xl:flex-1 ${
						showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
					}`}
				>
					{showFullMapFixed && (
						<ButtonClose
							onClick={() => setShowFullMapFixed(false)}
							className="absolute left-3 top-3 z-50 h-10 w-10 rounded-xl bg-white shadow-lg"
						/>
					)}

					<div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<MapContainer
							currentHoverID={currentHoverID}
							DEMO_DATA={DEMO_STAYS}
							DEMO_DATA2={stayListings}
							listingType="stay"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SectionGridHasMap
