import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import { getArcadesByAddress } from  '../../actions/arcades';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl, Popup } from 'react-mapbox-gl';
import FavoriteIcon from './FavoriteIcon';
// import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoic2Vhbm1jZ292ZXJuIiwiYSI6ImNrZ3M3cmloazAzODEydXExcWRsdWNwcngifQ.YP0JMAU2CM5iPnS5MyUusw',
    trackResize: true,
});

const CaretLeft = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16"><path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/></svg>

const CaretRight = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>

const StarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>

const PinballMap = (props) => {

    const handleStyleLoad = map => {
        map.resize();
        props.toggleDrawer();
    };

    const onPress = (e) => {
        e.preventDefault();
        props.toggleDrawer();
    }

    const [center, setCenter] = useState([-78.476677, 38.029305]);

    useEffect(() => {
        if (props.arcades?.locations) {
            const average = arr => arr.reduce((sum, cur) => sum + cur, 0) / arr.length;
            const lats = props.arcades.locations.map(m => parseFloat(m.lat));
            const lons = props.arcades.locations.map(m => parseFloat(m.lon));
            const averageLon = average(lons);
            const averageLat = average(lats);
            setCenter([averageLon, averageLat]);
            closePopup();
        }
    }, [props.arcades]);

    const [popupLocation, setPopupLocation] = useState();

    const handleMarkerClick = (loc) => {
        setPopupLocation(loc);
    };

    const closePopup = () => {
        setPopupLocation();
    }
    
    return (
        <Map 
            // style="mapbox://styles/mapbox/streets-v9"
            style="mapbox://styles/mapbox/light-v9"
            containerStyle={{
                height: '85vh',
                width: '100%',
                flex: 1, 
            }}
            center={center}
            onStyleLoad={handleStyleLoad}
            >
            <button className="btn rounded-left shadow" style={{position: "absolute", top: 5, left: -5, backgroundColor: "#F5F9F9", opacity: 0.75}} onClick={onPress}>{props.isVisible ? CaretLeft : CaretRight}</button>
            <ZoomControl/>
                {props.arcades?.locations?.map(mach => (
                    <Marker 
                        coordinates={[mach.lon, mach.lat]} 
                        anchor="bottom" 
                        key={mach.id} 
                        onClick={() => handleMarkerClick(mach)}>
                        <img src="https://img.icons8.com/ultraviolet/40/000000/marker.png"/>                    
                    </Marker>
                ))}
            {popupLocation && (
                <Popup
                    style={{width: "400px"}}
                    coordinates={[popupLocation.lon, popupLocation.lat]}
                    anchor="bottom"
                    offset={25}
                >
                    <div className="card border-success p-2 m-0" style={{backgroundColor: "#F5F9F9"}}>
                        <div className="card-body pb-0">
                            <div className="d-flex">
                                <h5 className="card-title text-primary m-0">{popupLocation.name}</h5>
                                <FavoriteIcon/>
                            </div>
                            <h5 className="card-text m-0"><small className="text-muted">{popupLocation.street}</small></h5>
                            <h6 className="font-weight-normal m-1">{popupLocation.description}</h6>
                        </div>
                        <div className="d-inline-flex justify-content-around pb-1">
                            <button type="button" class="btn btn-success">Machines</button>
                            <button onClick={closePopup} type="button" class="btn btn-secondary">Close</button>
                        </div>
                    </div>
                </Popup>
            )}
        </Map>
    )
};

const mapStateToProps = state => ({
    arcades: state.arcades.arcades
});

export default connect(mapStateToProps, { getArcadesByAddress })(PinballMap);