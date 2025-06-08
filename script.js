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

closeIcon.style.display = "none";

const handleAccordianContentChange = () => {
  document.querySelector(
    `.accordianStatus_${currentState}`
  ).style.backgroundColor = "#5BC8AF";
  personImage.src = accordianData[currentState].image;
  personName.textContent = "";
  personName = document.createTextNode(accordianData[currentState].name);
  personNameDiv.insertBefore(personName, img);
  personComment.textContent = accordianData[currentState].comment;
};

window.onload = function () {
  document.querySelector(
    `.accordianStatus_${currentState}`
  ).style.backgroundColor = "#5BC8AF";
  personImage.src = accordianData[0].image;
  personNameDiv.insertBefore(personName, img);
  personComment.textContent = accordianData[0].comment;
  currentState++;

  setInterval(() => {
    handleAccordianContentChange();
    if (currentState > 0 && currentState < 3) {
      const prev = currentState - 1;
      document.querySelector(`.accordianStatus_${prev}`).style.backgroundColor =
        "#EAEAEA";
      if (currentState === 2) {
        currentState = 0;
      } else {
        currentState++;
      }
    } else if (currentState === 0) {
      document.querySelector(`.accordianStatus_2`).style.backgroundColor =
        "#EAEAEA";
      currentState++;
    }
  }, 10000);
};

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

submitBtn.addEventListener("click", function () {
  if (document.getElementById("firstName").value === "") {
    handleErrors("firstName");
  } else if (document.getElementById("lastName").value === "") {
    handleErrors("lastName");
  } else if (document.getElementById("businessEmail").value === "") {
    handleErrors("businessEmail");
  } else if (document.getElementById("company").value === "") {
    handleErrors("company");
  } else if (document.getElementById("country").value === "") {
    handleErrors("country");
  }
});

const handleInputChange = (id) => {
  const value = document.getElementById(id).value;
  if (value !== "") {
    document.querySelector(`#${id} ~ .error-tooltip`).classList.add("hide");
    document.querySelector(`#${id}`).style.border = "1px solid #ffffff";
    document.querySelector(`#${id} + label`).style.color = "#ffffff";
  }
};

document.getElementById("prev").addEventListener("click", function () {
  document.querySelector(
    `.accordianStatus_${currentState}`
  ).style.backgroundColor = "#EAEAEA";
  if (currentState === 0) {
    currentState = 2;
  } else {
    currentState--;
  }
  handleAccordianContentChange();
});

document.getElementById("next").addEventListener("click", function () {
  document.querySelector(
    `.accordianStatus_${currentState}`
  ).style.backgroundColor = "#EAEAEA";
  if (currentState === 2) {
    currentState = 0;
  } else {
    currentState++;
  }
  handleAccordianContentChange();
});
