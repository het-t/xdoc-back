import makeDbReq from "../db/index.js"

export default function logError (userId, activityId, refTableId, refTablePkId, details) {
    makeDbReq(`logs_add(?, ?, ?, ?, ?)`, [
        userId,
        activityId,
        refTableId,
        refTableId,
        details
    ])
}