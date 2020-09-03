import React, { useState, useEffect } from 'react';
import '../assets/css/slider.css';
const slides = [
	{
		slide: require('../assets/images/slider/slider1.jpg'),
		text: '<span>サンプルテキスト</span><span>サンプル ルテキスト</span><span>サンプルテキスト</span>'
	},
	{
		slide: require('../assets/images/slider/slider2.jpg'),
		text: '<span>サンプルテキスト</span><span>サンプル ルテキスト</span><span>サンプルテキスト</span>'
	},
	{
		slide: require('../assets/images/slider/slider3.jpg'),
		text: '<span>サンプルテキスト</span><span>サンプル ルテキスト</span><span>サンプルテキスト</span>'
	},
	{
		slide: require('../assets/images/slider/slider4.jpg'),
		text: '<span>サンプルテキスト</span><span>サンプル ルテキスト</span><span>サンプルテキスト</span>'
	}
];
function Slider( props ) {

	const [activeSlide, setActiveSlide] = useState(0);
	const [prevSlide, setPrevSlide] = useState(4);
	const [nextSlide, setNextSlide] = useState(1);
	const [direction, setDirection] = useState('left');

	const maxSlides =  slides.length
	let timerId = null;

let counter = 0;
	const setSliderStyles = () => {
		const transition =  activeSlide * - window.innerWidth;
		return {
			transform: 'translateX(' + transition + 'px)'
		}
	}

	useEffect(() => {
		timerId = setInterval(() => {
      handleNextSlide();
			setSliderStyles()
    },4 * 1000);

		// returned function will be called on component unmount
		return () => {
			clearInterval( timerId );
		}
	}, [activeSlide])


  const handlePrevSlide = () => {
    let slide = activeSlide - 1 < 0
		? slides.length - 1
		: activeSlide - 1;

		setActiveSlide(slide)
  }

  const handleNextSlide = () => {
    let slide = activeSlide < maxSlides - 1 ? activeSlide + 1 : 0;
		setActiveSlide(slide)
  }

  const handleGotoSlide = (index) => {
		setActiveSlide(index)
  }

	const controls = [];
	for(let i = 0; i < slides.length; i++) {
		controls.push(<span className={`slider__dot-item ${ i === activeSlide? 'is-active' : ''}`} key={i} onClick={() =>
		handleGotoSlide(i)}></span>)
	}

	return (
		<div className="slider">
			<div className="slider__container">
				<ul className="slider__list" style={setSliderStyles()}>
					{slides.map((slide, index) => (
						<li className={`slider__item ${index === activeSlide? 'is-active' : ''} ${index === prevSlide ? 'is-prev-slide' : ''} ${index === nextSlide ? 'is-next-slide' : ''}`} key={index}>
							<div className="slider__img" style={{  backgroundImage: `url(${slide.slide})`}}>
							</div>
							<div className="slider__txt" dangerouslySetInnerHTML={{ __html:slide.text }} />
						</li>
					))}
				</ul>
			</div>

			<div className="slider__prev" onClick={handlePrevSlide}>
				<i className="ico-arrow-slider"></i>
			</div>
			<div className="slider__next" onClick={handleNextSlide}>
				<i className="ico-arrow-slider ico-arrow-slider--next"></i>
			</div>

			<div className="slider__dot">
				 {controls}
			</div>
		</div>
	)
}

export default Slider;
