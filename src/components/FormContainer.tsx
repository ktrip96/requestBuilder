import React, { useEffect, useState } from 'react'
import { FormContainerType, useFormContext } from '../context/formContext'
import Select from './Select'

type Props = {
	fatherId: string
	level: number
}

type ElementType = {
	name: string
	type: 'string' | 'number' | 'JSON'
}

const FormContainer = ({ fatherId, level }: Props) => {
	const [id, setId] = useState('')
	const [localElements, setLocalElements] = useState([])

	const { builderState, setBuilderState } = useFormContext()

	console.log('Level: ', level, ' ', { builderState })

	useEffect(() => {
		setId(uniqueId())
	}, [])

	const handleAddNewElement = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const localElementDefault: FormContainerType = {
			level,
			fatherId: id,
			id: uniqueId(),
			name: '',
			type: 'string',
		}
		setBuilderState((prev) => [...prev, localElementDefault])
	}

	const myElements = builderState.filter((element) => element.fatherId === id)

	return (
		<div className={`border border-red-200 p-4 ${level !== 0 && 'ml-20'}  flex flex-col justify-center`}>
			<h1>Id: {id}</h1>
			<h4>Fatherd Id: {fatherId}</h4>
			<h4>Level: {level}</h4>

			{/* Elements (Select | FormContainer) */}

			{myElements.map((element: FormContainerType, index) => (
				<Select element={element} key={element.id} />
			))}
			{(level === 0 || level === 1 || level === 2 || level === 3) && (
				<FormContainer fatherId={id} level={level + 1} />
			)}
			<button
				onClick={handleAddNewElement}
				className='w-[200px] border p-2 my-4 text-white text-center bg-gray-700 rounded-md hover:bg-gray-500 hover:shadow-lg'
			>
				+
			</button>
		</div>
	)
}

const uniqueId = function () {
	return Date.now().toString(36) + Math.random().toString(36)
}

export default FormContainer
