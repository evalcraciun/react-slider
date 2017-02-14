let slides = [
    {
        'img': "https://cdn.pixabay.com/photo/2017/02/02/13/48/girl-2032802_960_720.jpg"
    },
    {
        'img': "https://cdn.pixabay.com/photo/2014/05/13/22/40/man-343674_960_720.jpg"
    },
    {
        'img': "https://cdn.pixabay.com/photo/2014/07/31/23/49/guitarist-407212_960_720.jpg"
    },
    {
        'img': "https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790_960_720.jpg"
    },
    {
        'img': "https://cdn.pixabay.com/photo/2014/03/03/08/21/music-278795_960_720.jpg"
    },
    {
        'img': "https://cdn.pixabay.com/photo/2017/01/26/11/17/european-eagle-owl-2010346_960_720.jpg"
    },
    {
        'img': "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_960_720.jpg"
    }
];

//preButton component
let PrevButton = React.createClass({
    render: function () {
        let disabled = false;
        if (this.props.slider.state.currentSlide <= 0) {
            disabled = true;
        }
        return (
            <button disabled={disabled} className="prev" onClick={this.handleClick}>
                {disabled ? String.fromCharCode(8602) : String.fromCharCode(8612)}
            </button>
        );
    },
    handleClick: function () {

    }
});

//nextButton component
let NextButton = React.createClass({
    render: function() {
        let disabled = false;
        if (this.props.slider.state.currentSlide >= slides.length - 1) {
            disabled = true;
        }
        return (
            <button disabled={disabled} className="next" onClick={this.handleClick}>
                {disabled ? String.fromCharCode(8603) : String.fromCharCode(8614)}
            </button>
        );
    },
    handleClick: function() {
        this.props.slider.nextSlide();
    }
});

//slider component
let Slider = React.createClass({
    render: function () {
        let slide = this.props.slides[this.props.currentSlide];
        let style = {
            backgroundImage: "url(" + slide.img + ")",
            height: window.innerHeight
        };
        return (
            <div className="slide">
                <div className="img" style={style}></div>
            </div>
        );
    }
});

//Main component
let Main = React.createClass({
    getInitialState: function () {
        return {
            currentSlide:0
        }
    },
    prevSlide: function() {
        let newSlide = this.state.currentSlide;
        if (this.state['currentSlide'] > 0 ) {
            newSlide = newSlide - 1;
        }
        this.setState({'currentSlide': newSlide});
    },
    nextSlide: function() {
        let newSlide = this.state.currentSlide;
        if (this.state.currentSlide < slides.length - 1) {
            newSlide = newSlide + 1;
        }
        this.setState({'currentSlide': newSlide});
    },
    componentWillMount: function() {
        document.addEventListener('keydown', this.handleKeyDown, false);
    },
    handleKeyDown: function(e) {
        if (e.keyCode === 37) {
            this.prevSlide();
        } else if (e.keyCode === 39) {
            this.nextSlide();
        }
    },
    render: function () {
        return (
            <div className="slideshow" onKeyPress={this.handleKeyDown}>
                <Slider slides={slides} currentSlide={this.state.currentSlide}/>
                <PrevButton slider={this} />
                <NextButton slider={this} />
            </div>
        );
    }
});


ReactDOM.render(<Main/>, document.getElementById('container'));

