export interface UserNotification {
    id: number,
    farmId: number,
    severity: string;
    message: string;
    photoUrl: string;
    timestamp: Date;
}