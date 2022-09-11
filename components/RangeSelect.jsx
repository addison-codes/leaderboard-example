const RangeSelect = () => {
  return (
    <div className="text-center mt-20">
      <label className="mr-4 text-xl" htmlFor="range">
        Leaderboard Range:
      </label>
      <select name="range" className="p-2 rounded">
        <option value="100">Top 100</option>
        <option value="global">Global Leaderboard</option>
      </select>
    </div>
  )
}

export default RangeSelect
