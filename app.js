let tag;
let cnt = 0;
let last = document.getElementById("c_python");
document.getElementById("c_python").style.color = "black";
/**
 * @description Get name of instructions
 * @param {object} instructors - Data about instructors
 * @returns{string}  Instructions nams
 */
function Instructor_names(instructors) {
  let str = "";
  console.log(typeof instructors);
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
 * @param {object} Course - Contain all data about course
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
 * @description Collect Courses
 * @param {object} Course Contain all data about course
 * @returns {string} Collect All Courses
 */
function Create_Course(Course) {
  let str = "";
  Course.forEach((element) => {
    str += Course_data(element);
  });
  return str;
}
/**
 * @description Filter courses depend on course title
 * @param {Event} e - Event clicked on search button
 */
const filterCourses = async (e) => {
  e.preventDefault();
  console.log(typeof e);
  let text = document.querySelector(".Search").value.toLowerCase();
  let x = document.querySelector(".course-info");
  let str = "";
  tag.courses.forEach((element) => {
    if (element.title.toLowerCase().includes(text)) {
      str += Course_data(element);
    }
  });
  x.innerHTML = str;
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
  <h2 class="header" >${tag.header}</h2>
  <p class="description">${tag.description}</p>    
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
  let Coursetype = e.target.innerHTML;
  if (last != -1) last.style.color = "gray";
  e.target.style.color = "black";
  last = e.target;
  LoadCourses(Coursetype);
}
LoadCourses("Python");
document
  .querySelector(".Search_form")
  .addEventListener("submit", filterCourses);

document.getElementById("coures").addEventListener("click", reload_Courses);
