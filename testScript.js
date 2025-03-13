const { getEvents, addEvent, getUpcomingEvents, authenticateUser, checkReminders } = require('./src/events.js');

console.log("Current Events:", getEvents());

addEvent({
    name: "Team Sync-up",
    description: "Weekly catch-up meeting",
    date: "2025-04-20",
    time: "04:00 PM",
    category: "Meetings",
    reminder: "2025-04-20T03:30:00Z"
});

console.log("Updated Events:", getUpcomingEvents());
console.log("Upcoming Events by Category:", getUpcomingEvents('category'));
console.log("Upcoming Events with Reminders:", getUpcomingEvents('reminder'));

// Test authentication
console.log("User authentication (valid user):", authenticateUser("admin", "5678")); // true
console.log("User authentication (invalid user):", authenticateUser("user", "wrongpass")); // false

// Check for reminders
checkReminders();