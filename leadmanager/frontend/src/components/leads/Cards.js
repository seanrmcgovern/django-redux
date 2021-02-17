import React, { useState } from 'react';
import FavoriteIcon from './FavoriteIcon';
import { connect } from 'react-redux';
import { openArcadeDetails } from '../../actions/arcades';

const Cards = (props) => {

    const [hoveredCard, setHoveredCard] = useState();

    return (
        <div className="m-2">
            {props.data?.locations?.map(item => (
                <div 
                    className="card m-3" 
                    key={item.id} 
                    onClick={() => props.openArcadeDetails(item)}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{borderColor: hoveredCard == item.id ? "#00B875" : "", borderWidth: 3, cursor: hoveredCard == item.id ? "pointer" : "auto"}}
                >
                        <FavoriteIcon/>
                        <div className="card-body">
                            <h5 className="card-title text-primary m-0">{item.name}</h5>
                            <p className="card-text m-0"><small className="text-muted">{item.street}</small></p>
                            <p className="card-text">{item.description}</p>
                            {/* // number of machines
                            // rating system */}
                        </div>
                </div>
            ))}
        </div>
    );
};

export default connect(null, { openArcadeDetails })(Cards);
