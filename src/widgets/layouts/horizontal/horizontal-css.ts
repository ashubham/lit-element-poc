import {css} from 'lit-element';

export const styles = css`:host{flex:1 1 0}slot{display:flex;flex-direction:row;align-items:stretch}slot[justify=center]{justify-content:center}slot[justify=start]{justify-content:flex-start}slot[justify=end]{justify-content:flex-end}`;