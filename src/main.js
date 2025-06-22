import "./scss/style.scss";
import Swiper from "swiper";
import { initSwiper, destroySwiper } from "./js/swiper";

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    //Блюр
    blurOverlay: document.getElementById("blurOverlay"),
    //Бургер
    openBurgerMenu: document.getElementById("openBurgerMenu"),
    closeBurgerMenu: document.getElementById("closeBurgerMenu"),
    burgerMenu: document.getElementById("burgerMenu"),
    //Звонок
    openCallMenu1: document.getElementById("openCallMenu1"),
    openCallMenu2: document.getElementById("openCallMenu2"),
    closeCallMenu: document.getElementById("closeCallMenu"),
    callMenu: document.getElementById("callMenu"),
    //Общение
    openFeedbackMenu1: document.getElementById("openFeedbackMenu1"),
    openFeedbackMenu2: document.getElementById("openFeedbackMenu2"),
    closeFeedbackMenu: document.getElementById("closeFeedbackMenu"),
    feedbackMenu: document.getElementById("feedbackMenu"),
    //Текст
    readMoreButton: document.getElementById("readMoreButton"),
    readMoreButtonImg: document.getElementById("readMoreButtonImg"),
    readMoreButtonText: document.getElementById("readMoreButtonText"),
    readMoreMenu: document.querySelectorAll(".article__content p"),
    //Блок c кнопками 1
    buttonsMenuFirst: document.querySelectorAll(".buttons-menu--first li"),
    showAllButtonFirst: document.getElementById("showAllButtonFirst"),
    showAllButtonFirstImg: document.getElementById("showAllButtonFirstImg"),
    showAllButtonFirstText: document.getElementById("showAllButtonFirstText"),
    //Блок c кнопками 2
    buttonsMenuSecond: document.querySelectorAll(".buttons-menu--second li"),
    showAllButtonSecond: document.getElementById("showAllButtonSecond"),
    showAllButtonSecondImg: document.getElementById("showAllButtonSecondImg"),
    showAllButtonSecondText: document.getElementById("showAllButtonSecondText"),
    //Контейнеры для свайперов
    swiperContainerFirst: document.getElementById("swiperContainerFirst"),
    swiperContainerSecond: document.getElementById("swiperContainerSecond"),
    swiperContainerThird: document.getElementById("swiperContainerThird"),
    // Все меню кнопок
    buttonsMenus: document.querySelectorAll(".buttons-menu"),
    // Все пагинаторы
    paginationContainres: document.querySelectorAll(".swiper-pagination"),
  };
  const swipers = {
    first: null,
    second: null,
    third: null,
  };
  let areSwipersInitialized = false;

  function initAllSwipers() {
    const width = window.innerWidth;
    if (!areSwipersInitialized && width < 768) {
      swipers.first = initSwiper(elements.swiperContainerFirst);
      swipers.second = initSwiper(elements.swiperContainerSecond);
      swipers.third = initSwiper(elements.swiperContainerThird);
      areSwipersInitialized = true;
    }
  }

  function destroyAllSwipers() {
    const width = window.innerWidth;
    if (areSwipersInitialized && width >= 768) {
      if (swipers.first) destroySwiper(swipers.first);
      if (swipers.second) destroySwiper(swipers.second);
      if (swipers.third) destroySwiper(swipers.third);
      elements.paginationContainres.forEach((element) => {
        element.style.display = "none";
      });

      swipers.first = null;
      swipers.second = null;
      swipers.third = null;
      areSwipersInitialized = false;
    }
  }

  function overflowForWrappers() {
    const width = window.innerWidth;
    if (areSwipersInitialized === false && width < 768) {
      [
        elements.swiperContainerFirst,
        elements.swiperContainerSecond,
        elements.swiperContainerThird,
      ].forEach((element) => {
        element.style.overflowX = "scroll";
      });
    }
    if (areSwipersInitialized === false && width >= 768) {
      [
        elements.swiperContainerFirst,
        elements.swiperContainerSecond,
        elements.swiperContainerThird,
      ].forEach((element) => {
        element.style.overflowX = "hidden";
      });
    }
  }

  let menuStates = {
    first: false,
    second: false,
    readme: false,
  };

  function counterButtonsAndP() {
    const width = window.innerWidth;
    let visiblesP;
    let visiblesButtonsInFirstMenu;
    let visiblesButtonsInSecondMenu;
    if (width >= 1080) {
      visiblesButtonsInFirstMenu = 8;
      visiblesButtonsInSecondMenu = 4;
      visiblesP = 3;
    } else if (width >= 768) {
      visiblesButtonsInFirstMenu = 6;
      visiblesButtonsInSecondMenu = 3;
      visiblesP = 2;
    } else {
      visiblesButtonsInFirstMenu = elements.buttonsMenuFirst.length;
      visiblesButtonsInSecondMenu = elements.buttonsMenuSecond.length;
      visiblesP = 1;
    }
    buttonsAndPRegulator(
      "first",
      elements.buttonsMenuFirst,
      visiblesButtonsInFirstMenu,
    );
    buttonsAndPRegulator(
      "second",
      elements.buttonsMenuSecond,
      visiblesButtonsInSecondMenu,
    );
    buttonsAndPRegulator("readme", elements.readMoreMenu, visiblesP);
  }

  function buttonsAndPRegulator(menuKey, menu, visibles) {
    if (!menuStates[menuKey]) {
      menu.forEach((elements, index) => {
        if (index < visibles) {
          elements.classList.remove("visually-hidden");
        } else {
          elements.classList.add("visually-hidden");
        }
      });
    }
  }

  function showHide(menuKey, menu, img, text, flag) {
    if (flag === "btns") {
      menuStates[menuKey] = !menuStates[menuKey];
      if (menuStates[menuKey]) {
        menu.forEach((li) => li.classList.remove("visually-hidden"));
        img.classList.add("rotated");
        text.innerHTML = `Скрыть`;
      } else {
        counterButtonsAndP();
        img.classList.remove("rotated");
        text.innerHTML = `Показать все`;
      }
    } else if (flag === "read") {
      menuStates[menuKey] = !menuStates[menuKey];
      if (menuStates[menuKey]) {
        menu.forEach((p) => p.classList.remove("visually-hidden"));
        img.classList.add("rotated");
        text.innerHTML = `Скрыть`;
      } else {
        counterButtonsAndP();
        img.classList.remove("rotated");
        text.innerHTML = `Читать далее`;
      }
    }
  }
  function hideElement(element) {
    element.classList.add("visually-hidden");
    elements.blurOverlay.classList.add("visually-hidden");
  }

  function showElement(element) {
    element.classList.remove("visually-hidden");
    elements.blurOverlay.classList.remove("visually-hidden");
  }

  counterButtonsAndP();
  initAllSwipers();

  window.addEventListener("resize", () => {
    counterButtonsAndP();
    destroyAllSwipers();
    overflowForWrappers();
  });

  document.addEventListener("click", (event) => {
    console.log("Клик по:", event.target);
    if (event.target === elements.openBurgerMenu) {
      showElement(elements.burgerMenu);
    } else if (event.target === elements.closeBurgerMenu) {
      hideElement(elements.burgerMenu);
    } else if (event.target === elements.openCallMenu2) {
      showElement(elements.callMenu);
    } else if (event.target === elements.closeCallMenu) {
      hideElement(elements.callMenu);
    } else if (event.target === elements.openFeedbackMenu2) {
      showElement(elements.feedbackMenu);
    } else if (event.target === elements.closeFeedbackMenu) {
      hideElement(elements.feedbackMenu);
    } else if (event.target === elements.openCallMenu1) {
      hideElement(elements.burgerMenu);
      showElement(elements.callMenu);
    } else if (event.target === elements.openFeedbackMenu1) {
      hideElement(elements.burgerMenu);
      showElement(elements.feedbackMenu);
    } else if (event.target === elements.blurOverlay) {
      hideElement(elements.burgerMenu),
        hideElement(elements.callMenu),
        hideElement(elements.feedbackMenu);
    } else if (event.target.closest("#showAllButtonFirst")) {
      showHide(
        "first",
        elements.buttonsMenuFirst,
        elements.showAllButtonFirstImg,
        elements.showAllButtonFirstText,
        "btns",
      );
    } else if (event.target.closest("#showAllButtonSecond")) {
      showHide(
        "second",
        elements.buttonsMenuSecond,
        elements.showAllButtonSecondImg,
        elements.showAllButtonSecondText,
        "btns",
      );
    } else if (event.target.closest("#readMoreButton")) {
      showHide(
        "readme",
        elements.readMoreMenu,
        elements.readMoreButtonImg,
        elements.readMoreButtonText,
        "read",
      );
    }
  });
});
