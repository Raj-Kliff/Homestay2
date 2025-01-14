import React, { FC } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
	return (
		<>
			<h2 className="text-2xl font-semibold">Choosing listing categories</h2>
			{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
			{/* FORM */}
			<div className="space-y-0" style={{marginTop:'1rem'}}>
				{/* ITEM */}
				<FormItem
					label="Type of House"
					desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
				>
					<Select>
						<option value="Homestay">Homestay - A private house offering accommodation to guests, where the host is staying at the property.</option>
						<option value="Farmstay">Farmstay - Independent house within a working farm with lots of green open spaces.</option>
						<option value="Villa">Independent Villa/ Cottage - A standalone property with caretaker that guest can book as entire home or individual rooms.
						</option>
						<option value="Apartment">Apartment - A whole floor to the guest.
						</option>
					</Select>
				</FormItem>
				<FormItem
					label="Place name"
					desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
				>
					<Input placeholder="Places name" />
				</FormItem>
				{/* <FormItem
					label="Rental form"
					desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
				>
					<Select>
						<option value="Hotel">Entire place</option>
						<option value="Private room">Private room</option>
						<option value="Share room">Share room</option>
					</Select>
				</FormItem> */}
			</div>
		</>
	)
}

export default PageAddListing1
