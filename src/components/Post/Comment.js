import React, { useState, useEffect } from 'react';
import '../../assets/css/comment.css';
import moment from 'moment'

function Comment( props ) {
	const { commentList, postId } = props
	const [content, setContent] =  useState('')

	console.log("commentList", props);


	const handleSubmit = (e) => {
		e.preventDefault();
    if(content === '') return;
		props.handleSubmitComment(content);
    setContent('');
	}

	const list = commentList.map((item, index) => (
		<li className="comment__item" key={index}>
			<p>{item.content}</p>

			<span className="comment__date">
				{moment(item.createdAt).format('YYYY-MM-DD, h:mm:ss a')}

			</span>
		</li>
	))

	return (
		<div className="comment">
			<h2 className="comment__title">COMMENT</h2>

			<form onSubmit={handleSubmit} >
				<div className="comment__textarea">
					<textarea
						name="comment"
						placeholder="Write comment"
						value={content}
						onChange={e => setContent(e.target.value)}>
					</textarea>
				</div>
				<button className="btn-comment" type="submit" name="button">
					<span> SUBMIT </span>
				</button>
			</form>

			{commentList.length > 0 &&
				<ul className="comment__list">
					{list}
				</ul>
			}
		</div>
	)
}

export default Comment;
