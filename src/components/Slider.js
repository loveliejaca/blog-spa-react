import React, { useState, useEffect } from 'react';
import '../assets/css/slider.css';

import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postDate } from "../utils/helpers.js";

// settingActions
import postActions from './../store/actions/postActions';


function Slider( props ) {
	const {reduxPostData } = props;
	const { postList } = reduxPostData;
	const slides = postList.slice(0, 3);

	const noImage = require('../assets/images/no-image.png');

	const [activeSlide, setActiveSlide] = useState(0);
	const [prevSlide, setPrevSlide] = useState(4);
	const [nextSlide, setNextSlide] = useState(1);

	const maxSlides =  3;
	let timerId = null;

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
    },3 * 1000);

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
							<div className={`slider__img ${slide.image? '' : 'is-noimage' }`} style={{  backgroundImage: `url(${slide.image? slide.image : noImage })`}}>
							</div>
							<div className="slider__txt">
								<span  dangerouslySetInnerHTML={{ __html:slide.title }} />

								<time
									dateTime={postDate(slide.createdAt)}
									className="slider__time"
									>
									{postDate(slide.createdAt)}
								</time>
							</div>

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

// export default Slider;
// export default withRouter(PostList);
Slider.propTypes = {
  postActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    reduxPostData: state.reduxPostData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));
