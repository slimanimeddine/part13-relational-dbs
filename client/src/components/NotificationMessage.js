// component that renders notification message
const NotificationMessage = ({ notificationMessage, errorHappened = false }) => {

  if (notificationMessage === null || notificationMessage === undefined || errorHappened === undefined || errorHappened === null) { // if notificationMessage is null, then return null
    return null
  }

  return (
    <div className={errorHappened ? "error_red" : "notification_green"}>
      {notificationMessage}
    </div>
  )

}

export default NotificationMessage