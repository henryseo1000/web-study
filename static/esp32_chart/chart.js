export class Chart {
    constructor(data) {
        this.data = data;
    }

    init() {
        var root = am5.Root.new("chartdiv"); 

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push (
            am5xy.XYChart.new(root, {
                focusable: true,
                wheelX: "panX",
                wheelY: "zoomX",
                paddingRight: 50,
                paddingTop: 50,
                paddingBottom: 50,
                paddingLeft: 50,
            })
        )

        var xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                maxDeviation: 0.1,
                groupData: false,
                baseInterval: {
                    timeUnit: 'day',
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 20,
                    tooltipDateFormat: "yyyy-MM-dd"
                }),
            })
        )

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 1,
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        )

        var series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "ESP32 값",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "time",
                minDistance: 10,
                connect:false,
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        series.strokes.template.setAll({
            strokeWidth: 1,
            templateField: "strokeSettings"
        })

        series.get("tooltip").label.set("text", "[bold]{value}[/]\n{valueX.formatDate()}: {valueY}")

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: am5.Circle.new(root, {
                    radius: 3,
                    fill: series.get("fill"),
                })
            })
        })

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis,
            yAxis: yAxis
        }));

        series.data.setAll(this.data);
        series.fills.template.setAll({
            visible: true,
            fillOpacity: 1
        });

        series.strokes.template.setAll({
            strokeWidth: 2
        });

        series.fills.template.set("fillGradient", am5.LinearGradient.new(root, {
            stops: [{
                opacity: 1,
            }, {
                opacity: 0.2,
            }],
            rotation: 90,
            target: chart.plotContainer
        }));

        series.appear(1000, 100);
        chart.appear(1000, 100);

        // var legend = chart.children.push(am5.Legend.new(root, {

        // }));

        // legend.data.setAll(chart.series.values);
    }

    update() {
        
    }

    setData(data) {
        this.data = data;
    }
}