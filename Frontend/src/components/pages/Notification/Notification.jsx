import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllNotificationsOfSingleUser, markAllNotificationsAsRead } from '../../../store/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchAllNotificationsOfSingleUser()); // Fetch notifications on mount
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0 && unreadCount > 0) {
      dispatch(markAllNotificationsAsRead()); // Mark notifications as read after fetching
    }
  }, [dispatch, notifications, unreadCount]);

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto p-4">
      {notifications?.map((notification) => (
        <div
          key={notification._id}
          className={`border rounded-lg shadow p-4 flex items-center gap-3 ${
            !notification.isRead ? 'bg-gray-100' : ''
          }`}
        >
          <img
            src={notification.image}
            alt="notification"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-800">{notification.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
