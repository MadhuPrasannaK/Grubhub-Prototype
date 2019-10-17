import React from "react";
import './AboutGrubhubPage.css';
import Split from 'react-split';

class AboutGrubhubPage extends React.Component {
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
            <div className="AboutGrubhub-leftside">
                <h2><b>About Grubhub</b></h2>
            </div>
            <div className="AboutGrubhub-rightside">
                <p>Grubhub helps you find and order food from wherever you are. How it works: you type in an address, we tell you the restaurants that deliver to that locale as well as showing you droves of pickup restaurants near you. Want to be more specific? Search by cuisine, restaurant name or menu item. We'll filter your results accordingly. When you find what you're looking for, you can place your order online or by phone, free of charge. Oh, and we also give you access to reviews, coupons, special deals and a 24/7 customer care team that tracks each order and makes sure you get exactly what you want.</p>
            </div>
            </Split>
        );
    }
};

export default AboutGrubhubPage;