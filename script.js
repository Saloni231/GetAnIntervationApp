const accordianData = [
  {
    image: "assests/people_1_1440.png",
    name: "Abbie Harvey",
    comment:
      "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
  },
  {
    image: "assests/people_2_1440.png",
    name: "Max Harvey",
    comment:
      "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
  },
  {
    image: "assests/people_3_1440.png",
    name: "Alex Harvey",
    comment:
      "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
  },
];

let currentState = 0;

const closeIcon = document.querySelector(".nav-mobile-close");
const menuIcon = document.querySelector(".nav-mobile-menu");
const menu = document.querySelector(".nav");

const submitBtn = document.querySelector(".submitBtn");

const personImage = document.querySelector(".personImage");
const personNameDiv = document.querySelector(".personName");
let personName = document.createTextNode(accordianData[0].name);
const img = personNameDiv.querySelector("img");
const personComment = document.querySelector(".personComment");

const accodianBlock = document.querySelector(".accordianBlock");
let startX = 0;
let isTouching = false;

const modal = document.querySelector(".videoModal");
const video = document.getElementById("video");

closeIcon.style.display = "none";

const resetState = () => {
  for (let i = 0; i < 3; i++) {
    document.querySelector(`.accordianStatus_${i}`).style.backgroundColor =
      "#EAEAEA";
  }
};

const handleAccordianContentChange = () => {
  resetState();
  document.querySelector(
    `.accordianStatus_${currentState}`
  ).style.backgroundColor = "#5BC8AF";
  personImage.src = accordianData[currentState].image;
  personName.textContent = "";
  personName = document.createTextNode(accordianData[currentState].name);
  personNameDiv.insertBefore(personName, img);
  personComment.textContent = accordianData[currentState].comment;
};

const handleDotLoader = (state) => {
  currentState = state;
  handleAccordianContentChange();
}

document.querySelector(
  `.accordianStatus_${currentState}`
).style.backgroundColor = "#5BC8AF";
personImage.src = accordianData[0].image;
personNameDiv.insertBefore(personName, img);
personComment.textContent = accordianData[0].comment;

menuIcon.addEventListener("click", function () {
  closeIcon.style.display = "block";
  menuIcon.style.display = "none";
  menu.classList.add("dropdownNav");
  menu.classList.remove("nav");
});

closeIcon.addEventListener("click", function () {
  closeIcon.style.display = "none";
  menuIcon.style.display = "block";
  menu.classList.remove("dropdownNav");
  menu.classList.add("nav");
});

const handleErrors = (id) => {
  document.querySelector(`#${id} ~ .error-tooltip`).classList.remove("hide");
  document.querySelector(`#${id}`).style.border = "1px solid #ff7777";
  document.querySelector(`#${id} + label`).style.color = "#ff7777";
};

const handleInputChange = (id) => {
  const value = document.getElementById(id).value;
  if (value !== "") {
    document.querySelector(`#${id} ~ .error-tooltip`).classList.add("hide");
    document.querySelector(`#${id}`).style.border = "1px solid #ffffff";
    document.querySelector(`#${id} + label`).style.color = "#ffffff";
  }
};

submitBtn.addEventListener("click", function () {
  if (document.getElementById("firstName").value === "") {
    handleErrors("firstName");
    return;
  } else if (document.getElementById("lastName").value === "") {
    handleErrors("lastName");
    return;
  } else if (document.getElementById("businessEmail").value === "") {
    handleErrors("businessEmail");
    document.querySelector(`#businessEmail ~ .error-tooltip`).textContent =
      "This field can’t be empty.\nPlease fill it in.";
    return;
  } else if (document.getElementById("company").value === "") {
    handleErrors("company");
    return;
  } else if (document.getElementById("country").value === "") {
    handleErrors("country");
    return;
  }

  const email = document.getElementById("businessEmail").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    handleErrors("businessEmail");
    document.querySelector(`#businessEmail ~ .error-tooltip`).textContent =
      "Please enter a valid email address";
    return;
  }

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("businessEmail").value = "";
  document.getElementById("company").value = "";
  document.getElementById("country").value = "";
  document.querySelector(`#businessEmail ~ .error-tooltip`).textContent =
    "This field can’t be empty.\nPlease fill it in.";

  window.open("thankYou.html", "_blank");
});

document.getElementById("prev").addEventListener("click", function () {
  if (currentState === 0) {
    currentState = 2;
  } else {
    currentState--;
  }
  handleAccordianContentChange();
});

document.getElementById("next").addEventListener("click", function () {
  if (currentState === 2) {
    currentState = 0;
  } else {
    currentState++;
  }
  handleAccordianContentChange();
});

accodianBlock.addEventListener("touchstart", (e) => {
  isTouching = true;
  startX = e.touches[0].clientX;
});

accodianBlock.addEventListener("touchmove", (e) => {
  if (!isTouching) return;
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX;

  if (Math.abs(diffX) > 30) {
    if (diffX > 0) {
      if (currentState === 0) {
        currentState = 2;
      } else {
        currentState--;
      }
      handleAccordianContentChange();
    } else {
      if (currentState === 2) {
        currentState = 0;
      } else {
        currentState++;
      }
      handleAccordianContentChange();
    }
    isTouching = false;
  }
});

accodianBlock.addEventListener("touchend", () => {
  isTouching = false;
});

const handleOpen = () => {
  modal.style.display = "flex";
  // Save current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // Lock scroll
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
  video.play();
};

const handleClose = () => {
  modal.style.display = "none";
  video.pause();
  video.currentTime = 0;
  window.onscroll = null;
};

window.onclick = function (e) {
  if (e.target === modal) {
    handleClose();
  }
};
