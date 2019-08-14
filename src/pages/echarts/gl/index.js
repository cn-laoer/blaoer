import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-gl';

export default class Gl extends Component {
    onChartClick(param,echarts){
        console.log(param)
    };
    getOption = () => ({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        series: [{
          type: 'scatter3D',
          symbolSize: 50,
          data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1], [-1,1,-1],[-1,-1,1],[1,1,-1]],
          itemStyle: {
            opacity: 1
          }
        }]
    });
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