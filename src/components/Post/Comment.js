import React from 'react';
import '../../assets/css/comment.css';
import moment from 'moment'

function Comment( props ) {
	const { commentList } = props;
	const list = commentList.map((item, index) => (
		<li className="comment__item" key={index}>
			<p>{item.content}</p>

			<span className="comment__date">
				{moment(item.createdAt, "YYYYMMDD").fromNow()}
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

			<div className="comment__textarea">
				<textarea name="comment" placeholder="Write comment"></textarea>
			</div>

			<div className="btn-comment">
				<span>SUBMIT</span>
			</div>
		</div>
	)
}

export default Comment;
