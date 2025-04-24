import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
} from "@mui/material";
import { FaBell, FaUser, FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopbarOwner = ({ pageTitle }) => {
  const [messageAnchorEl, setMessageAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const messages = [
    { id: 1, sender: "Emma Watsons", text: "Hi! How are you?" },
    { id: 2, sender: "Jonnald Pimienta", text: "Can we discuss the booking?" },
    { id: 3, sender: "Alice Smith", text: "I need help with my rental." },
  ];

  const notifications = [
    { id: 1, text: "Your listing has been approved." },
    { id: 2, text: "New booking request received." },
    { id: 3, text: "Payment has been processed." },
  ];

  const isMessagesOpen = Boolean(messageAnchorEl);
  const isNotificationsOpen = Boolean(notificationAnchorEl);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={4}
      py={2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: "#f8f9fa",
        color: "#333",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight="600" color="black">
        {pageTitle}
      </Typography>

      {/* Action Icons */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Messages */}
        <Tooltip title="Messages">
          <IconButton
            onClick={(e) => setMessageAnchorEl(e.currentTarget)}
            sx={{
              bgcolor: isMessagesOpen ? "#e3f2fd" : "transparent",
              borderRadius: 2,
              "&:hover": { bgcolor: "#e3f2fd" },
            }}
          >
            <Badge badgeContent={messages.length} color="error">
              <FaRegCommentDots size={18} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={messageAnchorEl}
          open={isMessagesOpen}
          onClose={() => setMessageAnchorEl(null)}
          sx={{ mt: "45px" }}
        >
          {messages.map((msg) => (
            <MenuItem
              key={msg.id}
              component={Link}
              to="/messages"
              onClick={() => setMessageAnchorEl(null)}
            >
              <Typography variant="body2">
                <strong>{msg.sender}:</strong> {msg.text}
              </Typography>
            </MenuItem>
          ))}
          <MenuItem
            component={Link}
            to="/messages"
            onClick={() => setMessageAnchorEl(null)}
          >
            <Typography color="primary">View all messages</Typography>
          </MenuItem>
        </Menu>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
            sx={{
              bgcolor: isNotificationsOpen ? "#e3f2fd" : "transparent",
              borderRadius: 2,
              "&:hover": { bgcolor: "#e3f2fd" },
            }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <FaBell size={18} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notificationAnchorEl}
          open={isNotificationsOpen}
          onClose={() => setNotificationAnchorEl(null)}
          sx={{ mt: "45px" }}
        >
          {notifications.map((notif) => (
            <MenuItem
              key={notif.id}
              component={Link}
              to="/notifications"
              onClick={() => setNotificationAnchorEl(null)}
            >
              <Typography variant="body2">{notif.text}</Typography>
            </MenuItem>
          ))}
          <MenuItem
            component={Link}
            to="/notifications"
            onClick={() => setNotificationAnchorEl(null)}
          >
            <Typography color="primary">View all notifications</Typography>
          </MenuItem>
        </Menu>

        {/* Profile Icon */}
        <Tooltip title="Profile">
          <IconButton
            sx={{
              ml: 1,
              bgcolor: "#f1f1f1",
              borderRadius: 2,
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
          >
            <FaUser size={18} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TopbarOwner;
