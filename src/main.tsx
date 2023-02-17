import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FormContextProvider } from './context/formContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<FormContextProvider>
		<App />
	</FormContextProvider>
)
