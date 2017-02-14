let slides = [
    {
        'img': "images/1.jpg"
    },
    {
        'img': "images/2.jpg"
    },
    {
        'img': "images/3.jpg"
    },
    {
        'img': "images/4.jpg"
    },
    {
        'img': "images/5.jpg"
    },
    {
        'img': "images/6.jpg"
    },
    {
        'img': "images/7.jpg"
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

