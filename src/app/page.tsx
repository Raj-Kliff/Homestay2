import React from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import { TaxonomyType } from '@/data/types'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionHowItWork from '@/components/SectionHowItWork'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionVideos from '@/components/SectionVideos'
import SectionClientSay from '@/components/SectionClientSay'
import HoitripsSlider from '@/components/HoitripsSlider'

const DEMO_CATS: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Ladakh',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2023/11/Cover-Pic-9-scaled.jpg',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Andaman',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/2403207/pexels-photo-2403207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Manali',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/5205097/pexels-photo-5205097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Lakshadweep',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://media.istockphoto.com/id/827280706/photo/beach-chairs.jpg?b=1&s=612x612&w=0&k=20&c=oZehsp9ZGJcrkh24yxNSy0eHBeYylMz7BL9-_w5KoZY=',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Goa',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://media.istockphoto.com/id/123384440/photo/panjim-church-goa.jpg?b=1&s=612x612&w=0&k=20&c=qQhlgHwRTiOJ5vVjqNTck3DC6EjpKHFQOWvpaw4YqFg=',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Shimla',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/3574440/pexels-photo-3574440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Nanital',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://media.istockphoto.com/id/484389570/photo/himalayas.jpg?b=1&s=612x612&w=0&k=20&c=ijMJJGOuJzNM1G86P_70jPNCtr4uaYrfLdoTol8_rZU=',
	},
]

const DEMO_CATS_2: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Enjoy the great cold',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Sleep in a floating way',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: "In the traditions house",
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2022/10/Exterior-2-Monolith-Homestay-Manila-Almora.jpg',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Cool in the deep forest',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/Exterior-1.jpeg',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: "In the traditions house",
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2022/10/Exterior-2-Monolith-Homestay-Manila-Almora.jpg',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: "Enjoy the cold Surrounding",
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Cool in the deep forest',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/Exterior-1.jpeg',
	},
]

function PageHome() {
	return (
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
				{/* SECTION HERO */}
				<SectionHero className="pt-10 lg:pb-16 lg:pt-16 lg:-mb-[9rem]" />

				{/* SECTION 1 */}
				<SectionSliderNewCategories categories={DEMO_CATS} />


				{/* <SectionOurFeatures /> */}

				<SectionGridFeaturePlaces cardType="card2" />

				{/* <SectionHowItWork /> */}

				<HoitripsSlider/>

				<div className="relative pt-1 pb-8" style={{marginTop:'2rem'}}>
					<BackgroundSection className="bg-orange-50 dark:bg-black/20" />
					<SectionSliderNewCategories
						categories={DEMO_CATS_2}
						categoryCardType="card4"
						itemPerRow={4}
						heading="Suggestions for Stays"
						subHeading="Popular places to stay that Homestays recommends"
						sliderStyle="style2"
					/>
				</div>

				{/* <SectionSubscribe2 /> */}

				{/* <div className="relative py-16">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div> */}

				<SectionGridCategoryBox />

				<div className="relative py-8" style={{marginTop:'4rem'}}>
					<BackgroundSection />
					<SectionBecomeAnAuthor />
				</div>

				<SectionSliderNewCategories
					heading="Explore more types of stays"
					subHeading="Explore houses based on 10 types of stays"
					categoryCardType="card5"
					itemPerRow={5}
				/>

				{/* <SectionVideos /> */}

				<div className="relative pt-8 pb-0" style={{marginTop:'2rem'}}>
					<BackgroundSection />
					<SectionClientSay />
				</div>
			</div>
		</main>
	)
}

export default PageHome
