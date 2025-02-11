'use client'
import {
	AdvancedMarker,
	ControlPosition,
	Map,
	MapControl,
} from '@vis.gl/react-google-maps'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { FC, useEffect, useState } from 'react'
import Checkbox from '@/shared/Checkbox'
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types'

interface MapContainerProps {
	currentHoverID: string | number
	DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[]
	listingType: 'car' | 'experiences' | 'stay'
}

interface ListingData {
	id: string;
	title: string;
	featuredImage: string;
	galleryImgs: string[];
	address: string;
	price: string;
	bedrooms: number;
	bathrooms: number;
	map: {
	  lat: number;
	  lng: number;
	};
  }
  

const MapContainer: FC<MapContainerProps> = ({
	currentHoverID = -1,
	DEMO_DATA,
	listingType,
}) => {

	// const [listings, setListings] = useState<ListingData[]>([])

	// useEffect(() => {
		
	// 	const mappedListings = DEMO_DATA.map((item:any) => ({
	// 	  id: item.id,
	// 	  title: item.name,
	// 	  featuredImage: item.properties.cover_photo,
	// 	  galleryImgs: item.properties.property_photos,
	// 	  address: item.properties.property_address.address_line_1,
	// 	  price: item.properties.property_price.price,
	// 	  bedrooms: item.properties.bedrooms,
	// 	  bathrooms: item.properties.bathrooms,
	// 	  map: {
	// 		lat: item.properties.property_address.latitude,
	// 		lng: item.properties.property_address.longitude,
	// 	  },
	// 	}));
	
	// 	setListings(mappedListings); 
	//   }, []);

	return (
		<>
			{/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}
			<Map
				style={{
					width: '100%',
					height: '100%',
				}}
				defaultZoom={12}
				// defaultCenter={DEMO_DATA[0].map}
				defaultCenter={DEMO_DATA[0].map}
				gestureHandling={'greedy'}
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
			>
				<MapControl position={ControlPosition.TOP_CENTER}>
					<div className="z-10 mt-5 min-w-max rounded-2xl bg-neutral-100 px-4 py-2 shadow-xl dark:bg-neutral-900">
						<Checkbox
							className="text-xs text-neutral-800 xl:text-sm"
							name="search_as_i_move"
							label="Search as I move the map"
						/>
					</div>
				</MapControl>
				{DEMO_DATA.map((item) => (
					<AdvancedMarker
						key={item.id}
						position={item.map}
						clickable
						onClick={() => console.log('clicked')}
					>
						<AnyReactComponent
							isSelected={currentHoverID === item.id}
							key={item.id}
							lat={item.map.lat}
							lng={item.map.lng}
							// car={listingType === 'car' ? (item as CarDataType) : undefined}
							// experiences={
							// 	listingType === 'experiences'
							// 		? (item as ExperiencesDataType)
							// 		: undefined
							// }
							listing={
								listingType === 'stay' ? (item as StayDataType) : undefined
							}
						/>
					</AdvancedMarker>
				))}
			</Map>
		</>
	)
}

export default MapContainer
