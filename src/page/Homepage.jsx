import React from "react";
import "./HomePage.css"

//Homepage component
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Initial state goes here
        };
    }

    render() {
        return (<>
            <div className="homepage">
                <div className="banner">
                    <img src="" alt=""/>
                    <p>Welcome To</p>
                    <p>SpaceX</p>
                </div>
            </div>
        </>);
    }
}

export default HomePage