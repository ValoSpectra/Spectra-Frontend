/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import * as io from "socket.io-client";
import { ISessionData } from "../mapban-ui/mapban-ui.component";

export class SocketService {
  matchSocket!: io.Socket;
  matchSubscribers: Function[] = [];

  mapbanSocket!: io.Socket;
  mapbanSubscribers: Function[] = [];

  private static instance: SocketService;

  public static getInstance(): SocketService {
    if (SocketService.instance == null) SocketService.instance = new SocketService();
    return SocketService.instance;
  }

  public connectMatch(socketEndpoint: string, groupCode: string): SocketService {
    if (this.matchSocket && this.matchSocket.connected) {
      console.warn("SocketService Match is already connected. Reusing existing connection.");
      return this;
    }

    this.matchSocket = io.connect(socketEndpoint, {
      autoConnect: true,
      reconnection: true,
    });

    this.matchSocket.once("logon_success", () => {
      console.log("Logged on successfully");
    });

    //registering main data handler
    this.matchSocket.on("match_data", (data: string) => {
      this.matchSubscribers.forEach((e) => e(JSON.parse(data)));
    });

    //setting up reconnection attempt handler
    this.matchSocket.io.on("reconnect_attempt", (attempt: number) => {
      console.log(`Connection lost, attempting to reconnect to server (Attempt: ${attempt})`);
    });

    //setting up reconnection handler
    this.matchSocket.io.on("reconnect", () => {
      this.matchSocket.emit("logon", JSON.stringify({ groupCode: groupCode }));
      console.log("Reconnected to server");
    });

    //loggin on at the backend server
    this.matchSocket.emit("logon", JSON.stringify({ groupCode: groupCode }));

    return this;
  }

  public connectMapban(socketEndpoint: string, logonData: { sessionId: string }): SocketService {
    if (this.mapbanSocket && this.mapbanSocket.connected) {
      console.warn("SocketService Mapban is already connected. Reusing existing connection.");
      return this;
    }

    this.mapbanSocket = io.connect(socketEndpoint, {
      autoConnect: true,
      reconnection: true,
    });

    this.mapbanSocket.once("session_data", (data: ISessionData) => {
      console.log("Logged on successfully");
      this.mapbanSubscribers.forEach((subscriber) => subscriber({ event: "session_data", data }));
      this.mapbanSocket.onAny((event: string, ...args: any[]) => {
        if (Array.isArray(args) && args.length > 0) {
          this.mapbanSubscribers.forEach((subscriber) => subscriber({ event, data: args[0] }));
        } else {
          this.mapbanSubscribers.forEach((subscriber) => subscriber({ event, data: args }));
        }
      });
    });

    this.mapbanSocket.once("logon_fail", (data: any) => {
      this.mapbanSubscribers.forEach((subscriber) => subscriber({ event: "logon_fail", data }));
    });

    //setting up reconnection attempt handler
    this.mapbanSocket.io.on("reconnect_attempt", (attempt: number) => {
      console.log(`Connection lost, attempting to reconnect to server (Attempt: ${attempt})`);
    });

    //setting up reconnection handler
    this.mapbanSocket.io.on("reconnect", () => {
      this.mapbanSocket.emit("logon", logonData);
      console.log("Reconnected to server");
    });

    this.mapbanSocket.emit("logon", logonData);

    return this;
  }

  subscribeMatch(handler: Function) {
    this.matchSubscribers.push(handler);
  }

  subscribeMapban(handler: Function) {
    this.mapbanSubscribers.push(handler);
  }
}
