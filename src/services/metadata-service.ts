import _ from 'lodash';
import randomWords from 'random-words';

export function getColumns() {
    let columns: any[] = [];
    for(let i = 0;i<1000;i++) {
        columns.push({
            name: randomWords({exactly: 2, join: ' '}),
            id: _.uniqueId()
        });
    }

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                columns
            )
        }, Math.random() * 1000);
    });
}