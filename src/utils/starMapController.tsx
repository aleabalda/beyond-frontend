import { objectMapData, objectData } from './dataClasses';

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
            return data;
        })
        .catch(error => {
            console.error(error);
            // handle any errors
            throw error;
        });
}

function getObjectData(id: string) : Promise<objectData> {

    return fetch('https://3qzu5bugmma3n5lebo4fn32vmq0sbqlg.lambda-url.ca-central-1.on.aws/?ngc=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data = data[0];
            let obj : objectData = {
                ngc: data.ngc,
                name: data.name,
                type: data.type,
                constellation: data.constellation,
                ra: data.ra,
                dec: data.dec,
                magnitude: data.magnitude,
                collection: data.collection
            
            }
            return obj;
        })
        .catch(error => {
            console.error(error);
            // handle any errors
            throw error;
        });
}

export { getMappedData, getObjectData };