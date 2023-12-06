export default class InputHandler {
    active_keys: string[] = [];

    constructor(element: HTMLElement) {
        element.addEventListener("keydown", this.onkeydown.bind(this), false);
        element.addEventListener("keyup", this.onkeyup.bind(this), false);
    }

    onkeydown(event: KeyboardEvent) { this.active_keys = [...this.active_keys, event.key]; }
    onkeyup(event: KeyboardEvent) { this.active_keys = this.active_keys.filter((e) => e !== event.key); }

    keyDown(key: string) { return this.active_keys.includes(key); }
}
