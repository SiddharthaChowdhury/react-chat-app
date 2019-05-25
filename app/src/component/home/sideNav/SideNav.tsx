import * as React from 'react';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography} from "@material-ui/core";

interface ISideNavProps {}

export const SideNav: React.FC<ISideNavProps> = (props) => {
    const [expanded, setExpanded] = React.useState('people');
    const handleChange = (panel: any) => (event: any, newExpanded: any): any => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            <ExpansionPanel square expanded={expanded === 'people'} onChange={handleChange('people')}>
                <ExpansionPanelSummary aria-controls="peopled-content" id="peopled-header">
                    <Typography><b>People</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        List of people
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'groups'} onChange={handleChange('groups')}>
                <ExpansionPanelSummary aria-controls="groupsd-content" id="groupsd-header">
                    <Typography><b>Groups</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        list of groups
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography><b>Others</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Some other content
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>
    )
};