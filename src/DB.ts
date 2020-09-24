import { Permission, PermissionsList } from "permissions-lib";

export default class DB {
    private m_permList: PermissionsList = new PermissionsList();

    constructor() {
        // Configure user permissions manager
        this.m_permList
            // User Roles
            .add(new Permission("dev", false))
            .add(new Permission("admin", false, ["dev"]))
            .add(new Permission("member", true, ["admin"]))
            // Other perms
            .add(new Permission("example", true, ["dev", "admin", "member"]));
    }
}
