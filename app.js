let tag;
let currentIndex = 0; // -1 + 1 = 0
let pages = 5;
let def = "Python";
function Instructor_names(tags) {
  let str = "";
  for (let i = 0; i < tags.instructors.length; i++) {
    str += `<h4 class="instructor-name">${tags.instructors[i].name}</h4>`;
  }

  return str;
}
function CountStars(tag) {
  let s = `<div> <span class="stars">4.4</span>`;
  let Rate = tag.rating;
  for (let i = 1; i <= 5; i++) {
    if (Rate >= i) s += `<span class="fa fa-star stars"></span>`;
    else if (Rate + 0.5 >= i)
      s += `<span class="fa fa-star-half-full stars"></span>`;
    else s += `<span class="fa fa-star-o stars "></span>`;
  }
  s += `</div>`;
  return s;
}
function Course_data(tags) {
  let str =
    `
<div class = "courses"> 
<img class="course-image"src="${tags.image}"alt="pyhon"/>
<div class = "course-data">
<h3 class ="course-title">${tags.title}</h3>` +
    Instructor_names(tags) +
    CountStars(tags) +
    `</div>
<h5 class ="course-price">${tags.price} $</h5>
</div>`;
  return str;
}
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
function Create_Course(tags) {
  let str = "";
  let Courses = [];
  for (let i = 0; i < tags.courses.length; i++) {
    Courses.push(Course_data(tags.courses[i]));
    str += Course_data(tags.courses[i]);
  }
  return Carousel_Courses(Courses);
}
const filterCourses = async (e) => {
  e.preventDefault();
  let text = document.querySelector(".Search").value.toLowerCase();
  let x = document.querySelector(".course-info");
  let str = "";
  let C = [],
    t = [];
  for (let i = 0; i < tag.courses.length; i++) {
    if (tag.courses[i].title.toLowerCase().includes(text)) {
      str += Course_data(tag.courses[i]); // to return it withoud carousel
      C.push(Course_data(tag.courses[i]));
    }
    t.push(Course_data(tag.courses[i]));
  }
  x.innerHTML = C.length == 0 ? Carousel_Courses(t) : Carousel_Courses(C);
};
const LoadCourses = async (p) => {
  let url = "http://localhost:3000/data";
  let fet = await fetch(url);
  let data = await fet.json();
  const Res = data[p][0];
  tag = data[p][0];
  let x = document.querySelector(".course-type");
  let str = `
  <div class ="course-content">
  <h2 class="Course-header" >${Res.header}</h2>
  <p class="Course-description">${Res.description}</p>    
  <button class = "explore-course">Explore ${p}</button>
  <div class="course-info">`;
  str += Create_Course(Res);
  str += `</div></div>`;
  x.innerHTML = str;
};

// e.target = item return from get element id
let last = document.getElementById("c_python");
document.getElementById("c_python").style.color = "black";

function reload_Courses(e) {
  currentIndex = 0;
  document.querySelector(".Search").value = "";
  let x = e.target.innerHTML;
  def = x;
  if (last != -1) last.style.color = "gray";
  e.target.style.color = "black";
  last = e.target;
  LoadCourses(x);
}
LoadCourses(def);
let lst = -1;
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
window.addEventListener("resize", Resize_Carousel_Courses);
Resize_Carousel_Courses();
document
  .querySelector(".Search_form")
  .addEventListener("submit", filterCourses);
LoadCourses(def);
document.getElementById("coures").addEventListener("click", reload_Courses);
