export function isAdmin() {
    // Function to get the value of a cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Get the token from cookies
    const token = getCookie('token');

    if (!token) {
        console.log('No token found in cookies');
        return false;
    }

    //console.log('Token:', token);

    // Assuming the token is a JWT and has a payload that is base64 encoded
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        //console.log('Payload:', payload);

        // Check if the payload has an isAdmin property
        const isAdmin = payload.isAdmin || false;
        console.log('isAdmin:', isAdmin);

        return isAdmin;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}
