import 'babel-polyfill';
import { apiUrl } from '../config/settings';

export function sendJson(payload) {

    let headers = {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
    };

    if ('production' !== process.env.NODE_ENV) {


        headers = {};
    }

    return fetch(apiUrl, {
    method:  'POST',
    mode:    'cors',
    body:    JSON.stringify(payload),
    headers: headers
  })
      .then( response => response.json())
      .catch(ex => {
        console.error('parsing failed', ex);
      });
}
