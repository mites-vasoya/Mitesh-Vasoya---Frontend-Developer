import React from "react";
import "./HomePage.css"
import Homepage_SpaceCenter_Image from "../assets/Homepage_SpaceCenter_Image.jpg"
import SpaceImage from "../assets/Homepage_Space Image.png"
import SpaceShuttle from "../assets/Space-Shuttle.png"

//Homepage component
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollHeight: 0, bgImg1Scale: 1.2, bgImg2Scale: 3, shuttleImgScale: 1,
        };
        this.scrollRef = React.createRef();
        this.initialBackgroundImg = "width: 100%;height: 100%;object-fit: cover;opacity: 0.7;position: absolute;transform: scale(120%)  translate(-8%, -8%);"
    }

    handleScroll = () => {
        const banner = document.getElementById("banner-id");
        const bgImg1 = document.getElementById("bg-img1-id");
        const bgImg2 = document.getElementById("bg-img2-id");
        const spaceShuttle = document.getElementById("space-shuttle-id");

        if (window.scrollY === 0) {
            let bottom = 1.99
            // banner.style.opacity = 1
            const bottomSetInterval = setInterval(() => {
                if (bottom >= -2) {
                    bottom -= 0.2
                    spaceShuttle.style = `bottom :${bottom}vw`
                } else {
                    clearInterval(bottomSetInterval)
                }
            }, 30)

        } else if (window.scrollY === 2 * window.innerHeight) {
            bgImg2.style = `opacity :1`

        } else {

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

            console.log("Scrolling...", window.innerHeight);
            // bgImg2.style.opacity = Math.abs(1 - (1 - (scrollTop) / 800));

            bgImg2.style = `transform : scale(${bgImg2Scale}); opacity : ${Math.abs(1 - (1.5 - (scrollTop) / 800))}`
        }
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const {scrollHeight} = this.state;
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
                    <div className="search-bar">
                        <label htmlFor="search-field" id="search-field-label-id"> Search : </label>
                        <input type="text" id="search-field"/>
                        <label htmlFor="search-by" id="search-by-label-id">Search By : </label>
                        <select name="search-type" id="search-type-option-id">
                            <option value="status">Status</option>
                            <option value="original_launch">Original Launch</option>
                            <option value="type">Type</option>
                        </select>
                    </div>
                    <div className="data-grid" id="data-grid-id">

                    </div>
                </div>

            </div>
        </>);
    }
}

export default HomePage