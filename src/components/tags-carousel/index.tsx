"use client";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CarouselCard from "./card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { colors } from "@/constants";
export default function TagsCarousel() {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const tags = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "enginnering",
  ];
  return (
    <Box>
      <Typography variant="h5">Discover</Typography>
      <Box className="slider-container">
        <Slider {...settings}>
          {tags.map((tag, index) => (
            <CarouselCard tagName={tag} itemId="2" key={tag} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block",
        background: `${colors.textBlueBolder}`,
        borderRadius: "100%",
        ...style,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block",
        background: `${colors.textBlueBolder}`,
        borderRadius: "100%",
        ...style,
      }}
      onClick={onClick}
    />
  );
}
