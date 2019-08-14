import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';

export default class SVG extends Component {
    onChartClick(param,echarts){
        console.log(param)
    };
    getOption = () => ({
        title: {
          text: 'ECharts for react -- svg'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
    })
    render() {
        let onEvents={
            'click': this.onChartClick.bind(this)
        }
        return (
            <div className="bmain center">
                <ReactEcharts
                    option={this.getOption()} 
                    opts={{ renderer: 'svg' }}
                    onEvents={onEvents}
                    style={{width: '70%',height:'400px'}}
                />
            </div>
        )
    }
}