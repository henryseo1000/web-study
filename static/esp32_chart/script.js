import { Chart } from "./chart.js";
import { DbConnector } from "./db_connect.js";

class App {
    constructor() {
        const chartdiv = document.createElement('div');
        chartdiv.id = "chartdiv"
        document.body.appendChild(chartdiv)

        this.chart = new Chart([
            {
                value: 1100,
                time: new Date("2024-02-03").getTime()
            },
            {
                value: 1200,
                time: new Date("2024-02-04").getTime()
            },
            {
                value: 1100,
                time: new Date("2024-02-05").getTime()
            },
            {
                value: 1500,
                time: new Date("2024-02-06").getTime()
            },
        ]);
        this.connector = new DbConnector();
    }

    async init() {
        this.chart.init();
        await this.connector.init();

        this.connector.db;
    }
    
    update() {
        this.chart.update();
    }
}

window.onload = async () => {
    await new App().init()
}