import React, { useEffect, useRef } from 'react'
import { FormContainerType, useFormContext } from '../context/formContext'

type Props = {
	element: FormContainerType
}

const Select = ({ element }: Props) => {
	// On Submit βρες το input που υπάρχει ήδη στο global state, και κάντο update
	const { setBuilderState } = useFormContext()
	const typeRef = useRef<HTMLSelectElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		const nameValue = nameRef?.current?.value!
		const typeValue = typeRef?.current?.value!

		setBuilderState((prev) => {
			const updatedBuilder = prev.map((item) => {
				if (item.id === element.id) {
					item.name = nameValue
					item.type = typeValue
				}
				return item
			})

			return updatedBuilder
		})
	}

	return (
		<div className='border p-4 shadow-lg rounded-md my-2 text-xs'>
			<div className='flex gap-3 mb-3 flex-wrap'>
				<input
					id='danny'
					ref={nameRef}
					type={element.type}
					placeholder='Type name'
					className='outline outline-1 outline-gray-200 border-none p-2 rounded-md cursor-pointer focus:ring-none focus:outline-green-600 focus:shadow-lg focus:cursor-text'
				/>
				<select
					ref={typeRef}
					className='bg-white  p-2  border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-green-600 focus:border-green-600 block  '
				>
					<option value='string'>String</option>
					<option value='number'>Number</option>
					<option value='json'>JSON</option>
				</select>
				<button
					className='border text-xs  px-6 py-2 rounded-md shadow-sm cursor-pointer bg-green-600 text-white hover:bg-green-400 hover:shadow-lg transition'
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
			<h1>Father: {element.fatherId}</h1>
			<h1>Level: {element.level}</h1>
			<h1>Name: {element.name}</h1>
		</div>
	)
}

export default Select
