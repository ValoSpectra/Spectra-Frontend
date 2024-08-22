import * as io from "socket.io-client";

export class SocketService {
  socket!: io.Socket;
  socketEndpoint: string = "https://localhost:5200";
  groupCode: string = "UNKNOWN";
  subscribers: Function[] = [];

  constructor(socketEndpoint: string, groupCode: string) {
    this.groupCode = groupCode;
    this.socketEndpoint = socketEndpoint;

    this.socket = io.connect(this.socketEndpoint, { autoConnect: true, reconnection: true, rejectUnauthorized: false });

    this.socket.once("logon_success", () => { console.log("Logged on successfully") });

    //registering main data handler
    this.socket.on("match_data", (data: string) => {
      this.subscribers.forEach(e => e(JSON.parse(data)));
    });

    //setting up reconnection attempt handler
    this.socket.io.on("reconnect_attempt", (attempt: number) => {
      console.log(`Connection lost, attempting to reconnect to server (Attempt: ${attempt})`);
    });

    //setting up reconnection handler
    this.socket.io.on("reconnect", () => {
      this.socket.emit("logon", JSON.stringify({ groupCode: this.groupCode }));
      console.log("Reconnected to server");
    });

    //loggin on at the backend server
    this.socket.emit("logon", JSON.stringify({ groupCode: this.groupCode }));
  }

  subscribe(handler: Function) {
    this.subscribers.push(handler);
  }

}