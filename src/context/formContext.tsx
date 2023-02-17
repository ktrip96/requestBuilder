import React, { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
	children: ReactNode
}

export type FormContainerType = {
	level: number
	fatherId: string
	id: string
	name: string
	type: string
}

type FormContextType = {
	builderState: FormContainerType[]
	setBuilderState: React.Dispatch<React.SetStateAction<FormContainerType[]>>
}

const FormContext = createContext<FormContextType>({} as FormContextType)

const FormContextProvider = ({ children }: Props) => {
	const [builderState, setBuilderState] = useState<FormContainerType[]>([])

	return <FormContext.Provider value={{ builderState, setBuilderState }}>{children}</FormContext.Provider>
}

const useFormContext = () => useContext(FormContext)

export { FormContextProvider, useFormContext }
