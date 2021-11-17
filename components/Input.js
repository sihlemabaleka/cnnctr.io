const Input = ({ label, register, required, error, type = 'text' }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2 ml-5" htmlFor={label}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      type={type}
      placeholder={`Insert ${label.toLowerCase()} here...`}
      {...register(label.replace(' ', '_').toLowerCase(), { required })}
    />

    <p>{error?.message}</p>
  </div>
)

export default Input
