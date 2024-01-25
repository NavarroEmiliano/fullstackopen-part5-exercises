const InputLabel = props => {
  const { textLabel, type, value, setValue } = props
  return (
    <div>
      <label htmlFor={textLabel}>{`${textLabel}: `}</label>
      <input
        type={type}
        name={textLabel.toLowerCase()}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  )
}

export default InputLabel
