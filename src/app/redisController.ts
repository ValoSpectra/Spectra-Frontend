import { createClient } from "redis";

let lastEventNumber = 0;

export class RedisController {
    private static instance: RedisController;
    private client = createClient();

    public static getInstance(): RedisController {
        if (RedisController.instance == null) RedisController.instance = new RedisController();
        return RedisController.instance;
    }

    constructor() {
        this.client.on("error", function (error) {
            console.error(`Redis error: ${error}`);
        });
        this.client.connect();
        this.client.subscribe("match_info", (msg, chn) => {
            console.log(`Received message from ${chn}: ${msg}`);
        });
    }

    registerReceiver(callback: (msg: string) => void) {
        this.client.subscribe("match_info", (msg, chn) => {
            callback(msg);
        });
    }

}