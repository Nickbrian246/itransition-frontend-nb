"use client";
import React, { useRef } from "react";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Box, IconButton } from "@mui/material";
import CarouselCard from "../card";
import SwiperCore from "swiper";
import { Tag } from "@/entities/tags";

interface Props {
  tags: Tag[];
}
export default function TagsCarousel({ tags }: Props) {
  const swiperRef = useRef<SwiperCore>();
  return (
    <>
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
          {tags.map((tag) => (
            <SwiperSlide key={tag.id}>
              <CarouselCard tagName={tag.name} itemId={tag.id} />
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
    </>
  );
}
