import { useNavigate } from 'react-router-dom'

const Home = () => {
  /* Use this to navigate to the other pages */
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-green-600 p-4 shadow-sm md:justify-center dark:bg-green-600">
      <div className="flex h-screen flex-col items-center justify-start gap-6 rounded-lg border bg-green-100 p-4 py-40 shadow-sm md:justify-center lg:h-full dark:bg-green-100">
        <div className="flex items-center justify-start text-2xl font-extrabold tracking-tight text-green-900 md:justify-center md:text-5xl dark:text-green-900">
          Welcome!
        </div>
        <div className="flex items-center justify-start text-2xl font-extrabold tracking-tight text-green-900 md:justify-center md:text-5xl dark:text-green-900">
          Great food and drinks await, make an order now!
        </div>
        <button
          type="button"
          className="inline-flex w-40 justify-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200"
          onClick={() => navigate('/menu')}
        >
          Place an Order
        </button>
        <button
          type="button"
          className="inline-flex w-40 justify-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200"
          onClick={() => navigate('/admin')}
        >
          Admin Page
        </button>
      </div>
    </div>
  )
}

export default Home
