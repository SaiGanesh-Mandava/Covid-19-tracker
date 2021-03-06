import React from "react"
import numeral from "numeral"
import { Circle,Popup } from "react-leaflet"


const casesTypeColors ={
    cases:{
        hex:"#ffaa00",
        rgb:"rgb(255, 170, 0)",
        half_op:"rgba(255, 170, 0,0.5)",
        multiplier:300,
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29)",
        half_op:"rgba(125,215,29,0.5)",
        multiplier:400,
    },
    deaths:{
        hex:"#fb4443",
        rgb:"rgb(251,68,67)",
        half_op:"rgba(251,68,67,0.5)",
        multiplier:1000,
    }
}

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b) => a.cases>b.cases?-1:1);

    return sortedData;
};

export const showDataOnMap = (data,casesType='cases') => {
   return data.map(country =>(
        <Circle  
            key={country.country}
            center={[country.countryInfo.lat,country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor = {casesTypeColors[casesType].hex}
            radius = {
                Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
            }
        >
            <Popup >
                <div className="info-container">
                    <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
            
        </Circle>
    ));
};

export const prettyPrintStat = (stat) => {
    return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
};