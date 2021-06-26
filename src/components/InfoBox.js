import React from 'react'
import {Card,CardContent, Typography} from '@material-ui/core'
import './InfoBox.css'
import { prettyPrintStat } from './util'

function InfoBox({title, cases, total,active,recovered=false,deaths=false, ...props}) {
    let casesClass = '';
    if(recovered){
        casesClass="infoBox__cases--recovered";
    }
    else if(deaths)
    casesClass="infoBox__cases--deaths";
    return (
        <Card  onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"}  ${active && recovered && "infoBox--recovered"} ${active && deaths && "infoBox--deaths"}`}>
            
            <CardContent>
                <Typography className="infoBox__title"  >
                    {title}
                </Typography>
                <h2 className={`infoBox__cases  ${casesClass}`}>
                    {prettyPrintStat(cases)}
                    </h2>
                <Typography className="infoBox__total">
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
