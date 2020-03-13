import React from 'react';
import axios from 'axios';

import Moment from 'moment';

export default class FlexibleContent extends React.Component{



    render(){

        let flexible_content = this.props.content;

        if(flexible_content.acf_fc_layout=="content"){
            return (
                <div dangerouslySetInnerHTML={{__html: flexible_content.content}} />
            );
        } else if(flexible_content.acf_fc_layout=="costs"){
            return (
                <ul> 
                   {flexible_content.breakdown.map(cost => 
                        <li>
                            <i className={"fas fa-" + cost.icon }></i> {cost.title} - {cost.total}
                            <div dangerouslySetInnerHTML={{__html: cost.description}} />
                        </li>
                    )}
                </ul>
            );
        }
    }


}