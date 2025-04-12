import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getEventAndMusicNotifications,
  markAllNotificationsAsRead,
} from '../../store/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getEventAndMusicNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0 && unreadCount > 0) {
      dispatch(markAllNotificationsAsRead());
    }
  }, [dispatch, notifications, unreadCount]);

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
        Notifications
      </h2>

      {notifications?.length > 0 ? (
        <div className="flex flex-col gap-5">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-start gap-4 p-4 rounded-lg shadow-md transition-all duration-300 border ${
                notification.isRead
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-gray-900 border-l-4 border-green-400'
              }`}
            >
              <img
                src={notification.image}
                alt="notification"
                className={`w-14 h-14 rounded-full object-cover ring-2 ${
                  notification.isRead ? 'ring-gray-600' : 'ring-green-400'
                }`}
              />
              <div className="flex flex-col justify-between">
                <p className="text-sm text-gray-200">{notification.content}</p>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">🎉 You're all caught up!</p>
          <p className="text-sm">No new notifications at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default Notification;
