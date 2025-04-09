'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import {
	ArrowRightIcon,
	MapPinIcon,
	Squares2X2Icon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Amenities_demos, PHOTOS, Activities_demos, Local_attraction_demos, Excursions_attraction_demos } from './constant'
import { Route } from 'next'
import axios from 'axios'
import GuestsInput from './GuestInput'
import StayDatesRangeInput from './StayDateRangeInput'
import SectionDateRange from '../../SectionDateRange'
import GoogleMapComponent from '@/components/GoogleMapComponent'
import { useImages } from '@/app/contextApi/ImageContext'
import GallerySlider2 from '@/components/GallerySlider2'
import GallerySlider from '@/components/GallerySlider'
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaBaby } from "react-icons/fa";
import CustomRoomModal from './CustomRoomModal'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import PriceCalculator from './PriceCalculator'

export interface ListingStayDetailPageProps { }


const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ }) => {
	//

	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)
	const [listingDetail, setListingDetail] = useState<any>({})
	const [daysToStay, setDaysToStay] = useState<number>(1)
	const [totalFee, setTotalFee] = useState<number>(0)
	const { setImagess } = useImages()
	const [activeModal, setActiveModal] = useState<number | null>(null);
	const [categorizedRooms, setCategorizeRooms] = useState<any>([])
	const [roomPrice, setRoomPrice] = useState<number>(0)
	const [selectedRooms, setSelectedRooms] = useState<any>({});
	const [propertyDates, setPropertyDates] = useState<any>([]);
	const [currentActiveRoom, setCurrentActiveRoom] = useState<any>({
		type: '',
		count: 1,
	})
	const [surgedPrice, setSurgedPrice] = useState<any>()

	const getRoomPrice = (currentActiveRoom: any) => {
		const price = listingDetail?.rooms?.find((room: any) => room?.room_type?.name.toLowerCase() === currentActiveRoom?.toLowerCase())?.room_price
		return price;
	}

	const currentroomPrice = getRoomPrice(currentActiveRoom?.type || 'Classic')

	// calender variables 
	const [startDate, setStartDate] = useState<any>(
		new Date(),
	)
	// const [endDate, setEndDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	});

	const categories = [
		{
			name: 'Classic',
			posts: [
				{
					id: 1,
					title: 'Does drinking coffee make you smarter?',
					date: '5h ago',
					commentCount: 5,
					shareCount: 2,
					imageUrl: [
						"https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=612x612&w=0&k=20&c=UHeb1pGOw6ozr6utsenXHhV19vW6oiPIxDqhKCS2Llk=",
						"https://st5.depositphotos.com/23188010/77062/i/450/depositphotos_770624600-stock-photo-green-field-morning-render-illustration.jpg",
					]
				},
			],
		},
		{
			name: 'Superior',
			posts: [
				{
					id: 1,
					title: 'Is tech making coffee better or worse?',
					date: 'Jan 7',
					commentCount: 29,
					shareCount: 16,
					imageUrl: [
						"https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
						"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s",
						"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
					]
				},
				{
					id: 2,
					title: 'The most innovative things happening in coffee',
					date: 'Mar 19',
					commentCount: 24,
					shareCount: 12,
					imageUrl: [
						"https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
						"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
						"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
					]
				},
			],
		},
		{
			name: 'Family',
			posts: [
				{
					id: 1,
					title: 'Ask Me Anything: 10 answers to your questions about coffee',
					date: '2d ago',
					commentCount: 9,
					shareCount: 5,
					imageUrl: [
						"https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
						"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
						"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
					]
				},
				{
					id: 2,
					title: "The worst advice we've ever heard about coffee",
					date: '4d ago',
					commentCount: 1,
					shareCount: 2,
					imageUrl: [
						"https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
						"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
						"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
					]
				},
			],
		},
	]


	const thisPathname = usePathname()
	let endPoint = thisPathname.split('/').pop();
	const router = useRouter()


	function closeModalAmenities() {
		setIsOpenModalAmenities(false)
	}

	function openModalAmenities() {
		setIsOpenModalAmenities(true)
	}

	const handleOpenModalImageGallery = () => {
		router.push(`${endPoint}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const handleRoomChange = (roomType: any, pricePerRoom: any, newSelectedRooms: any) => {
		const prevSelectedRooms = selectedRooms[roomType] || 0;

		// Calculate the price difference
		const priceDifference = (newSelectedRooms - prevSelectedRooms) * pricePerRoom;

		// Update the state with the new selection
		setSelectedRooms((prevState: any) => ({
			...prevState,
			[roomType]: newSelectedRooms,
		}));

		// Update the total price
		setRoomPrice((prevTotal: any) => prevTotal + priceDifference);
	};

	const calculateTotalFee = () => {
		// const price = listingDetail?.result?.property_price?.price ?? 0;
		const guestFee = listingDetail?.result?.property_price?.guest_fee ?? 0;
		const securityFee = listingDetail?.result?.property_price?.security_fee ?? 0;
		// const cleaningFee = listingDetail?.result?.property_price?.cleaning_fee ?? 0;
		const totalDays = daysToStay;

		// Calculate total fee
		const total = (roomPrice * totalDays) + guestFee + securityFee;

		// Set the total fee
		setTotalFee(total);
	}

	// const calculateTotalFee = () => {
	// 	const guestFee = listingDetail?.result?.property_price?.guest_fee ?? 0;
	// 	const securityFee = listingDetail?.result?.property_price?.security_fee ?? 0;
	// 	const totalDays = daysToStay;

	// 	// Loop through each date in the range
	// 	let totalRoomPrice = 0;
	// 	let currentDate = new Date(startDate);

	// 	for (let i = 0; i < totalDays; i++) {
	// 	  const dateStr = currentDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
	// 	  const datePrice = propertyDates.find((item: any) => item.date === dateStr)?.price || roomPrice;

	// 	  totalRoomPrice += datePrice;
	// 	  currentDate.setDate(currentDate.getDate() + 1); // Move to next date
	// 	}

	// 	const total = totalRoomPrice + guestFee + securityFee;
	// 	setTotalFee(total);
	//   };


	useEffect(() => {
		calculateTotalFee()
	}, [listingDetail, daysToStay, roomPrice, startDate, endDate])

	// ---------------
	// const [listingDetail, setListingDetail] = useState<any>({})
	const [listingDescription, setListingDescription] = useState<any>()

	// propety list 
	const fetchListingDetails = useCallback(async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${endPoint}`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			});
			if (data.status === 'success') {
				setListingDetail(data.data);
				setPropertyDates(data?.data?.result?.property_dates || []);
				const rooms = categorizeRooms(data?.data?.rooms)
				setCategorizeRooms(rooms)
				const photos = data.data.result?.property_photos?.map((photo: any) => photo.image_url);
				setImagess(photos || [])
			}
		} catch (error) {
			console.error(error);
		}
	}, [endPoint])

	// propety list description
	const fetchListingDescription = useCallback(async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property-details/${endPoint}`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			});
			if (data.status === 'success') {
				setListingDescription(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, [endPoint])

	useEffect(() => {
		fetchListingDetails()
		fetchListingDescription()
	}, [fetchListingDetails, fetchListingDescription])

	// group room of each category seperately 
	const categorizeRooms = (rooms: any) => {
		const categorized: any = {}

		for (const room of rooms) {
			const roomType = room?.room_type?.name;

			if (!categorized[roomType]) {
				categorized[roomType] = {
					room_type: roomType,
					room_price: room.room_price,
					beds: room.beds,
					bathrooms: room.bathrooms,
					total_rooms: 1
				}
			} else {
				categorized[roomType].total_rooms += 1;
			}
		}

		return Object.values(categorized);
	}

	const renderSection1 = ({ result }: any) => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				{/* <div className="flex items-center justify-between">
					<Badge name="Wooden house" />
					<LikeSaveBtns />
				</div> */}

				{/* 2 */}
				<h2 className="text-2xl flex gap-2 font-semibold sm:text-3xl lg:text-4xl">
					{result?.name}
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<div className="flex items-start">
						<MapPinIcon className="h-5 w-5" />
						<span className="ml-1">  {result?.property_address?.address_line_1}</span>
					</div>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar imgUrl={result?.users?.profile_src} hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<div className="flex gap-2 ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="flex gap-2 font-medium text-neutral-900 dark:text-neutral-200">
							{result?.host_name} <StartRating reviewCount={result?.reviews_count} point={result?.avg_rating} />
						</span>
					</div>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					{
						result?.bedrooms > 0 &&
						<div className="flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-6 w-6"
							>
								<path
									d="M3 22H21"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M4 22V6C4 2.69067 4.78933 2 8.57143 2H15.4286C19.2107 2 20 2.69067 20 6V22"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.92 11.7592V9.85424C13.92 8.8324 13.0604 8.00403 12 8.00403C10.9396 8.00403 10.08 8.8324 10.08 9.85424V11.7592M15 14.0843C15 15.6952 13.6462 17.004 12 17.004C10.3538 17.004 9 15.6952 9 14.0843C9 12.374 10.3538 11.0739 12 11.0739C13.6462 11.0739 15 12.374 15 14.0843Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className=" ">
								<span className="hidden sm:inline-block">No. of rooms: </span> {result?.bedrooms}
							</span>
						</div>
					}

					{
						result?.accommodates > 0 &&
						<div className="flex items-center space-x-3">
							<UsersIcon className="h-6 w-6" />
							<span className="">
								<span className="hidden sm:inline-block">Total Capacity:</span> {result?.accommodates}
							</span>
						</div>
					}

					{
						result?.beds > 0 &&
						<div className="flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-6 w-6"
							>
								<path
									d="M22 17.5H2"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className=" ">
								{result?.beds} <span className="hidden sm:inline-block">beds</span>
							</span>
						</div>
					}

					{
						result?.bathrooms > 0 &&
						<div className="flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-6 w-6"
							>
								<path
									d="M6 20L5 21M18 20L19 21"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M2 12H22"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M8 6L10.5 4"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className=" ">
								{result?.bathrooms} <span className="hidden sm:inline-block">baths</span>
							</span>
						</div>
					}


				</div>
			</div>
		)
	}

	const renderSection2 = ({ description }: any) => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Stay information</h2>
				{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
				<div className="text-neutral-600 dark:text-neutral-300">
					<span>
						{description?.summary}
					</span>
				</div>
			</div>
		)
	}

	// amenities 
	const renderSection3 = ({ amenities }: any) => {

		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Facilities </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's amenities and services`}
					</span>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap">
					{amenities?.Facilities?.filter((_: any, i: any) => i < 12).map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg> */}
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item.title}</span>
						</div>
					))}
				</div>

				{/* ----- */}
				<div className="w-14 border-b border-neutral-200"></div>
				<div>
					<ButtonSecondary onClick={openModalAmenities}>
						{/* <ButtonSecondary onClick={() => { 
						openModalAmenities();
						renderModalAmenities(listingDetail?.amenities); 
					}}> */}
						View more amenities
					</ButtonSecondary>
				</div>
				{renderModalAmenities()}
			</div>
		)
	}

	const renderModalAmenities = () => {
		return (
			<Dialog
				open={isOpenModalAmenities}
				onClose={closeModalAmenities}
				className="relative z-50 hidden lg:block"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-black/50 duration-200 ease-out data-[closed]:opacity-0"
				/>
				<div className="fixed inset-0 flex max-h-screen w-screen items-center justify-center p-4">
					<DialogPanel
						className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl duration-200 ease-out data-[closed]:translate-y-16 data-[closed]:opacity-0 dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
						transition
					>
						<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
							<DialogTitle
								as="h3"
								className="text-lg font-medium leading-6 text-gray-900"
							>
								Amenities
							</DialogTitle>
							<span className="absolute left-3 top-3">
								<ButtonClose onClick={closeModalAmenities} />
							</span>
						</div>

						<div className="hiddenScrollbar flex-1 divide-y divide-neutral-200 overflow-y-auto px-8 text-neutral-700 dark:divide-neutral-700 dark:text-neutral-300">
							{listingDetail?.amenities?.Facilities?.map((item: any) => (
								<div
									key={item?.id}
									className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<span>{item?.title}</span>
								</div>
							))}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		)
	}

	const renderSafetyAmenities = ({ amenities }: any) => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Safety Amentites </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's safety amenities and services`}
					</span>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap">
					{amenities?.SafetyAmenities?.map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item.title}</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Monday - Thursday</span>
							<span>₹199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Monday - Thursday</span>
							<span>₹199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Friday - Sunday</span>
							<span>₹219</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Rent by month</span>
							<span>-8.34 %</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Minimum number of nights</span>
							<span>1 night</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Max number of nights</span>
							<span>90 nights</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection5 = ({ result }: any) => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							{result?.users?.first_name} {result?.users?.last_name}
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							{/* <span className="mx-2">·</span>
							<span> 12 places</span> */}
						</div>
					</div>
				</div>


				{/* info */}
				{
					result?.users?.description &&
					<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
						<h2 className='text-black font-bold'>Description:</h2>
						<p>{result?.users?.description}</p>
					</div>
				}

				{/* == */}
				{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/author">See host profile</ButtonSecondary>
				</div> */}
			</div>
		)
	}

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}

	const renderSection7 = ({ result }: any) => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">How to reach</h2>
					<div className="text-neutral-600 dark:text-neutral-300">
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							{description?.place_is_great_for}
						</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 overflow-hidden rounded-xl">
						{/* <iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe> */}

						<GoogleMapComponent latitude={result?.property_address?.latitude || 0.0} longitude={result?.property_address?.longitude || 0.0} />
					</div>
				</div>
			</div>
		)
	}

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					{description?.interaction_guests}
				</div>
			</div>
		)
	}

	const renderSection9 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Child Policy</h2>

				{/* CONTENT */}
				<div>
					{description?.about_place}
				</div>
			</div>
		)
	}

	const renderSection10 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Foods</h2>

				{/* CONTENT */}
				<div>
					<span className="block text-neutral-600 dark:text-neutral-300">
						{description?.guest_can_access}
					</span>
				</div>
			</div>
		)
	}

	const renderSection11 = ({ description }: any) => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Activities </h2>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap">
					{description?.guestsactivity?.map((item: any, index: number) => (
						<div key={index} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item}</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSection12 = ({ attractions }: any) => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Local Attractions </h2>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap">
					{attractions?.filter((_: any, i: number) => i < 12).map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item?.name} ({item?.property_distance})</span>
						</div>
					))}
				</div>
			</div>
		)
	}


	const renderSection13 = ({ excursions }: any) => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Excursions </h2>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap">
					{excursions?.filter((_: any, i: number) => i < 12).map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item?.name} ({item?.property_distance})</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSidebar = ({ result }: any) => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-xl font-semibold">
						{/* {result?.property_price?.currency_code} {result?.property_price?.price} */}
						₹{roomPrice}
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					<StartRating point={result?.avg_rating} reviewCount={result?.reviews_count} />
				</div>


				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
					<StayDatesRangeInput setDaysToStay={setDaysToStay} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} className="z-[11] flex-1" />
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<GuestsInput className="flex-1" />
				</form>

				{/* SUM */}
				{
					roomPrice !== 0 &&
					<div className="flex flex-col space-y-4">
						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>₹ {roomPrice} x {daysToStay} night</span>
							<span>₹ {roomPrice * daysToStay}</span>
						</div>
						{surgedPrice - (roomPrice * daysToStay) > 0 && 
						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>Surge Price</span>
							<span>₹ {surgedPrice - (roomPrice * daysToStay)}</span>
						</div>}
						{/* {result?.property_price?.cleaning_fee >= 0 &&
						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>Cleaning Fee</span>
							<span>₹{result?.property_price?.cleaning_fee}</span>
						</div>
					} */}
						{/* {result?.property_price?.security_fee > 0 &&
							<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
								<span>Security Fee</span>
								<span>₹{result?.property_price?.security_fee}</span>
							</div>
						}
						{result?.property_price?.guest_fee > 0 &&
							<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
								<span>Guest Fee</span>
								<span>₹{result?.property_price?.guest_fee}</span>
							</div>
						} */}
						<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
						<div className="flex justify-between font-semibold">
							<span>Total</span>
							<span className='flex'>₹<PriceCalculator startDate={startDate} endDate={endDate} normalFare={roomPrice} propertyDates={propertyDates} setSurgedPrice={setSurgedPrice} /></span>
						</div>
					</div>
				}

				{/* SUBMIT */}
				<ButtonPrimary href={'/checkout'}>Reserve</ButtonPrimary>
			</div>
		)
	}


	const renderRoomSection = ({ rooms }: any) => {
		return (
			<>
				<div className='listingSection__wrap'>
					{
						categorizedRooms?.map((item: any) => (
							<div className="flex w-full justify-center border-t first:border-t-0" key={item?.room_type}>
								<div className="w-full">
									<div className="mt-3 space-y-3">
										<div className="flex items-start justify-between">
											<div>
												<p className="text-xl font-bold">
													{item?.room_type}
												</p>
												<div className="flex items-center justify-between space-x-5 mt-3 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start">
													<div className="text-center">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															width={24}
															height={24}
															color={'currentColor'}
															fill={'none'}
															className="h-6 w-6"
														>
															<path
																d="M22 17.5H2"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
															/>
															<path
																d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
															/>
														</svg>
														<p>x {item?.beds}</p>
													</div>
													<div className="text-center">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															width={24}
															height={24}
															color={'currentColor'}
															fill={'none'}
															className="h-6 w-6"
														>
															<path
																d="M6 20L5 21M18 20L19 21"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
															/>
															<path
																d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M2 12H22"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
															/>
															<path
																d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
															/>
															<path
																d="M8 6L10.5 4"
																stroke="currentColor"
																strokeWidth="1.5"
																strokeLinecap="round"
															/>
														</svg>
														<p>x 1 ({item?.bathrooms})</p>
													</div>
												</div>
											</div>
											<div className="flex items-start flex-col">
												<p className="text-base font-semibold">
													₹{item?.room_price} <span className="text-sm text-neutral-500 dark:text-neutral-400">/1 nights</span>
												</p>
												<form>
													<select
														id="rooms"
														className="bg-gray-50 w-full min-w-[9rem] my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														onChange={(e) => {
															if (parseInt(e.target.value) == 0) {
																setCurrentActiveRoom({ type: '', count: 1 })
																setRoomPrice(0)
															} else {
																const selectedRooms = parseInt(e.target.value);
																setCurrentActiveRoom({ type: item?.room_type, count: 0 })
																// handleRoomChange(item?.room_type, item?.room_price, selectedRooms);
																setRoomPrice(parseInt(e.target.value) * item?.room_price)
															}
														}}
														// disabled={currentActiveRoom.type !== item?.room_type && currentActiveRoom.count == 0}
													>
														<option value='0' selected>Select Room</option>
														{[...Array(item?.total_rooms)].map((_, index) => {
															const value = index + 1;
															return (
																<option key={value} value={`${value} room`}>
																	{value} Room
																</option>
															);
														})}
													</select>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</>
		)
	}

	const renderRoomSection1 = () => {
		return (
			<div className='listingSection__wrap'>
				<div className="flex w-full justify-center">
					<div className="w-full">
						<TabGroup>
							<TabList className="flex gap-4">
								{categories.map(({ name }) => (
									<Tab
										key={name}
										className="rounded-full px-5 text-lg font-semibold text-gray-800 dark:text-white 
									focus:outline-none data-[selected]:bg-gray-300 data-[hover]:bg-gray-200 
									data-[selected]:data-[hover]:bg-gray-200 dark:data-[selected]:bg-white/10 
									dark:data-[hover]:bg-white/5 dark:data-[selected]:data-[hover]:bg-white/10 
									data-[focus]:outline-1 data-[focus]:outline-gray-800 dark:data-[focus]:outline-white"
									>
										{name}
									</Tab>
								))}
							</TabList>
							<TabPanels>
								{categories.map(({ name, posts }) => (
									<TabPanel key={name} className="rounded-xl">
										{posts.map((post) => (
											<div key={post.id} className='pt-5'>
												<div className="nc-StayCard2 grid grid-cols-1 sm:grid-cols-3 gap-5 group relative w-full border-t border-neutral-200 dark:border-neutral-800 pt-5">
													<div className="relative w-full">
														<GallerySlider
															uniqueID="StayCard2_sampleID"
															ratioClass="aspect-w-12 aspect-h-9"
															galleryImgs={post.imageUrl}
															imageClass="rounded-lg"
															href="javascript:void(0)"
														/>
														<div className='mt-2' onClick={() => setActiveModal(post.id)}>
															<Badge name={`${post.imageUrl.length} Photos →`} color="red" className='cursor-pointer' />
														</div>
													</div>

													<div className='col-span-2'>
														<div className="mt-3 space-y-3">

															<div className="flex items-start justify-between">
																<div>
																	<p className="text-base font-semibold">
																		Single Room
																	</p>
																	<div className="flex items-center justify-between space-x-5 mt-3 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start">
																		<div className="text-center">
																			<IoBedOutline className='w-5 h-5' />
																			<p>x 1</p>
																		</div>
																		<div className="text-center">
																			<HiOutlineUsers className='w-5 h-5' />
																			<p>x 2</p>
																		</div>
																		<div className="text-center">
																			<FaBaby className='w-5 h-5' />
																			<p>x 1</p>
																		</div>
																	</div>
																</div>
																<div className="flex items-start flex-col">
																	<p className="text-base font-semibold">
																		₹1.00 <span className="text-sm text-neutral-500 dark:text-neutral-400">/1 nights</span>
																	</p>
																	<form>
																		<select
																			id="rooms"
																			className="bg-gray-50 w-full min-w-[9rem] my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
																		>
																			<option value="1 room">1 Room</option>
																			<option value="2 room">2 Room</option>
																		</select>
																	</form>
																	<ButtonPrimary sizeClass="px-4 py-2 sm:px-5">Enquire Now</ButtonPrimary>
																</div>
															</div>
														</div>
													</div>
												</div>

												{/* room modal image gallery  */}
												<CustomRoomModal
													key={post.id}
													isOpen={activeModal === post.id}
													closeModal={() => setActiveModal(null)}
													title={`${name} Room`}
												>
													<GallerySlider
														uniqueID="StayCard2_sampleID"
														ratioClass="aspect-w-12 aspect-h-9"
														galleryImgs={post.imageUrl}
														imageClass="rounded-lg"
														href="javascript:void(0)"
													/>
												</CustomRoomModal>
											</div>
										))}
									</TabPanel>
								))}
							</TabPanels>
						</TabGroup>
					</div>
				</div>

			</div>


		)
	}

	const { result, amenities, attractions, excursions, rooms } = listingDetail ?? {}; // Use nullish coalescing (??) to provide a fallback empty object
	const { description } = listingDescription ?? {};


	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl mt-3">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					<div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={result?.cover_photo}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{result?.property_photos?.filter((_: any, i: any) => i >= 1 && i < 5).map((item: any, index: any) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${index >= 3 ? 'hidden sm:block' : ''
								}`}
						>
							<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
								<Image
									fill
									className="rounded-md object-cover sm:rounded-xl"
									src={item.image_url || ''}
									alt=""
									sizes="400px"
								/>
							</div>

							{/* OVERLAY */}
							<div
								className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
								onClick={handleOpenModalImageGallery}
							/>
						</div>
					))}

					<button
						className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							Show all photos
						</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className={`relative ${activeModal == null ? 'z-10' : 'z-40'} mt-11 flex flex-col lg:flex-row`}>
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1({ result })}
					{rooms?.length > 0 && renderRoomSection({ rooms })}
					{renderSection2({ description })}
					{renderSection7({ result })}
					{description?.about_place != null && renderSection9()}
					{renderSection3({ amenities })}
					{amenities?.SafetyAmenities.length > 0 && renderSafetyAmenities({ amenities })}
					{/* {renderSection4()} */}
					<SectionDateRange
						setRoomPrice={setRoomPrice}
						propertyDates={result?.property_dates}
						//  previousPrice={result?.property_price?.price}
						previousPrice={currentroomPrice}
						setDaysToStay={setDaysToStay}
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate} />
					{renderSection10()}
					{description?.guestsactivity?.length > 0 && renderSection11({ description })}
					{attractions?.length > 0 && renderSection12({ attractions })}
					{excursions?.length > 0 && renderSection13({ excursions })}
					{renderSection5({ result })}
					{renderSection6()}
					{description?.interaction_guests && renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					{roomPrice > 0 && <div className="sticky top-28">{renderSidebar({ result })}</div>}
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage
