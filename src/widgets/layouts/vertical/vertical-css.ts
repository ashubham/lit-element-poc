import {css} from 'lit-element';

export const styles = css`:host{flex:1 1 0;display:flex}slot{display:flex;flex-direction:column;align-items:stretch;flex:1 1 0}slot[justify=center]{justify-content:center}slot[justify=start]{justify-content:flex-start}slot[justify=end]{justify-content:flex-end}`;