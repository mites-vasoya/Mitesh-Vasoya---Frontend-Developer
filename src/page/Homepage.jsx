import React from "react";
import "./HomePage.css"
import Homepage_SpaceCenter_Image from "../assets/Homepage_SpaceCenter_Image.jpg"
import SpaceImage from "../assets/Homepage_Space Image.png"
import SpaceShuttle from "../assets/Space-Shuttle.png"
import DataTable from "../components/DataTable";

//Homepage component
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollHeight: 0, bgImg1Scale: 1.2, bgImg2Scale: 3, shuttleImgScale: 1, searchQuery: "", searchBy: "status",
            responseData: []
        };
        this.scrollRef = React.createRef();
        this.initialBackgroundImg = "width: 100%;height: 100%;object-fit: cover;opacity: 0.7;position: absolute;transform: scale(120%)  translate(-8%, -8%);"

    }

    handleScroll = () => {
        const banner = document.getElementById("banner-id");
        const banner2 = document.getElementById("banner2-id");
        const bgImg1 = document.getElementById("bg-img1-id");
        const bgImg2 = document.getElementById("bg-img2-id");
        const spaceShuttle = document.getElementById("space-shuttle-id");

        if (window.scrollY === 0) {
            let bottom = 1.99
            const bottomSetInterval = setInterval(() => {
                if (bottom >= -2) {
                    bottom -= 0.2
                    spaceShuttle.style = `bottom :${bottom}vw`
                } else {
                    clearInterval(bottomSetInterval)
                }
            }, 30)
        } else if (window.scrollY === 2 * window.innerHeight) {
            banner2.style = `opacity : 1`
        } else {
            //Set CSS on Scrolling...
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const maxScroll = 500;
            const maxScroll2 = 1000;
            const minScale = 0.4;
            const scrollRange = Math.min(scrollTop, maxScroll);
            const scrollRange2 = Math.min(scrollTop, maxScroll2);
            const bgImg1Scale = 1 + ((1.2 - 1) * (maxScroll - scrollRange) / maxScroll);
            const bgImg2Scale = 1 + ((8 - 1) * (maxScroll2 - scrollRange2) / maxScroll);
            const shuttleImgScale = 1 - (scrollRange / maxScroll) * (1 - minScale) / 2;
            this.setState({bgImg1Scale});
            this.setState({shuttleImgScale});
            bgImg1.style = `transform : scale(${bgImg1Scale})`;
            spaceShuttle.style = `transform : scale(${shuttleImgScale}); bottom : ${shuttleImgScale * 2}vw`
            banner.style.opacity = Math.abs(1 - (scrollTop) / 800);

            bgImg2.style = `transform : scale(${bgImg2Scale});`;
            banner2.style = `opacity : ${Math.abs(1 - (1.5 - (scrollTop) / 400))}`;
        }
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value}, () => {
            const {searchQuery, searchBy} = this.state;
        });
    };

    handleSearchSubmit = (event) => {
        event.preventDefault();

        const {searchQuery, searchBy} = this.state;

        // Prepare form data to be sent to the PHP API
        const formData = new FormData();
        formData.append('searchQuery', searchQuery);
        formData.append('searchBy', searchBy);

        // Send the POST request to the PHP API
        fetch('http://localhost:8000/api.php', {
            method: 'POST', body: formData,
        })
            .then((response) => response.json())
            .then((responseData) => {
                // Handle the API response
                this.setState({responseData})
                console.log("Response : ", typeof responseData);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const {scrollHeight, searchQuery, searchBy} = this.state;
        return (<>
            <div className="homepage" ref={this.scrollRef} onScroll={this.handleScroll}>
                <div className="banner" id="banner-id">
                    <img src={Homepage_SpaceCenter_Image} alt="Base Space Station Image" id="bg-img1-id"/>
                    <p id="welcome-title-id">Welcome To</p>
                    <p id="spacex-title-id">SpaceX</p>
                    <img src={SpaceShuttle} alt="Space-Shuttle" id="space-shuttle-id"
                    />
                </div>
                <div className="banner2" id="banner2-id">
                    <img src={SpaceImage} alt="Base Space Station Image" id="bg-img2-id"/>
                    <form id="search-form-id" onSubmit={this.handleSearchSubmit}>
                        <div className="search-bar">
                            <label htmlFor="search-by" id="search-by-label-id">Search By : </label>
                            <select name="searchBy" id="search-type-option-id" required={true}
                                    value={searchBy}
                                    onChange={this.handleInputChange}>
                                <option value="status">Status</option>
                                <option value="type">Type</option>
                                <option value="reuse_count">Reuse Counts</option>
                            </select>
                            {searchBy === "status" ? (<>
                                <label htmlFor="search-field" id="search-field-label-id"> Status : </label>
                                <select name="searchQuery" id="search-field"
                                        value={searchQuery}
                                        onChange={this.handleInputChange}
                                        required={true}
                                >
                                    <option value="active">Active</option>
                                    <option value="unknown">Unknown</option>
                                    <option value="retired">Retired</option>
                                </select></>) : searchBy === "reuse_count" ? (<>
                                <label htmlFor="search-field" id="search-field-label-id"> Reuse Counts
                                    : </label>
                                <input type="number" id="search-field" name="searchQuery" value={searchQuery}
                                       max="10" min="0"
                                       onChange={this.handleInputChange}/>
                            </>) : (<>
                                    <label htmlFor="search-field" id="search-field-label-id"> Type
                                        : </label>
                                    <select name="searchQuery" id="search-field" value={searchQuery}
                                            onChange={this.handleInputChange} required={true}>
                                        <option value="Dragon 1.0">Dragon 1.0</option>
                                        <option value="Dragon 1.1">Dragon 1.1</option>
                                        <option value="Dragon 2.0">Dragon 2.0</option>
                                    </select></>
                            )}

                            <button type="submit" id="submit-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="data-grid" id="data-grid-id">
                        {
                            this.state.responseData.length > 0 ? (
                                <DataTable responseData={this.state.responseData}/>) : ""
                        }

                    </div>
                </div>

            </div>
        </>);
    }
}

export default HomePage