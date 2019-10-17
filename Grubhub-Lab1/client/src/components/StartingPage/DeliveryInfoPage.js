import React from "react";
import './DeliveryInfoPage.css';
import Split from 'react-split';

class DeliveryInfoPage extends React.Component {
    render() {
        return(
            <Split
            sizes={[50, 50]}
            minSize={100}
            expandToMin={false}
            gutterSize={0}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            > 
           
            <div className="Delivery-leftside">
                <h2><b>Pickup or delivery from restaurants near you</b></h2>
                <p>Explore restaurants that deliver near you, or try yummy takeout fare. With a place for every taste, it’s easy to find food you crave, and order online or through the Grubhub app. Find great meals fast with lots of local menus. Enjoy eating the convenient way with places that deliver to your door.</p>
            </div>
           
            <div className="Delivery-rightside"></div>
            
            </Split>
        );
    }
};

export default DeliveryInfoPage;