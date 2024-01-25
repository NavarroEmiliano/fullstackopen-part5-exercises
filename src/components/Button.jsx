const Button = props => {
  const { type, text } = props
  return <button type={type}>{text}</button>
}

export default Button
