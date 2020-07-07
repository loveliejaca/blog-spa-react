import React from 'react';
import '../assets/css/breadcrumbs.css';


function Breadcrumbs( props ) {
	return (
		<div className="breadcrumbs">
			<div className="breadcrumbs__inner">
				<ul className="breadcrumbs__list">
					<li className="breadcrumbs__item">
						<a className="breadcrumbs__link" href="/">
							<span>Home</span>
						</a>
					</li>
					<li className="breadcrumbs__item">
						<span className="breadcrumbs__link">サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Breadcrumbs;
