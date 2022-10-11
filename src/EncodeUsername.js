import {encode as base64_encode} from 'base-64';

const EncodeUsername = () => {
    const username = 'MtnSetarehAval';
    const password = 'MTN3et@rE4';

    let userPassword = username + ":" + password;
    let encodedUsernamePassword = base64_encode(userPassword);

    return encodedUsernamePassword
}

export default EncodeUsername;