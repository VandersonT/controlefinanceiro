export default function({redirect}){
    let authenticated = true;

    const cookie = useCookie(token, 'options')

    return authenticated ? true : redirect('/login') ;
}