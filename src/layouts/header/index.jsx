import SocialIcon from "../../components/social-icon";
import Button from "../../components/button";
import Logo from "../../components/logo";
import MainMenu from "../../components/menu/main-menu";
import HomeData from "../../data/home.json";
import HeaderContactInfo from "../../components/header-contact-info";
import { Fragment, useEffect, useState } from "react";
import MobileMenu from "../../components/menu/mobile-menu";
import MenuOverlay from "../../components/menu/menu-overlay";
import Link from "next/link";

const Header = () => {
  const [ofcanvasShow, setOffcanvasShow] = useState(false);
  const onCanvasHandler = () => {
    setOffcanvasShow((prev) => !prev);
  };
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  useEffect(() => {
    const header = document.querySelector(".sticky-header");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = ({}) => {
    setScroll(window.scrollY);
  };

  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    if (
      parentEl?.classList.contains("menu-expand") ||
      target.classList.contains("menu-expand")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };

  return (
    <Fragment>
      <header className="header">
        <div className="header-top d-none d-lg-block">
          <div className="container">
            <div className="row row-cols-2">
              <div className="col">
                <p>
                  <i className="icofont-ui-call"></i>
                  +91-89745456321 || support@sdalegal.com
                </p>
              </div>
              <div className="col">
                <ul className="social-links text-end">
                  <li>
                    <SocialIcon
                      path="https://twitter.com/"
                      icon="icofont-twitter"
                    />
                  </li>
                  <li>
                    <SocialIcon
                      path="https://www.facebook.com/"
                      icon="icofont-facebook"
                    />
                  </li>
                  <li>
                    <SocialIcon
                      path="https://www.instagram.com/"
                      icon="icofont-instagram"
                    />
                  </li>
                  <li>
                    <SocialIcon
                      path="https://rss.com/"
                      icon="icofont-rss-feed"
                    />
                  </li>
                  <li>
                    <SocialIcon
                      path="https://www.youtube.com/"
                      icon="icofont-play-alt-1"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`header-middle mobile-sticky`}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header-middle-content">
                  <div className="header-logo">
                    <Logo image={`${process.env.PUBLIC_URL}/img/logo.png`} />
                  </div>

                  {/* <ul className="media-wrap d-none d-lg-flex">
                                        {HomeData[0].headerInfo &&
                                            HomeData[0].headerInfo.map(
                                                (single, key) => {
                                                    return (
                                                        <HeaderContactInfo
                                                            key={key}
                                                            data={single}
                                                        />
                                                    );
                                                }
                                            )}
                                    </ul> */}

                  <div className="header-bottom d-none d-lg-block">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <MainMenu />
                            <Button
                              path={process.env.PUBLIC_URL + "/appointment"}
                              classOption="book-now-btn"
                              text="book an appointment"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <Button
                                        path={process.env.PUBLIC_URL + "/"}
                                        classOption="book-now-btn d-none d-sm-inline-block d-lg-none"
                                        text="book an appointment"
                                    /> */}
                  <div className="mobile-menu-toggle d-lg-none">
                    <button
                      onClick={onCanvasHandler}
                      className="offcanvas-toggle"
                    >
                      <svg viewBox="0 0 800 600">
                        <path
                          d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                          id="top"
                        ></path>
                        <path d="M300,320 L540,320" id="middle"></path>
                        <path
                          d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                          id="bottom"
                          transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="header-bottom d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <MainMenu />
                                    <Button
                                        path={process.env.PUBLIC_URL + "/appointment"}
                                        classOption="book-now-btn"
                                        text="book an appointment"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

        <div
          className={`header-bottom sticky-header d-none d-lg-block ${
            scroll > headerTop ? "sticky" : ""
          }`}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <MainMenu />
                  <Button
                    path={process.env.PUBLIC_URL + "/appointment"}
                    classOption="book-now-btn"
                    text="book an appointment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <MenuOverlay show={ofcanvasShow} /> */}
      {/* <MobileMenu show={ofcanvasShow} onClose={onCanvasHandler} /> */}
      <div
        className={`offcanvas offcanvas-mobile-menu ${
          ofcanvasShow ? "offcanvas-open" : ""
        }`}
      >
        <div className="inner">
          <div className="border-bottom mb-3 pb-3 text-end">
            <button className="offcanvas-close" onClick={onCanvasHandler}>
              ×
            </button>
          </div>
          <div className="offcanvas-head mb-3">
            <div className="header-top-offcanvas">
              <p>
                <i className="icofont-google-map"></i> <span>ADDRESS:</span> 568
                Elizaberth Str, London, UK
              </p>
            </div>
          </div>
          <nav className="offcanvas-menu">
            <ul>
              <li>
                <Link exact href={process.env.PUBLIC_URL + "/"}>
                  <span className="menu-text">Home</span>
                </Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="offcanvas-submenu">
                  <li>
                    <Link exact href={process.env.PUBLIC_URL + "/"}>
                      <a>Home 1</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href={process.env.PUBLIC_URL + "/service"}>
                  <span className="menu-text">Services</span>
                </Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="offcanvas-submenu">
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/service"}>
                      <a>Service</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/service-detalis"}>
                      <a>Service Details</a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link href={process.env.PUBLIC_URL + "/blog"}>
                  <span className="menu-text">blog</span>
                </Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="offcanvas-submenu">
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/blog"}>
                      <a>Blog Details</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/blog-details/1"}>
                      Blog details
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link href={process.env.PUBLIC_URL + "/about"}>about</Link>
              </li>

              <li>
                <Link href={process.env.PUBLIC_URL + "/contact"}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          <div className="offcanvas-social my-4">
            <ul>
              <li>
                <SocialIcon
                  path="https://twitter.com/"
                  icon="icofont-twitter"
                />
              </li>
              <li>
                <SocialIcon
                  path="https://www.facebook.com/"
                  icon="icofont-facebook"
                />
              </li>
              <li>
                <SocialIcon
                  path="https://www.instagram.com/"
                  icon="icofont-instagram"
                />
              </li>
              <li>
                <SocialIcon path="https://rss.com/" icon="icofont-rss-feed" />
              </li>
              <li>
                <SocialIcon
                  path="https://www.youtube.com/"
                  icon="icofont-play-alt-1"
                />
              </li>
            </ul>
          </div>

          <ul className="media-wrap">
            <li className="media media-list">
              <span className="media-icon">
                <i className="icofont-clock-time"></i>
              </span>
              <div className="media-content">
                <span className="media-sub-heading">working hours</span>
                <span className="media-heading">MON - FRI: 9.00 - 21.00 </span>
              </div>
            </li>

            <li className="media media-list">
              <span className="media-icon">
                <i className="icofont-ui-call"></i>
              </span>
              <div className="media-content">
                <span className="media-sub-heading">hotline 24/7</span>
                <a className="media-heading" href="tel:+0962-58-58-258">
                  +0962-58-58-258
                </a>
              </div>
            </li>

            <li className="media media-list">
              <span className="media-icon">
                <i className="icofont-envelope"></i>
              </span>
              <div className="media-content">
                <span className="media-sub-heading">email us</span>
                <a
                  className="media-heading"
                  href="mailto:support@clenora.com.uk"
                >
                  support@clenora.com.uk
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
