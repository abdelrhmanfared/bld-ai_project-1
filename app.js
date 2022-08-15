let tag;
let cnt = 0;
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
function Create_Course(tags) {
  let str = "";
  for (let i = 0; i < tags.courses.length; i++) {
    str += Course_data(tags.courses[i]);
  }

  return str;
}
const filterCourses = async (e) => {
  e.preventDefault();

  let text = document.querySelector(".Search").value.toLowerCase();
  let x = document.querySelector(".course-info");
  let str = "";
  for (let i = 0; i < tag.courses.length; i++) {
    if (tag.courses[i].title.toLowerCase().includes(text)) {
      str += Course_data(tag.courses[i]);
    }
  }
  x.innerHTML = str;
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
  <h2 class="header" >${Res.header}</h2>
  <p class="description">${Res.description}</p>    
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
  let x = e.target.innerHTML;
  if (last != -1) last.style.color = "gray";
  e.target.style.color = "black";
  last = e.target;
  LoadCourses(x);
}
LoadCourses("Python");
document
  .querySelector(".Search_form")
  .addEventListener("submit", filterCourses);

document.getElementById("coures").addEventListener("click", reload_Courses);
