import React, { useEffect, useState } from 'react'
import { FormContainerType, useFormContext } from '../context/formContext'
import Select from './Select'

type Props = {
	fatherId: string
	level: number
}

const FormContainer = ({ fatherId, level }: Props) => {
	const { builderState, setBuilderState } = useFormContext()

	console.log('Level: ', level, ' ', { builderState })

	const handleAddNewElement = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const localElementDefault: FormContainerType = {
			level,
			fatherId: fatherId,
			id: uniqueId(),
			name: '',
			type: 'string',
		}
		setBuilderState((prev) => [...prev, localElementDefault])
	}

	const myElements = builderState.filter((element) => element.fatherId === fatherId)

	return (
		<div
			className={`border border-red-200 rounded-md m-4 p-4 ${
				level !== 0 && 'ml-20'
			}  flex flex-col justify-center`}
		>
			<h4 className=''>
				Fatherd Id: <span className='font-semibold'>{fatherId}</span>
			</h4>

			{/* Elements (Select | FormContainer) */}

			{myElements.map((element: FormContainerType) => (
				<Select element={element} key={element.id} />
			))}

			<button
				onClick={handleAddNewElement}
				className='w-[200px] m-auto border p-2 my-4 text-white text-center bg-gray-700 rounded-md hover:bg-gray-500 hover:shadow-lg'
			>
				+
			</button>
		</div>
	)
}

const uniqueId = function () {
	return Date.now().toString(36) + Math.random().toString(36)
}

export default React.memo(FormContainer)
