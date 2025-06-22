// Инициализирую свайпер

export function initSwiper(containerSelector) {
  const newSwiper = new Swiper(containerSelector, {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 16,
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
    breakpoints: {
      375: { spaceBetween: 0 },
      425: { spaceBetween: 0 },
      500: { spaceBetween: 24 },
      700: { spaceBetween: 24 },
    },
    allowTouchMove: true,
  });

  return newSwiper;
}

export function destroySwiper(swiper) {
  if (swiper && typeof swiper.destroy === "function") {
    swiper.destroy(true, true); // параметры: deleteInstance и cleanStyles
  }
}
