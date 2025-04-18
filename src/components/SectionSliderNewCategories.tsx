'use client'

import React, { FC, useEffect, useState } from 'react'
import { TaxonomyType } from '@/data/types'
import CardCategory3 from '@/components/CardCategory3'
import CardCategory4 from '@/components/CardCategory4'
import CardCategory5 from '@/components/CardCategory5'
import Heading from '@/shared/Heading'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import PrevBtn from './PrevBtn'
import NextBtn from './NextBtn'
import { variants } from '@/utils/animationVariants'
import { useWindowSize } from 'react-use'

export interface SectionSliderNewCategoriesProps {
	className?: string
	itemClassName?: string
	heading?: string
	subHeading?: string
	categories?: any
	categoryCardType?: 'card3' | 'card4' | 'card5'
	itemPerRow?: 4 | 5
	sliderStyle?: 'style1' | 'style2'
}

const DEMO_CATS: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Homestays',
		taxonomy: 'category',
		count: 17288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/Dininig-Area-Miyawaki-Magic-Homestay-Wargal-Secunderabad.jpg',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Farmstay',
		taxonomy: 'category',
		count: 2118,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2023/11/Brewtiful-Heritage-Bungalow-Belur.jpg',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Second Home',
		taxonomy: 'category',
		count: 36612,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2020/02/Cover-Pic-3.jpg',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Workation',
		taxonomy: 'category',
		count: 18188,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/workation.jpeg',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Dome House',
		taxonomy: 'category',
		count: 22288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/second-home.jpeg',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Second Home',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2020/02/Cover-Pic-3.jpg',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Farmstay',
		taxonomy: 'category',
		count: 2118,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/farmstay.jpeg',
	},
]

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
	heading = 'Popular Destinations',
	subHeading = 'Popular destinations to recommends for you',
	className = '',
	itemClassName = '',
	categories = DEMO_CATS,
	itemPerRow = 5,
	categoryCardType = 'card3',
	sliderStyle = 'style1',
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [numberOfItems, setNumberOfitem] = useState(0)

	const windowWidth = useWindowSize().width
	useEffect(() => {
		if (windowWidth < 320) {
			return setNumberOfitem(1)
		}
		if (windowWidth < 500) {
			return setNumberOfitem(itemPerRow - 3)
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(itemPerRow - 2)
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(itemPerRow - 1)
		}

		setNumberOfitem(itemPerRow)
	}, [itemPerRow, windowWidth])

	function changeItemId(newVal: number) {
		if (newVal > currentIndex) {
			setDirection(1)
		} else {
			setDirection(-1)
		}
		setCurrentIndex(newVal)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < categories?.length - 1) {
				changeItemId(currentIndex + 1)
			}
		},
		onSwipedRight: () => {
			if (currentIndex > 0) {
				changeItemId(currentIndex - 1)
			}
		},
		trackMouse: true,
	})

	const renderCard = (item: any) => {
		
		switch (categoryCardType) {
			case 'card3':
				return <CardCategory3 taxonomy={item} />
			case 'card4':
				return <CardCategory4 taxonomy={item} />
			case 'card5':
				return <CardCategory5 taxonomy={item} />
			default:
				return <CardCategory3 taxonomy={item} />
		}
	}

	if (!numberOfItems) return null

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`} style={{marginTop:'2rem'}}>
			<Heading desc={subHeading} isCenter={sliderStyle === 'style2'}>
				{heading}
			</Heading>
			<MotionConfig
				transition={{
					x: { type: 'spring', stiffness: 300, damping: 30 },
					opacity: { duration: 0.2 },
				}}
			>
				<div className={`relative flow-root`} {...handlers}>
					<div className={`flow-root overflow-hidden rounded-xl`}>
						<motion.ul
							initial={false}
							className="relative -mx-2 whitespace-nowrap xl:-mx-4"
						>
							<AnimatePresence initial={false} custom={direction}>
								{categories.map((item:any, indx:any) => (
									<motion.li
										className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
										custom={direction}
										initial={{
											x: `${(currentIndex - 1) * -100}%`,
										}}
										animate={{
											x: `${currentIndex * -100}%`,
										}}
										variants={variants(200, 1)}
										key={indx}
										style={{
											width: `calc(1/${numberOfItems} * 100%)`,
										}}
									>
										{renderCard(item)}
									</motion.li>
								))}
							</AnimatePresence>
						</motion.ul>
					</div>

					{currentIndex ? (
						<PrevBtn
							style={{ transform: 'translate3d(0, 0, 0)' }}
							onClick={() => changeItemId(currentIndex - 1)}
							className="absolute -left-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-left-6 xl:h-12 xl:w-12"
						/>
					) : null}

					{categories.length > currentIndex + numberOfItems ? (
						<NextBtn
							style={{ transform: 'translate3d(0, 0, 0)' }}
							onClick={() => changeItemId(currentIndex + 1)}
							className="absolute -right-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-right-6 xl:h-12 xl:w-12"
						/>
					) : null}
				</div>
			</MotionConfig>
		</div>
	)
}

export default SectionSliderNewCategories
