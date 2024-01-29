import PropTypes from 'prop-types'

const Button = props => {
  const { type, text, handle } = props
  return (
    <button type={type} onClick={handle}>
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  handle: PropTypes.func
}

export default Button
