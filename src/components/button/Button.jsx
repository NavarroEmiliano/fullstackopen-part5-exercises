import PropTypes from 'prop-types'

const Button = props => {
  const { type, text, handle } = props
  return (
    <button type={type} onClick={handle} className={props.className}>
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  handle: PropTypes.func,
  className: PropTypes.string
}

export default Button
