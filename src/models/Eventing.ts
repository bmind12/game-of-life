interface Events {
    [eventName: string]: Array<Function>
}

export default class Eventing {
    private events: Events

    public on(eventName: string, callback: Function): void {
        console.log('### on', this)
        if (!this.events[eventName]) this.events[eventName] = []

        this.events[eventName].push(callback)
    }

    public emit(eventName: string): void {
        if (!this.events[eventName]) return

        for (const callback of this.events[eventName]) {
            callback()
        }
    }
}
