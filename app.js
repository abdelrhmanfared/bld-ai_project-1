let tag;
let currentIndex = 0;
let pages = 5;
let lst = -1;
let def = "Python";
let selected_category = "black";
let prev = document.getElementById("c_python");
document.getElementById("c_python").style.color = selected_category;
/**
 * @description Get name of instructions
 * @param {object} instructors - Data about instructors
 * @returns{string}  Instructions nams
 */
function Instructor_names(instructors) {
  let str = "";
  instructors.forEach((element) => {
    str += `<h4 class="instructor-name">${element.name}</h4>`;
  });

  return str;
}
/**
 * @description Count The Stars based on rating
 * @param {integer} Rate - Rate of Course
 * @returns {string} Stars design and rate
 */
function CountStars(Rate) {
  let s = `<div> <span class="stars">4.4</span>`;
  for (let i = 1; i <= 5; i++) {
    if (Rate >= i) s += `<span class="fa fa-star stars"></span>`;
    else if (Rate + 0.5 >= i)
      s += `<span class="fa fa-star-half-full stars"></span>`;
    else s += `<span class="fa fa-star-o stars "></span>`;
  }
  s += `</div>`;
  return s;
}
/**
 * @description Make Course Component
 * @param {object} Course - Contain all data about courses
 * @returns {string} Data about course
 */
function Course_data(Course) {
  let str =
    `
<div class = "courses"> 
<img class="course-image"src="${Course.image}"alt="pyhon"/>
<div class = "course-data">
<h3 class ="course-title">${Course.title}</h3>` +
    Instructor_names(Course.instructors) +
    CountStars(Course.rating) +
    `</div>
<h5 class ="course-price">${Course.price} $</h5>
</div>`;
  return str;
}
/**
 * @description Make Carousel depend on page size and save the active item in varible currentIndex
 *  because responsive carousel depend on WindowScreen(Bom) Make Me reload data from scratch
 *  that make me use currentIndex to save the Carousel index while the screen change
 * @param {object} Courses -Contain all data about courses
 * @returns {string} Carousel contain Data about courses
 */
function Carousel_Courses(Courses) {
  let CarouselData = `
  <div id="carouselExampleControls"    
  data-interval="false" class="carousel slide" data-cycle-allow="true"  data-ride="carousel">
  <div class="carousel-inner">
`;

  let NumberofCarousel = Math.ceil(Courses.length / pages);
  for (let i = 0; i < NumberofCarousel; i++) {
    CarouselData += `
    <div id=${i} class="carousel-item ${currentIndex == i ? "active" : ""}">
    <div class ="cards-wrapper">`;

    for (let j = 0; j < pages && i * pages + j < Courses.length; j++) {
      CarouselData += Courses[i * pages + j];
    }
    CarouselData += `</div></div>`;
  }
  CarouselData += `</div>
  <a  class="carousel-control-prev"   href="#carouselExampleControls" role="button" data-slide="prev">
  <span class="fa fa-chevron-left fa-lg"></span>
</a >
<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="fa fa-chevron-right fa-lg"></span>
</a>
  </div>`;
  return CarouselData;
}
/**
 * @description Collect Courses
 * @param {object} Course Contain all data about course
 * @returns {string} Collect All Courses in Carousel slide
 */
function Create_Course(Course) {
  let str = "";
  let C = [];
  Course.forEach((element) => {
    C.push(Course_data(element));
  });
  return Carousel_Courses(C);
}
/**
 * @description Filter courses depend on course title
 * @param {Event} e - Event clicked on search button
 */
const filterCourses = async (e) => {
  e.preventDefault();
  let text = document.querySelector(".Search").value.toLowerCase();
  let x = document.querySelector(".course-info");
  const filteredCourses = tag.courses.filter((word) =>
    word.title.toLowerCase().includes(text)
  );
  x.innerHTML =
    filteredCourses.length == 0
      ? Create_Course(tag.courses)
      : Create_Course(filteredCourses);
};
/**
 * @description Fetch api and retrive courses
 * @param {string} Course_type - Type of Course
 */
const LoadCourses = async (Course_type) => {
  let url = "http://localhost:3000/data";
  let fet = await fetch(url);
  let data = await fet.json();
  tag = data[Course_type][0];
  let x = document.querySelector(".course-type");
  let str = `
  <div class ="course-content">
  <h2 class="udemy-header" >${tag.header}</h2>
  <p class="udemy-description">${tag.description}</p>    
  <button class = "explore-course">Explore ${Course_type}</button>
  <div class="course-info">`;
  str += Create_Course(data[Course_type][0].courses);
  str += `</div></div>`;
  x.innerHTML = str;
};

/**
 * @description Change data in Courses depend on Coursetype
 * @param {Event} e - Event clicked on Type of course
 */
function reload_Courses(e) {
  currentIndex = 0;
  document.querySelector(".Search").value = "";
  let Coursetype = e.target.innerHTML;
  def = Coursetype;
  if (prev != -1) prev.style.color = "gray";
  e.target.style.color = "black";
  prev = e.target;
  LoadCourses(Coursetype);
}
/**
 * @description Make carousel responsive depend on screen size
 */
function Resize_Carousel_Courses() {
  let width = this.window.innerWidth;
  let text = document.querySelector(".Search").value.toLowerCase();
  if (width >= 1400) {
    pages = 5;
  } else if (width < 1400 && width >= 1150) {
    pages = 4;
  } else if (width >= 850) {
    pages = 3;
  } else if (width >= 600) {
    pages = 2;
  } else if (width < 600) {
    pages = 1;
  }

  let x = document.querySelector(".active");
  currentIndex = x?.id ?? 0;
  if (lst != pages) {
    if (text == "") {
      LoadCourses(def);
    } else {
      document.querySelector(".search-udemy-submit").click();
    }
    lst = pages;
  }
}
LoadCourses(def);
window.addEventListener("resize", Resize_Carousel_Courses);
Resize_Carousel_Courses();
document
  .querySelector(".Search_form")
  .addEventListener("submit", filterCourses);
LoadCourses(def);
document.getElementById("coures").addEventListener("click", reload_Courses);
