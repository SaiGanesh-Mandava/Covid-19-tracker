import React from 'react'
import {Card,CardContent, Typography} from '@material-ui/core'
import './InfoBox.css'
import { prettyPrintStat } from './util'

function InfoBox({title, cases, total,active,recovered=false,deaths=false, ...props}) {
    let casesClass = '';
    let activeClass = '';
    let selectedClass='';
    casesClass = recovered?'infoBox__cases--recovered':(deaths?'infoBox__cases--deaths':'');
    activeClass = active && recovered ?'infoBox--recovered':((active &&deaths)?'infoBoxes--deaths':'');
    selectedClass = active?'infoBox--selected':'';
    return (
        <Card  raised={true}  onClick={props.onClick} className={`infoBox ${selectedClass} ${activeClass}`}>
            
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
