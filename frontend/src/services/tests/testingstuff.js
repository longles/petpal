import { authAPIService} from '../authAPIService.js';

// hacky way to test the api calls - should use jest or something

const api = authAPIService();

// api.register(
//     'some@mail.com',
//     'password123',
//     'bobby123',
//     {
//         "type": "petseeker",
//         "user": {
//             "name": "Petseeker1",
//             "bio": ""
//         }
//     }
// ).then((response) => {
//     console.log(response);
// });

// api.login('bobby123', 'password123').then((response) => {
//     console.log(response);
// });

// api.logout().then((response) => {
//     console.log(response);
// }