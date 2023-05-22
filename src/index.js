
/* Env */
import * as dotenv from "dotenv";
dotenv.config();

/* Imports */
import fetch from "node-fetch";
import fs from "fs";
import icalToJSON from "ical2json";
import extract from "./extract.js";


/* Constants */
const URL = process.env.CALENDER_URL || process.env.BACKUP_URL;


/* Main */
async function main(){

    // Get ICS text
    const res = await fetch(URL);
    const text = await res.text();

    // Convert to JSON
    const rawJSON = icalToJSON.convert(text);

    // Extract
    const json = extract(rawJSON);

    // Write to file
    fs.writeFileSync("www/raw-calender.json", JSON.stringify(rawJSON, null, 2));
    fs.writeFileSync("www/calender.json", JSON.stringify(json, null, 2));

}

main().catch(console.log);