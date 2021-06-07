import socketIOClient from 'socket.io-client';
import { fetchAud, fetchToken } from 'api';

// Initialize socket
export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL, {
    withCredentials: true,
    query: { token: fetchToken() }
});

export const clientSocket = {
    emit: (event, data) => socket.emit(event, {
        aud: fetchAud(), data
    }),
    on: (event, dispatch, action) => {
        socket.on(event, data => dispatch({
            type: action, payload: data
        }))
    },
    init: () => socket.emit('init', fetchAud()),
}