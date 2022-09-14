import Table from './Table'

const Leaderboard = ({ name, range }) => {
  return (
    <div className="h-screen mt-20">
      <h2 className="mb-8 text-xl text-center">
        Leaderboard for:
        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-teal-200">{` ${
          name ? name + '!' : ''
        }`}</span>
      </h2>
      <button
        className="px-4 py-2 mb-4 text-2xl bg-gray-600 rounded right disabled:opacity-75 hover:bg-gray-800"
        onClick={(e) => {
          // Refetch data
          mutate()
          // Temporarily disable the button to block rapid refetch
          e.target.disabled = true
          setTimeout(() => (e.target.disabled = false), 3000)
        }}
      >
        Refresh List
      </button>
      <Table range={range} />
    </div>
  )
}

export default Leaderboard
