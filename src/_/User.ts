export default class User {
    private m_isDeveloper: boolean;
    private m_isAdministrator: boolean;
    private m_isPermGranted: boolean;
    private m_snowflake: string;

    constructor(json: { snowflake: string; developer: boolean; administrator: boolean; permsGranted: boolean }) {
        this.m_isDeveloper = json.developer || false;
        this.m_isAdministrator = json.administrator || false;
        this.m_isPermGranted = json.permsGranted || false;
        this.m_snowflake = json.snowflake || "0";
    }
}
