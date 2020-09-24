import { Permissions } from "permissions-lib";
import cuid from "cuid";

export default class User {
    private m_id: string;
    private m_name: string;
    private m_permissions: Permissions;

    public get permissions() {
        return this.m_permissions;
    }
}
