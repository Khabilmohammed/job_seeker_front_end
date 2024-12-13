import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationPage: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, message: 'Your job application has been updated.', isRead: false, createdAt: '2024-11-25T10:30:00' },
    { id: 2, message: 'You have a new connection request.', isRead: false, createdAt: '2024-11-24T09:15:00' },
    { id: 3, message: 'Your post received a new like.', isRead: true, createdAt: '2024-11-22T14:20:00' },
    // Add more mock notifications
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating fetching notifications
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const markAsRead = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500">No notifications found.</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white p-4 rounded-lg shadow-md border ${
                notification.isRead ? 'border-gray-300' : 'border-blue-500'
              }`}
            >
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => navigate(`/user/notificationDetails/${notification.id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
