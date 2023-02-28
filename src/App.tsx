import FormContainer from './components/FormContainer'
import { FormContainerType, useFormContext } from './context/formContext'

type simpleInputBackendFormat = {
	key: string
	params: {}
	type: string
}

type jsonInputBackendFormat = {
	jsonFields: simpleInputBackendFormat[]
} & simpleInputBackendFormat

const returnSimpleInput = (inputElement: FormContainerType) => {
	return {
		key: inputElement.name,
		type: inputElement.type,
		params: {},
	}
}

function App() {
	const { builderState } = useFormContext()

	const returnChildren = (inputElement: FormContainerType) => {
		const children = builderState.filter((i) => i.fatherId === inputElement.id)
		return children.map((i) => returnFieldForBackend(i))
	}

	const returnFieldForBackend = (
		inputElement: FormContainerType
	): simpleInputBackendFormat | jsonInputBackendFormat => {
		if (inputElement.type === 'json')
			return {
				...returnSimpleInput(inputElement),
				jsonFields: returnChildren(inputElement),
			}
		else return returnSimpleInput(inputElement)
	}

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		// Check for Errors
		e.preventDefault()
		const responseToBackend: (simpleInputBackendFormat | jsonInputBackendFormat)[] = []
		const rootElements = builderState.filter((i) => i.fatherId === 'root')
		rootElements.forEach((i) => responseToBackend.push(returnFieldForBackend(i)))

		console.log({ responseToBackend })
	}

	console.log({ builderState })

	return (
		<div className='border border-gray-300  shadow-xl p-5 flex flex-col gap-3 justify-center'>
			<FormContainer fatherId='root' level={0} />
			<button
				onClick={handleSubmit}
				className='w-[200px] m-auto border p-2 my-4 text-white text-center bg-green-500 rounded-md hover:bg-green-600 hover:shadow-lg'
			>
				Submit
			</button>
		</div>
	)
}

export default App
