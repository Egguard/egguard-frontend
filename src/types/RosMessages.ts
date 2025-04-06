export enum Mode {
    Manual = 'manual',
    Autonomous = 'autonomous',
    Emergency = 'emergency',
}

export enum Direction {
    Forward = 'forward',
    Right = 'right',
    Left = 'left',
}

export interface ManualNavMessage {
    velocity: number;
    direction: Direction;
    stop_now: boolean;
}

export interface ModeMessage {
    mode: Mode;
}
