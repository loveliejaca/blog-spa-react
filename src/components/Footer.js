import React from 'react';

function Footer( props ) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="l-footer">
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo"></div>
          <p className="footer__txt">
            サンプルテキストサンプル ルテキストサンプルテキスト<br/>
            サンプルテキストサンプル ルテキスト
          </p>

          <div className="back-top" onClick={handleClick}>
            <div className="back-top-ico">
              <i className="ico-arrow-top"></i>
            </div>
            <span>Top</span>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>Copyright©2007-2019 Blog Inc.</p>
      </div>
    </div>
  )
}

export default Footer;
