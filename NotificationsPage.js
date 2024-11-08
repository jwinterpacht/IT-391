import React, { useState } from 'react';
import './Apps.css';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { text: 'Milk is running low!', urgent: true, read: false, marked: false },
    { text: 'Eggs will expire in 2 days!', urgent: true, read: false, marked: false },
    { text: 'Flour is almost out!', urgent: true, read: false, marked: false },
    { text: 'Butter has expired!', urgent: true, read: false, marked: false }
  ]);

  // Toggle the marked status for a notification
  const toggleMarked = (index) => {
    const updatedNotifications = notifications.map((notification, i) => 
      i === index ? { ...notification, marked: !notification.marked } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Mark all marked notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => 
      notification.marked ? { ...notification, read: true, urgent: false, marked: false } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Clear marked notifications with confirmation
  const clearMarkedNotifications = () => {
    if (window.confirm("Are you sure you want to do this?")) {
      const updatedNotifications = notifications.filter(notification => !notification.marked);
      setNotifications(updatedNotifications);
    }
  };

  // Check if there are any marked notifications
  const hasMarkedNotifications = notifications.some(notification => notification.marked);

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No current notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className={`${notification.urgent ? 'urgent' : ''} ${notification.read ? 'read' : ''}`}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={notification.marked}
                  onChange={() => toggleMarked(index)}
                  id={`checkbox-${index}`}
                />
                <label htmlFor={`checkbox-${index}`} className="checkbox-label"></label>
              </div>
              <span>{notification.text}</span>
            </li>
          ))}
        </ul>
      )}
      {hasMarkedNotifications && (
        <>
          <button className="mark-all-read-button" onClick={markAllAsRead}>
            Mark as Read
          </button>
          <button className="clear-marked-button visible" onClick={clearMarkedNotifications}>
            Clear Marked Notifications
          </button>
        </>
      )}
    </div>
  );
}

export default NotificationsPage;
