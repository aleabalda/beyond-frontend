import { objectMapData } from './dataClasses';

function getMappedData() : Promise<Array<objectMapData>> {
    /*
    function called when the object map page is loaded, after calling it once,
    the data should be stored in localstorage so the api is only ever called once per session.
    The call returns a lot of data so we want to minimize the number of calls.

    the call will always be the same, no args are passed. Should just return all the data.
    */

    return fetch('https://56yw56jkonm2hszz4shn6kkulm0pfoye.lambda-url.ca-central-1.on.aws/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Process the response data to fit with the return type
            // will be implemented after the API is ready
            // return the data
            return data;
        })
        .catch(error => {
            console.error(error);
            // handle any errors
            throw error;
        });
}

export { getMappedData };