import { Provider } from "next-auth/client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/bootstrap.min.css";
import "../assets/scss/style.scss";
import "../assets/css/icofont.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/swiper.scss";
import "../assets/css/animate.css";
import "lightgallery.js/dist/css/lightgallery.css";
import "swiper/components/pagination/pagination.scss";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      offset: 80,
      duration: 500,
      once: true,
      easing: "ease",
    });
    AOS.refresh();
  }, []);
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
