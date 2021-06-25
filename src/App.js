import React, { useState,useEffect } from 'react';
import { MenuItem,FormControl,Select,Card,CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import {sortData} from './components/util'
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css"


function App() {
  const [mapZoom,setMapZoom]=useState(3);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter]=useState({lat:34.80786,lng:-40.4796});
  const [mapCountries,setMapCountries] =useState([]);
  const [casesType,setCasesType] = useState("cases");
  

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://www.disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data) => {
        
        const countries = data.map((country) => (
          {
            name:country.country,
            value:country.countryInfo.iso
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
      });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
     fetch('https://www.disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      
      setCountryInfo(data);
    });
  },[]);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url= countryCode === 'worldwide'?"https://www.disease.sh/v3/covid-19/all":`https://www.disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      countryCode==='worldwide'?setMapZoom(1.5):setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(4);
    });

  };


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
                <Select variant="outlined" onChange={onCountryChange} value={country}>
                    <MenuItem value="worldwide">World Wide</MenuItem>
                    {countries.map((country) => (<MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>))}
                </Select>
            </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox active={casesType === "cases"} title="Coronavirus Cases" cases={countryInfo.todayCases}  total={countryInfo.cases} onClick={(e) => setCasesType('cases')}/>
          <InfoBox active={casesType === "recovered"} title="Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered} onClick={(e) => setCasesType('recovered')}/>
          <InfoBox active={casesType === "deaths"} title="Deaths" cases={countryInfo.todayDeaths}  total={countryInfo.deaths} onClick={(e) => setCasesType('deaths')}/>
        </div>
        <Map countries={mapCountries} casesType={casesType} center ={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>World wide new {casesType}</h3>
          <LineGraph className="app__chart" casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
