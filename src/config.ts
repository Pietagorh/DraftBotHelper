import {readFileSync} from "fs";

// Dégueulasse mais ça marchait pas sinon, aucune idée de pourquoi
export const config = JSON.parse(readFileSync("./config.json", "utf-8")) as unknown as {token: string, draftbotId: string};