import { customElement, LitElement, CSSResult, CSSResultArray } from 'lit-element'

export interface ComponentDescriptor {
    name: string;
    styles?: CSSResult|CSSResultArray
}

export function Component(descriptor: ComponentDescriptor) {
    return function(Constructor: typeof LitElement) {
        Constructor.styles = descriptor.styles;
        customElement(descriptor.name)(Constructor)
    }
}

export interface ActionDescriptor {
}
export function action<T>(descriptor: ActionDescriptor) {
    return (component: LitElement, name: PropertyKey) => {
        component[name] = function(detailOrEvent?: T | Event) {
            let eventToDispatch;
            if(detailOrEvent instanceof Event) {
                let OldEvent = <new (...args: any[]) => any><unknown>detailOrEvent.constructor;
                eventToDispatch = new OldEvent(
                    name, detailOrEvent);
            } else {
                eventToDispatch = new CustomEvent(name as string, {
                    detail: detailOrEvent,
                    bubbles: true,
                    composed: true
                })
            }
            this.dispatchEvent(eventToDispatch);
        }
    }
}