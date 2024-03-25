import PropTypes from 'prop-types'

const InputLabel = props => {
  const { textLabel, type, value, setValue, id } = props
  return (
    <div className="flex justify-between items-center my-4">
      <label
        className="text-lg pr-2"
        htmlFor={textLabel}
      >{`${textLabel} `}</label>
      <input
        className="rounded-md h-8 bg-slate-700 p-1"
        type={type}
        name={textLabel.toLowerCase()}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        id={id}
      />
    </div>
  )
}

InputLabel.propTypes = {
  textLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}

export default InputLabel
