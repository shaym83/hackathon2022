export interface ITrigger {
    name: string;
    frame: number;
    evaluate(): boolean;
    callback?: (payload: string) => void;
}

export class KeyPressedTrigger implements ITrigger {
    name: string;
    frame: number;
    keys: string[];
    callback?: (payload: string) => void;

    constructor(frame: number, keys: string[], callback?: (payload: string) => void) {
        this.frame = frame;
        this.keys = keys;
        this.name = `KeyPressedTrigger (${frame}, '${keys}')`;
        this.callback = callback;
    }

    evaluate(key?: string): boolean {
        if (!key) return false;
        return this.keys.indexOf(key) != -1;
    }

    static create(frame: number, keys: string[], callback?: (payload: string) => void): KeyPressedTrigger {
        return new KeyPressedTrigger(frame, keys, callback);
    }
}