import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  if (!notification) return null;

  return <div>{notification}</div>;
};

export default Notification;

Notification.propTypes = {
  notification: PropTypes.string,
};
