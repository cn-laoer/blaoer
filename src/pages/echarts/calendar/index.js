import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

export default class Calendar extends Component {
    onChartClick(param,echarts){
        console.log(param)
    };
    getVirtulData = (year) => {
        year = year || '2019';
        const date = +echarts.number.parseDate(year + '-01-01');
        const end = +echarts.number.parseDate((+year + 1) + '-01-01');
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 1000)
            ]);
        }
        return data;
    };
    getOption = () => {
        const graphData = [[
              1485941472000,
              260
          ],[
              1486200672000,
              200
          ],[
              1486632672000,
              279
          ],[
              1486978272000,
              847
          ],[
              1487410272000,
              241
          ], [
              1487842272000,
              411
          ], [
              1488187872000,
              985
          ]
        ];
    
        const links = graphData.map(function (item, idx) {
          return {
            source: idx,
            target: idx + 1
          };
        });
        links.pop();
    
        return {
          tooltip: {
            position: 'top'
          },
          visualMap: [{
            min: 0,
            max: 1000,
            calculable: true,
            seriesIndex: [2, 3, 4],
            orient: 'horizontal',
            left: '55%',
            bottom: 20
          }, {
            min: 0,
            max: 1000,
            inRange: {
              color: ['grey'],
              opacity: [0, 0.3]
            },
            controller: {
              inRange: {
                opacity: [0.3, 0.6]
              },
              outOfRange: {
                color: '#ccc'
              }
            },
            calculable: true,
            seriesIndex: [1],
            orient: 'horizontal',
            left: '10%',
            bottom: 20
          }],
    
          calendar: [
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 20
            },
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn'
            },
            cellSize: 40,
            range: '2017-02'
          },
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              margin: 20
            },
            cellSize: 40,
            left: 460,
            range: '2017-01'
          },
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              margin: 20
            },
            cellSize: 40,
            top: 350,
            range: '2017-03'
          },
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            dayLabel: {
              firstDay: 1,
              nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 20
            },
            cellSize: 40,
            top: 350,
            left: 460,
            range: '2017-04'
          }],
    
          series: [{
            type: 'graph',
            edgeSymbol: ['none', 'arrow'],
            coordinateSystem: 'calendar',
            links: links,
            symbolSize: 10,
            calendarIndex: 0,
            data: graphData
          }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.getVirtulData(2017)
          }, {
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            symbolSize: function (val) {
              return val[1] / 40;
            },
            data: this.getVirtulData(2017)
        }, {
            type: 'scatter',
            coordinateSystem: 'calendar',
            calendarIndex: 2,
            symbolSize: function (val) {
              return val[1] / 60;
            },
            data: this.getVirtulData(2017)
          }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 3,
            data: this.getVirtulData(2017)
          }]
        };
    };
    render() {
        let onEvents={
            'click': this.onChartClick.bind(this)
        }
        return (
            <div className="bmain center">
                <ReactEcharts
                    option={this.getOption()} 
                    notMerge={true}
                    lazyUpdate={true}
                    onEvents={onEvents}
                    style={{width: '70%',height:'650px'}}
                />
            </div>
        )
    }
}