import React, { useState,useEffect } from 'react';
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'

let options = {
    legend: {
        display: false,
    },
    elements:{
        point:{
            radius:0,
        },
    },
    responsive:true,
    maintainAspectRatio:false,
    tooltips: {
        mode:"index",
        intersect:false,
        callbacks:{
            label:function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:"ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines:{
                    display:false,
                },
                ticks: {
                    callback: function(value,index,values){
                        return numeral(value).format('0 a');
                    },
                },
            },
        ]
    }
};

function LineGraph({casesType='cases' , ... props}) {
    const [data,setData] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
            await fetch('https://www.disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response =>response.json())
            .then(data=>{
                let chartData = buildChartData(data,casesType);
                setData(chartData);
            });
        };
        fetchData();
    },[casesType]);


    const buildChartData = (data,casesType="cases") => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases){
           if(lastDataPoint){
               const newDataPoint = {
                   x:date,
                   y:data[casesType][date]-lastDataPoint
               }
               chartData.push(newDataPoint);
           }
           lastDataPoint=data[casesType][date];
            
        }
        return chartData;
    };


    //https://www.disease.sh/v3/covid-19/historical/all?lastdays=120
    return (
        <div className={props.className}>
            {data?.length>0 && (
                <Line 
                options={options}
                data={{
                   datasets:[{
                       
                    label: 'Number of '+casesType ,
                       backgroundColor:"rgba(204,16,52,0.5)",
                       borderColor:"#CC1034",
                       fill:true,
                       data:data}]}} />
            )}
            
        </div>
    )
}

export default LineGraph
