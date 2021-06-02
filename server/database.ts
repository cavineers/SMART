/* eslint-disable camelcase */
import * as fs from 'fs';

export class DataBase {
    private competitionName: string;

    private competitionInfo;

    constructor() {
        console.log('Gathering Manifest Data');
        this.competitionInfo = fs.readFileSync('../database/manifest.json');
        this.competitionName = this.competitionInfo.competition;
    }

    public getCompetitionName() {
        return this.competitionName;
    }

    public getTBAInfo() {
        const url: string = `https://www.thebluealliance.com/api/v3/event/${this.getCompetitionName()}/matches/simple`;

        const headers = {
            'X-TBA-Auth-Key': 'n76cwPuhoIXIzKEHJsLFklHpzAbRFg9LDMo1TbOepLo8xOLIOHAkkUZn0NtKTvUE',
        };

        const url_options = {
            headers: headers,
        };

        fetch(url, url_options)
            .then((response) => response.json())
            .then((myJson) => {
                if (navigator.onLine === true) {
                    myJson.forEach((data) => {
                        if (data.comp_level.includes('qm')) {
                            return `${data.alliances.blue.team_keys},${data.alliances.red.team_keys}`;
                        }
                        if (data.comp_level.includes('qf')) {
                            return `${data.alliances.blue.team_keys},${data.alliances.red.team_keys}`;
                        }
                    });
                }
            });
    }
}
