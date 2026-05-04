import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js'
import { getDatabase, set, get, ref, update, query } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js';
import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

export class DbConnector {
    constructor () {
        this.config = null;
        this.app = null;
        this.db = null;
    }

    async init() {
        this.config = await this.getConfig();
        this.app = initializeApp(this.config);
        this.db = getDatabase(this.app);
    }

    async getConfig () {
        const config = await axios.get('/getConfig')
        .then(function (result) {
            const status = result.status;
            const data = result.data;
            return data;
        })
        .catch(function (err) {
            console.log(err);
        });

        return config;
    }
}