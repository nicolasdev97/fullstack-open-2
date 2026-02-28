const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <div>{notification.message}</div>;
};

export default Notification;
