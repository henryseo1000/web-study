var root = am5.Root.new("chartdiv"); 

root.setThemes([
    am5themes_Animated.new(root)
]);

var chart = root.container.children.push (
    am5xy.XYChart.new(root, {
        focusable: true,
        wheelX: "panX",
        wheelY: "zoomX",
        padding: 0
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
            minGridDistance: 20
        }),
    })
)

var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
    })
)

// var paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
// var paretoAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//   renderer: paretoAxisRenderer,
//   min: 0,
//   max: 100,
//   strictMinMax: true
// }));

var series = chart.series.push(
    am5xy.LineSeries.new(root, {
        name: "영화1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        minDistance: 10,
        connect:false
    })
);

series.strokes.template.setAll({
    strokeWidth: 1,
    templateField: "strokeSettings"
})

series.bullets.push(function () {
    return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Circle.new(root, {
            radius: 3,
            fill: series.get("fill"),

        })
    })
})

var data = [
    {
        date: new Date(2021, 2, 1).getTime(),
        value: 1000
    }, 
    {
        date: new Date(2021, 2, 2).getTime(),
        value: 700
    }, 
    {
        date: new Date(2021, 2, 3).getTime(),
        value: 750
    }, 
    {
        date: new Date(2021, 2, 4).getTime(),
        value: 900
    }, 
    {
        date: new Date(2021, 2, 5).getTime(),
        value: 902
    }
    , 
    {
        date: new Date(2021, 2, 6).getTime(),
        value: 1150
    }
    , 
    {
        date: new Date(2021, 2, 7).getTime(),
        value: 1001
    }
    , 
    {
        date: new Date(2021, 2, 8).getTime(),
        value: 560
    }
];

var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    xAxis: xAxis
}));
cursor.lineY.set("visible", false);

series.data.setAll(data);

var series2 = chart.series.push(
    am5xy.SmoothedXLineSeries.new(root, {
        name: "영화2",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        minDistance: 10,
        connect:false
    })
);

series2.bullets.push(function () {
    return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Circle.new(root, {
            radius: 3,
            fill: series.get("fill"),

        })
    })
})

series2.data.setAll(data);

series.appear(1000, 100);
series2.appear(1000, 100);
chart.appear(1000, 100);

var legend = chart.children.push(am5.Legend.new(root, {

}));
legend.data.setAll(chart.series.values);

/*
root - 밑바탕
chart - 차트의 요소들을 담는 그릇 - chart의 종류를 정해줄 수 있다.

chart의 xAxes와 yAxes에 들어가는 값들도 설정이 가능하며, 해당 값이 Date인지도 Axis종류로 설정이 가능
각 Axis에는 Renderer를 설정해 사이 간격 등을 조정해줄 수 있다.

series - 각 데이터를 나타내는 선. Series를 여러 개 추가할 수 있다.
*/