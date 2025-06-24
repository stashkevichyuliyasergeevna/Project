export function initSwiper(containerSelector) {
  const newSwiper = new Swiper(containerSelector, {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    slideToClickedSlides: true,
    pagination: {
      el: containerSelector.querySelector(".swiper-pagination"),
      clickable: true,
    },
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    slideOverflow: true,
    allowTouchMove: true,
  });

  return newSwiper;
}

export function destroySwiper(swiper) {
  if (swiper && typeof swiper.destroy === "function") {
    swiper.destroy(true, true); // параметры: deleteInstance и cleanStyles
  }
}
