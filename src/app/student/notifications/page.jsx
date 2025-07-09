"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Mail, MessageSquare, AlertTriangle, X } from "lucide-react"



const initialNotifications = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah",
    description: "Hey! Are we still on for lunch tomorrow?",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "mention",
    title: "You were mentioned in a comment",
    description: "John mentioned you in the project discussion",
    timestamp: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "alert",
    title: "System maintenance scheduled",
    description: "Scheduled maintenance will occur tonight at 2 AM EST",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Profile updated successfully",
    description: "Your profile information has been updated",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "New message from Team",
    description: "The weekly standup has been moved to 10 AM",
    timestamp: "5 hours ago",
    read: false,
  },
]

const getNotificationIcon = (type) => {
  switch (type) {
    case "message":
      return <Mail className="h-4 w-4" />
    case "mention":
      return <MessageSquare className="h-4 w-4" />
    case "alert":
      return <AlertTriangle className="h-4 w-4" />
    case "system":
      return <Bell className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getNotificationColor = (type) => {
  switch (type) {
    case "message":
      return "bg-blue-500"
    case "mention":
      return "bg-green-500"
    case "alert":
      return "bg-orange-500"
    case "system":
      return "bg-gray-500"
    default:
      return "bg-blue-500"
  }
}

const Page = () => {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                <CardTitle>Notifications</CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <Check className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>
              {notifications.length === 0
                ? "No notifications"
                : `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No notifications yet</p>
                <p className="text-sm text-gray-400 mt-1">{"We'll notify you when something important happens"}</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50/50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${getNotificationColor(notification.type)} text-white`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                          </div>

                          <div className="flex items-center gap-1 ml-2">
                            {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeNotification(notification.id)}
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="mt-2 h-7 px-2 text-xs"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
