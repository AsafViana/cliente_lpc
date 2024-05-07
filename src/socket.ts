import {io} from 'socket.io-client'

export const socket = () => io("wss://servidor-nuvem-lpc.onrender.com")