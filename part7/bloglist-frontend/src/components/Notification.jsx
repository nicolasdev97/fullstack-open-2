import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgray",
    fontSize: 16,
    border: "1px solid",
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="notification" style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
