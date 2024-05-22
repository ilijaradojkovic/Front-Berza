
export function isWaitingState(gameState) {
    return gameState === "WAITING";
}

export function isStartedState(gameState) {
    return gameState === "STARTED";
}
export function isFinishedState(gameState) {
    return gameState === "FINISHED";
}