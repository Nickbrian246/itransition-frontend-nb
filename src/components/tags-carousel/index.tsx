"use client";
import { Box, Typography, IconButton } from "@mui/material";
import React, { useRef } from "react";
import CarouselCard from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { colors } from "@/constants";
import { Navigation } from "swiper/modules";

export default function TagsCarousel() {
  const tags = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Engineering",
  ];

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Box>
      <Typography variant="h5">Discover</Typography>
      <Box className="swiper-container" sx={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            if (
              swiper.params.navigation &&
              prevRef.current &&
              nextRef.current
            ) {
              //@ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              //@ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          spaceBetween={1}
          slidesPerView={5}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
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
          ref={prevRef}
          sx={{
            position: "absolute",
            top: "50%",
            left: -40,
            transform: "translateY(-50%)",
            zIndex: 10,
            color: colors.black,
          }}
        >
          <NavigateBeforeOutlinedIcon />
        </IconButton>

        <IconButton
          ref={nextRef}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 10,
            color: colors.black,
          }}
        >
          <NavigateNextOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
