const fs = require('fs');
const path = require('path');

const eventsFile = path.join(__dirname, '../data/events.json');
let events = JSON.parse(fs.readFileSync(eventsFile, 'utf-8'));

function getEvents() {
    return events;
}

function addEvent(event) {
    event.id = events.length + 1;
    events.push(event);
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
}

function getUpcomingEvents(filterBy = null) {
    let sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (filterBy === 'category') {
        return sortedEvents.reduce((acc, event) => {
            acc[event.category] = acc[event.category] || [];
            acc[event.category].push(event);
            return acc;
        }, {});
    }
    
    if (filterBy === 'reminder') {
        return sortedEvents.filter(event => new Date(event.reminder) > new Date());
    }
    
    return sortedEvents;
}

function checkReminders() {
    const now = new Date();
    events.forEach(event => {
        if (new Date(event.reminder) <= now) {
            console.log(`🔔 Reminder: ${event.name} is happening soon!`);
        }
    });
}

// Simple authentication (basic if-else check)
function authenticateUser(username, password) {
    const users = { admin: "5678", user: "xyz123" };
    return users[username] === password;
}

module.exports = { getEvents, addEvent, getUpcomingEvents, authenticateUser, checkReminders }; 