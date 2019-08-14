import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

export default class GCalendar extends Component {
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
        return {
          tooltip: {
            position: 'top'
          },
          visualMap: {
            min: 0,
            max: 1000,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            top: 'top'
          },
    
          calendar: [{
            range: '2019',
            cellSize: ['auto', 20]
          }, {
            top: 260,
            range: '2018',
            cellSize: ['auto', 20]
          }],
    
          series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: this.getVirtulData(2019)
          }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: this.getVirtulData(2018)
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
                    onEvents={onEvents}
                    style={{width: '70%',height:'500px'}}
                />
            </div>
        )
    }
}