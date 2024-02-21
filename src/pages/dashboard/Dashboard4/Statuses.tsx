import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// componets
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import StatisticsWidget from "../../../components/StatisticsWidget";
import "swiper/css";

const Statuses = ({ dashboardData }: any) => {
  const calculateSlidesPerView = () => {
    const screenWidth = window.innerWidth;

    // Define your breakpoints and corresponding slidesPerView values
    if (screenWidth >= 1200) {
      return 4;
    } else if (screenWidth >= 992) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  };

  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView());
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to calculate slidesPerView based on screen width

  return (
    <>
      <Row style={{margin:"0"}}>
        {/* <Swiper spaceBetween={50} slidesPerView={4} onSlideChange={() => console.log("slide change")} onSwiper={(swiper: any) => console.log(swiper)}> */}
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper: any) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {dashboardData?.map((item: any) => (
            <SwiperSlide>
              <Col>
                <StatisticsWidget
                  variant="primary"
                    // counterOptions={{
                    //   prefix: "$",
                    // }}
                  description={item?.status_name}
                  stats={item?.status_count}
                  icon="fe-aperture"
                />
              </Col>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <Col md={6} xl={3}>
          <StatisticsWidget
            variant="primary"
            counterOptions={{
              prefix: "$",
            }}
            description="Total Revenue"
            stats="58947"
            icon="fe-heart"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="success" description="Today's Sales" stats="127" icon="fe-shopping-cart" />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="info"
            description="Conversion"
            stats="0.58"
            counterOptions={{
              suffix: "%",
              decimals: 2,
            }}
            icon="fe-bar-chart-line-"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="warning" description="Today's Visits" stats="78412" icon="fe-eye" />
        </Col>

        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="primary"
            counterOptions={{
              prefix: "$",
            }}
            description="Total Revenue"
            stats="58947"
            icon="fe-heart"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="success" description="Today's Sales" stats="127" icon="fe-shopping-cart" />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="info"
            description="Conversion"
            stats="0.58"
            counterOptions={{
              suffix: "%",
              decimals: 2,
            }}
            icon="fe-bar-chart-line-"
          />
        </Col> */}
        {/* <Col md={6} xl={3}>
          <StatisticsWidget variant="warning" description="Today's Visits" stats="78412" icon="fe-eye" />
        </Col> */}
      </Row>
    </>
  );
};

export default Statuses;
