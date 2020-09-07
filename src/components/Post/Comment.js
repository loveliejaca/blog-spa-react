import React, { useState } from 'react';
import '../../assets/css/comment.css';
import TimeAgo from "timeago-react";

function Comment( props ) {
	const { commentList, postId } = props
	const [content, setContent] =  useState('')

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
				<TimeAgo datetime={item.createdAt} />
			</span>
		</li>
	))

	return (
		<div className="comment">
			<h2 className="comment__title">COMMENT</h2>

			{commentList.length > 0 &&
				<ul className="comment__list">
					{list}
				</ul>
			}

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
		</div>
	)
}

export default Comment;
