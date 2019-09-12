import { customElement } from 'lit-element'

export interface ComponentDescriptor {
    name: string;
}

export function Component(descriptor: ComponentDescriptor) {
    return function(constructor: new (...args: any[]) => HTMLElement) {
        customElement(descriptor.name)(constructor)
    }
}