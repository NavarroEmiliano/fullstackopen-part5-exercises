import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }
  return (
    <div
      className="error"
      style={{ color: notification.type === 'success' ? 'green' : 'red' }}
    >
      {notification.message}
    </div>
  )
}

export default Notification
