import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Nueva función para actualizar el estado de una notificación y su historial
  const updateNotificationStatus = (id, newStatus) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => {
        if (notif.id === id) {
          const updatedHistory = [
            ...notif.history,
            {
              date: new Date().toLocaleString(),
              text: `Estado cambiado a: ${newStatus}`,
            },
          ];

          return {
            ...notif,
            status: newStatus,
            history: updatedHistory,
          };
        }
        return notif;
      })
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        updateNotificationStatus, // Incluye la nueva función en el valor del contexto
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
