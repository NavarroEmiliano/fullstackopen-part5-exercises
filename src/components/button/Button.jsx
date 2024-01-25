const Button = props => {
  const { type, text, handle } = props
  return <button type={type} onClick={handle}>{text}</button>
}

export default Button
