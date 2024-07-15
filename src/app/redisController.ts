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
    }

    registerReceiver(callback: (data: any) => void) {
        this.client.subscribe("match_info", (message: string, _chn) => callback(JSON.parse(message)));
    }

}