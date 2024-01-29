import PropTypes from 'prop-types'

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

InputLabel.propTypes = {
  textLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}

export default InputLabel
