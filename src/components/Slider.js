import React, { useState, useEffect } from 'react';
import '../assets/css/slider.css';

function Slider( props ) {
	const [slides, setSlides] = useState([
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
		}
	]);

	const [activeSlide, setActiveSlide] = useState(0);
	const [delay, setDelay] = useState(4);
	let timerId = null;

	useEffect(() => {
		timerId = setInterval(() => {
      handleNextSlide();
    },delay * 1000);

		// returned function will be called on component unmount
		return () => {
			clearInterval( timerId );
		}
	}, [])


  const handlePrevSlide = () => {
    let slide = activeSlide - 1 < 0
		? slides.length - 1
		: activeSlide - 1;

		console.log("slide", slide);

		setActiveSlide(slide)
  }

  const handleNextSlide = () => {
    let slide = activeSlide + 1 < slides.length
		? activeSlide + 1
		: 0;

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
			<ul className="slider__list">
				{slides.map((slide, index) => (
					<li className={`slider__item ${index === activeSlide? 'is-active' : ''}`} key={index}>
						<div className="slider__img" style={{  backgroundImage: `url(${slide.slide})`}}>
						</div>
						<div className="slider__txt" dangerouslySetInnerHTML={{ __html:slide.text }} />
					</li>
				))}
			</ul>

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
