import socketIOClient from 'socket.io-client';
import { fetchAud, fetchToken } from 'api';

// Initialize socket
export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL, {
    withCredentials: true,
    query: { token: fetchToken() },
    autoConnect: false
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
    init: () => {
        socket.connect();
        socket.emit('init', fetchAud());
    },
};

socket.on('disconnect', reason => {
    if (reason === 'io server disconnect') {
        socket.connect();
    }
});
