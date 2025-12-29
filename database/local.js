const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'json', 'database.json')
const logsPath = path.join(__dirname, 'json', 'usage_logs.json')

function ensureDirectoryExists(filePath) {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

function loadDatabase() {
    ensureDirectoryExists(dbPath)
    if (fs.existsSync(dbPath)) {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    }
    return { users: {} }
}

function saveDatabase(db) {
    ensureDirectoryExists(dbPath)
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

function resetDailyLimits() {
    const db = loadDatabase()
    let changed = false
    
    for (let userId in db.users) {
        if (db.users[userId].used_today > 0) {
            db.users[userId].used_today = 0
            db.users[userId].last_reset = new Date().toISOString().split('T')[0]
            changed = true
        }
    }
    
    if (changed) {
        saveDatabase(db)
        console.log('✅ Daily limits reset')
    }
}

setInterval(() => {
    resetDailyLimits()
}, 24 * 60 * 60 * 1000)

function getUser(userId, username = '') {
    const db = loadDatabase()
    const today = new Date().toISOString().split('T')[0]
    
    if (!db.users[userId]) {
        db.users[userId] = {
            user_id: userId,
            username: username,
            daily_limit: 2,
            used_today: 0,
            total_used: 0,
            last_used: null,
            last_reset: today,
            created_at: new Date().toISOString()
        }
        saveDatabase(db)
    } else {
        if (db.users[userId].last_reset !== today) {
            db.users[userId].used_today = 0
            db.users[userId].last_reset = today
            saveDatabase(db)
        }
        
        if (username && db.users[userId].username !== username) {
            db.users[userId].username = username
            saveDatabase(db)
        }
    }
    
    return db.users[userId]
}

function updateUserUsage(userId, url, emojis, success) {
    const db = loadDatabase()
    const user = db.users[userId]
    
    if (user) {
        user.used_today += 1
        user.total_used += 1
        user.last_used = new Date().toISOString()
        saveDatabase(db)
    }
    
    ensureDirectoryExists(logsPath)
    let logs = []
    if (fs.existsSync(logsPath)) {
        logs = JSON.parse(fs.readFileSync(logsPath, 'utf8'))
    }
    
    logs.push({
        user_id: userId,
        username: user.username,
        url: url,
        emojis: emojis,
        success: success,
        created_at: new Date().toISOString()
    })
    
    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2))
}

function addUserLimit(userId, additionalLimit) {
    const db = loadDatabase()
    if (db.users[userId]) {
        db.users[userId].daily_limit += additionalLimit
        saveDatabase(db)
        return db.users[userId]
    }
    return null
}

function getAllUsers() {
    const db = loadDatabase();
    return db.users;
}

module.exports = {
    loadDatabase,
    saveDatabase,
    getUser,
    updateUserUsage,
    addUserLimit,
    getAllUsers
}
