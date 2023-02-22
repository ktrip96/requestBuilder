import FormContainer from './components/FormContainer'

function App() {
	return (
		<div className='border border-green-500 p-5 flex flex-col gap-3 justify-center'>
			<FormContainer fatherId='root' level={0} />
			<button className='w-[200px] m-auto border p-2 my-4 text-white text-center bg-green-400 rounded-md hover:bg-green-500 hover:shadow-lg'>
				Submit
			</button>
		</div>
	)
}

export default App
