const EventName = ({ name, onNameChange }) => {
  return (
    <div className="text-center mt-20">
      <label htmlFor="eventName" className="mr-4 text-xl">
        Event Name:
      </label>
      <input
        label="Event Name"
        name="eventName"
        placeholder="Enter Event Name"
        value={name}
        onChange={onNameChange}
        className="p-2 rounded"
      />
    </div>
  )
}

export default EventName
