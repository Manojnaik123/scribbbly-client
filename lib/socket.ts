import { io } from "socket.io-client";

// remember to genearate the url from the railway networking> domains

export const socket = io('https://scribbbly-server-ts-production.up.railway.app/');