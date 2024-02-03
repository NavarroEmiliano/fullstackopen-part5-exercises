import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    <div className="error" style={{ color: 'red' }}>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
}
export default Notification
