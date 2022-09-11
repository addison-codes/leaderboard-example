const Leaderboard = ({ name }) => {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-xl">
        Leaderboard for:
        <span className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-400 to-teal-200">{` ${
          name ? name + '!' : ''
        }`}</span>
      </h2>
    </div>
  )
}

export default Leaderboard
