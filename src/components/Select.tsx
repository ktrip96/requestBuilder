import React, { useEffect, useState } from 'react'
import { FormContainerType, useFormContext } from '../context/formContext'
import useDebounce from '../hooks/useDebounce'
import FormContainer from './FormContainer'

type Props = {
	element: FormContainerType
}

const Select = ({ element }: Props) => {
	const { builderState, setBuilderState } = useFormContext()

	const [name, setName] = useState('')
	const [type, setType] = useState('string')
	const [errorMessage, setErrorMessage] = useState('')
	const debouncedName = useDebounce<string>(name, 500)

	useEffect(() => {
		// Check if the Name is Empty
		if (debouncedName.trim().length === 0) {
			setErrorMessage('This field should not be empty')
		} else {
			// Check if there is already a same name in builderState
			let doesExist = false
			for (let i = 0; i < builderState.length; i++) {
				const stateElement = builderState[i]
				// stateElement.name === debouncedName ==> If you find another element with the same name
				// stateElement.id !== element.id ==> And this element is not itself
				// stateElement.fatherId === element.fatherId ==> And these elements have the same father
				if (
					stateElement.name === debouncedName &&
					stateElement.id !== element.id &&
					stateElement.fatherId === element.fatherId
				)
					doesExist = true
			}
			if (doesExist) {
				setErrorMessage('Name fields should be unique')
			} else {
				setErrorMessage('')
				// Update the builder state
				setBuilderState((prev) => {
					const updatedBuilder = prev.map((item) => {
						if (item.id === element.id) {
							item.name = debouncedName
						}
						return item
					})

					return updatedBuilder
				})
			}
		}
	}, [debouncedName])

	useEffect(() => {
		setBuilderState((prev) => {
			const updatedBuilder = prev.map((item) => {
				if (item.id === element.id) item.type = type
				return item
			})

			return updatedBuilder
		})

		const childrenToBeDeleted = returnElementChildren(element.id)
		if (childrenToBeDeleted.length > 0)
			setBuilderState((prev) => {
				//	return all of the elements, that do not exist in childrenToBeDeleted array
				const updatedBuilder = prev.filter((item) => {
					for (let i = 0; i < childrenToBeDeleted.length; i++) {
						if (item.id === childrenToBeDeleted[i].id) return false
					}
					return true
				})
				return updatedBuilder
			})
	}, [type])

	const handleDelete = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
		//	TODO: Clean up all his children
		const childrenToBeDeleted = returnElementChildren(element.id)
		const elementsToBeDeleted = [...childrenToBeDeleted, element]
		setBuilderState((prev) => {
			//	return all of the elements, that do not exist in elementsToBeDeleted array
			const updatedBuilder = prev.filter((item) => {
				for (let i = 0; i < elementsToBeDeleted.length; i++) {
					if (item.id === elementsToBeDeleted[i].id) return false
				}
				return true
			})
			return updatedBuilder
		})
	}

	function returnElementChildren(id: any) {
		const result = builderState.filter((i) => i.fatherId === id)
		if (result.length === 0) return []
		let globalState: any = []
		for (let i = 0; i < result.length; i++) {
			globalState.push(...returnElementChildren(result[i].id))
		}
		return [...result, ...globalState]
	}

	return (
		<div className='border p-4 shadow-lg rounded-md my-2 text-xs'>
			<div className='flex gap-3 mb-3 flex-wrap items-center'>
				<input
					type='text'
					onChange={(e) => setName(e.target.value)}
					placeholder='Type name'
					className={`outline outline-1 outline-gray-200 border-none p-2 rounded-md cursor-pointer focus:ring-none focus:outline-green-600  ${
						errorMessage !== '' && 'outline-red-300 focus:outline-red-500'
					} focus:shadow-lg focus:cursor-text`}
				/>
				<select
					onChange={(e) => setType(e.target.value)}
					className='bg-white  p-2  border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-green-600 focus:border-green-600 block  '
				>
					<option value='string'>String</option>
					<option value='number'>Number</option>
					<option value='json'>JSON</option>
				</select>
				<h1
					className='text-red-600 font-semibold cursor-pointer hover:scale-110 transition'
					onClick={handleDelete}
				>
					Delete
				</h1>
			</div>
			<h1 className='font-semibold text-red-600'>{errorMessage}</h1>
			<h1>
				Father: <span className='font-semibold'> {element.fatherId}</span>
			</h1>
			{/* <h1>Level: {element.level}</h1>
			<h1>Name: {element.name}</h1> */}
			<h1>
				Id : <span className='font-semibold'> {element.id}</span>
			</h1>
			<h1>
				Name : <span className='font-semibold'> {element.name}</span>
			</h1>

			{/* TODO: Check if its viable to replace element.fatherId with element.id */}
			{type === 'json' && <FormContainer fatherId={element.id} level={element.level + 1} />}
		</div>
	)
}

export default Select
