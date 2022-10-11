import {encode as base64_encode} from 'base-64';


const AuthPermission = (props) => {
    
    const username = 'MtnSetarehAval';
    const password = 'MTN3et@rE4';
    
    let userPassword = username + ":" + password;
    let encodedUsernamePassword = base64_encode(userPassword);

    let response;

    if(props && props.hasAuthenticated){
        response = encodedUsernamePassword
    }
    else{
        response = 'INVALID'
    }    

    return response;
    
}

export default AuthPermission;