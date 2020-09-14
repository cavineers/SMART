import { Collection } from "discord.js";
import User from "./_/User";

export default class DB {
    public users: Collection<String, User> = new Collection<String, User>();
}
