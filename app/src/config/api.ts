import {utilPersistence} from "../util/utilPersistence/utilPersistence";
import {IdPersistence} from "../util/utilPersistence/IdPersistence";

const host = `http://localhost:1337`;
const {token} = utilPersistence.getValue(IdPersistence.auth);

export default {
    register: {method: 'post', url: host+`/authorize`},
    friendList: {method: 'get', url: host+'/already-friends', headers: {token: JSON.stringify(token)}}
}