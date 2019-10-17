import React from "react";
import Image from 'react-image-resizer';
import './SnippetsPage.css';

class SnippetsPage extends React.Component {
    render() {
        return(
            <div className="container">
                 <div className="row">
                    <div className="col-sm">
                        <div className="image-styling">
                        <Image
                            src="https://cdn1.iconfinder.com/data/icons/urban-infrastructure-cartoon/512/g6574-512.png"
                            height={125}
                            width={125}
                        />
                        </div>
                        <h5><b>Local favorites</b></h5>
                    Satisfy any craving with delivery from popular neighborhood restaurants and chains. Reorder go-tos or find something new.
                    </div>
                    <div className="col-sm">
                        <div className="image-styling">
                        <Image
                            src="https://cdn3.iconfinder.com/data/icons/business-and-leadership/128/special_offer-512.png"
                            height={125}
                            width={125}
                        />
                        </div>
                        <h5><b>Delivery to your doorstep</b></h5>
                    Get great food delivered or save time and money and preorder for pick up. Either way, order tracking and updates keep you in the know.
                    </div>
                    <div className="col-sm">
                        <div className="image-styling">
                        <Image
                            src="https://library.kissclipart.com/20180903/zww/kissclipart-delivery-food-png-clipart-take-out-delivery-pizza-73c09fdceb61f46b.png"
                            height={125}
                            width={125}
                        />
                        </div>
                        <h5><b>Exclusive Perks</b></h5>
                    Discover more deals and restaurant rewards near you. Cash in on Perks and get $100s in savings.
                    </div>
            </div>
            </div>
        );
    }
}

export default SnippetsPage;
