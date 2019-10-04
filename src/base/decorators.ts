import _ from 'lodash';
import { customElement, LitElement, CSSResult, CSSResultArray, property, html } from 'lit-element'
import { PropertyDeclaration } from 'lit-element/src/lib/updating-element';

export interface ComponentDescriptor {
    name: string;
    styles?: CSSResult|CSSResultArray
}

export function property(options?: PropertyDeclaration) {
    return (proto, name: PropertyKey) => {
        proto.constructor.properties = proto.properties || {};
        proto.constructor.properties[name] = options;
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        Object.defineProperty(proto, name, {
            get(): any {
                return (this as {[key: string]: unknown})[key as string];
            },
            set(this, value) {
                let oldVal = this[key];
                (this as {} as {[key: string]: unknown})[key as string] = value;
                if (!this.elem) {
                    return;
                }
                this.elem.requestUpdate(name, oldVal);
            }
        })
    }
}

export function Component(descriptor: ComponentDescriptor) {
    return function(Constructor: typeof LitElement) {
        Constructor.styles = descriptor.styles;
        customElement(descriptor.name)(Constructor)
    }
}

export function CtrlComponent(descriptor: ComponentDescriptor) {
    return function (Constructor) {
        Constructor.styles = descriptor.styles;
        customElement(descriptor.name + '-ctrl')(Constructor)
    }
}


export function WrappedComponent(descriptor: ComponentDescriptor) {
    return function (Constructor) {
        class WrapperComponent extends LitElement {
            static get properties() {
                return {
                    ...Constructor.properties,
                    ctrl: {attribute: false}
                };
            }

            set ctrl(ctrl) {
                let oldVal = this._ctrl;
                this._ctrl = ctrl;
                ctrl.elem = this;
                this.requestUpdate('ctrl', oldVal);
            }

            get ctrl() {
                return this._ctrl;
            }
            private _ctrl;

            constructor() {
                super();
                if (!this.ctrl) {
                    this.ctrl = new Constructor();
                }
            }

            render() {
                return this.ctrl.render();
            }

            shouldUpdate() {
                return !!this.ctrl;
            }
        }
        Object.defineProperties(WrapperComponent.prototype,
            _.mapValues(Constructor.properties, (descriptor, name) => {
                let key = `__${name}`;
                return {
                    set: function (value) {
                        let oldVal = this[key];
                        this[key] = value;
                        (this as unknown as WrapperComponent).ctrl[name] = value;
                    },
                    get: function () {
                        return this[key];
                    }
                }
            }
        ))
        customElement(descriptor.name)(WrapperComponent);
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