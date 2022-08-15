let tag;
let cnt = 0;
function Instructor_names(tags) {
  let str = "";
  for (let i = 0; i < tags.instructors.length; i++) {
    str += `<h4 class="g">${tags.instructors[i].name}</h4>`;
  }

  return str;
}
function CountStars(tag) {
  let s = `<div> <span class="checked">4.4</span>`;
  let Rate = tag.rating;
  for (let i = 1; i <= 5; i++) {
    if (Rate >= i) s += `<span class="fa fa-star checked"></span>`;
    else if (Rate + 0.5 >= i)
      s += `<span class="fa fa-star-half-full checked"></span>`;
    else s += `<span class="fa fa-star-o checked "></span>`;
  }
  s += `</div>`;
  return s;
}
function Create_Course(tags) {
  let str = "";
  for (let i = 0; i < tags.courses.length; i++) {
    str +=
      `
      <div class = "cour1"> 
      <img class="fl"src="${tags.courses[i].image}"alt="pyhon"/>
      <div class = "Head_courses"><h3 class ="b">${tags.courses[i].title}</h3>` +
      Instructor_names(tags.courses[i]) +
      CountStars(tags.courses[i]) +
      `</div>
      <h5 class ="b">${tags.courses[i].price} $</h5>
      </div>`;
  }

  return str;
}
const filterCourses = async (e) => {
  e.preventDefault();

  let text = document.querySelector(".Search").value.toLowerCase();
  let x = document.querySelector(".cour");
  let str = "";
  console.log(tag.courses.length);
  for (let i = 0; i < tag.courses.length; i++) {
    if (tag.courses[i].title.toLowerCase().includes(text)) {
      str +=
        `
        <div class = "cour1"> 
        <img class="fl"src="${tag.courses[i].image}"alt="pyhon"/>
        <div class = "Head_courses"><h3 class ="b">${tag.courses[i].title}</h3>` +
        Instructor_names(tag.courses[i]) +
        CountStars(tag.courses[i]) +
        `</div>
        <h5 class ="b">${tag.courses[i].price} $</h5>
        </div>`;
      console.log(str);
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
  let x = document.querySelector(".course_pre");
  let str = `
  <div class ="ctr">
  <h2 class="text_about_course1" >${Res.header}</h2>
  <p class="text_about_course2">${Res.description}</p>    
  <button class = "explore-course">Explore ${p}</button>
  <div class="cour">`;
  str += Create_Course(Res);
  str += `</div></div>`;
  x.innerHTML = str;
};
let last = -1;
function reload_Courses(e) {
  let x = e.target.innerHTML;
  if (last != -1) last.target.style.color = "gray";
  e.target.style.color = "black";
  last = e;
  LoadCourses(x);
}
LoadCourses("Python");
document
  .querySelector(".Search_form")
  .addEventListener("submit", filterCourses);

document.getElementById("coures").addEventListener("click", reload_Courses);
