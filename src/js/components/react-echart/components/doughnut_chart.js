import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CoreChart from './core_chart';
import CoreHelper from './core_helper';

var ChartSettings = {
  theme: {
    textStyle: {
        fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
    }
  }
};

var dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false},
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.3)',
    },
    emphasis : {
        label : {
            show : true,
            position : 'center',
            textStyle : {
                fontSize : '24',
                fontWeight : 'bold'
            }
        }
    }
};

let invisible = {
  name:'invisible',
  itemStyle : {
      normal : {
          color: 'rgba(0,0,0,0)',
          label: {show:false},
          labelLine: {show:false}
      },
      emphasis : {
          color: 'rgba(0,0,0,0)'
      }
  }
}

let option = {
  color: ['#85b6b2', '#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
  tooltip : {
      show: true,
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    ...CoreHelper.horizontalScrollLegend,
    bottom: 0,
    data:['01','02','03','04','05','06']
  },
  toolbox: CoreHelper.saveImageToolbox
};

class DoughnutChart extends Component {
  parseChartOptions(props) {
    let legend = props.legend || {};
    let initialRatio = props.frame.width < props.frame.height ? (props.frame.width / 3) : (props.frame.height / 3);
    let doughtnutWidth = initialRatio / (2 * props.seriesArray.length);
    let x = initialRatio, y = initialRatio + doughtnutWidth;
    let seriesArray = props.seriesArray.map((item, index) => {
      x -= doughtnutWidth; y -= doughtnutWidth;

      if(props.limit - item.total > 0)
        item.data.push({ ...invisible, value: props.limit - item.total});

      return {
        ...item,
        type:'pie',
        clockWise: (index === 0) ? false : true,
        hoverAnimation: false,
        radius : [x, y],
        itemStyle : dataStyle,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                formatter: props.complexFormatter,
                textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        }
      }
    });

    option.series = seriesArray;

    return {
      baseOption: {
        ...option,
        title: {
          ...CoreHelper.centerTitle,
          text: props.title,
          subtext: props.subtitle,
          sublink: props.sublink
        },
        legend: {
          ...CoreHelper.horizontalScrollLegend,
          ...legend,
          data: props.labels,
          top: 55,
          formatter: props.simpleFormatter
        }
      },
      media: [{
        query: {
            maxWidth: 360
        },
        option: {
          title: {
            textStyle: {
              fontSize: 12
            }
          }
        }
      }, {
        query: {
            maxWidth: 640
        },
        option: {
          title: {
            textStyle: {
              fontSize: 14
            }
          }
        }
      }]
    };
  }

  render() {
    let options = this.parseChartOptions(this.props);
    return <CoreChart {...this.props} options={options}/>
  }
}

export default DoughnutChart;
