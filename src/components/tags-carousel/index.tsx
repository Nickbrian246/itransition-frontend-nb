"use client";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { useRef } from "react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import CarouselCard from "./card";

import "swiper/css";
import "swiper/css/pagination";

export default function TagsCarousel() {
  const swiperRef = useRef<SwiperCore>();
  const tags = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Engineering",
  ];

  return (
    <Box>
      <Typography sx={{ mb: "10px" }} variant="h5">
        Discover
      </Typography>
      <Box
        className="swiper-container"
        sx={{ position: "relative", width: { xs: "280px", sm: "600px" } }}
      >
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          breakpoints={{
            600: {
              slidesPerView: 5,
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
        >
          {tags.map((tag, index) => (
            <SwiperSlide key={index}>
              <CarouselCard tagName={tag} itemId="23" />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton
          sx={{
            position: "absolute",
            left: -40,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            display: {
              xs: "none",
              md: "flex",
            },
          }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <NavigateBeforeOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            right: -40,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            display: {
              xs: "none",
              md: "flex",
            },
          }}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <NavigateNextOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
