import FormContainer from './components/FormContainer'

function App() {
	return (
		<div className='border border-green-500 p-5 flex flex-col gap-3 justify-center'>
			<FormContainer fatherId='root' level={0} />
		</div>
	)
}

export default App
