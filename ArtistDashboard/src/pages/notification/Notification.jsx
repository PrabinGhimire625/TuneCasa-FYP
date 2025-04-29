import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllNotificationsOfArtist, markAllNotificationsAsRead } from '../../store/notificationSlice'

const Notification = () => {
    const dispatch = useDispatch()
    const { notifications, unreadCount } = useSelector((state) => state.notifications);

    useEffect(() => {
      dispatch(fetchAllNotificationsOfArtist()); 
    }, [dispatch]);
  
    useEffect(() => {
      if (notifications.length > 0 && unreadCount > 0) {
        dispatch(markAllNotificationsAsRead()); 
      }
    }, [dispatch, notifications, unreadCount]);

  return (
<div className="max-w-3xl mx-auto p-4 bg-gray-900">
  <div className="flex flex-col gap-4">
    {notifications?.map((notification) => (
      <div
        key={notification._id}
        className={`border rounded-lg shadow-lg p-4 flex items-center gap-4 ${
          !notification.isRead ? 'bg-gray-900' : 'bg-gray-900'
        } hover:bg-gray-600 transition-colors duration-200`}
      >
        <img
          src={'https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg'} 
          alt="Notification"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm text-white">{notification.content}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  
  )
}

export default Notification
