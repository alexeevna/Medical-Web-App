import React from 'react';

// const list = [
//     {
//         id: 'a',
//         firstname: 'Robin',
//         lastname: 'Wieruch',
//         year: 1988,
//     },
//     {
//         id: 'b',
//         firstname: 'Dave',
//         lastname: 'Davidds',
//         year: 1990,
//     },
// ];

const FilesList = (list) => {
    console.log(typeof list);
    // if (typeof list === 'string')
    return (<ul>
        {list.map(item => (
            <li key={item.id}>
                <div>{item.id}</div>
                <div>{item.initialName}</div>
                <div>{item.creation_time}</div>
                <div>{item.owner}</div>
            </li>
        ))}
    </ul>);
};

export default FilesList;