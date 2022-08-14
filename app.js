let Course;
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
  let str =
    `<div class = "cour1"> <img class="fl"src="${tags.image}"alt="pyhon"/><div class = "Head_courses"><h3 class ="b">${tags.title}</h3>` +
    Instructor_names(tags) +
    CountStars(tags) +
    `</div><h5 class ="b">${tags.price} $</h5></div></div>`;
  return str;
}
const filterCourses = async (e) => {
  e.preventDefault();
  let text = document.querySelector(".Search").value.toLowerCase();
  let x = document.querySelector(".cour");
  let str = "";
  for (c of Course) {
    if (c.title.toLowerCase().includes(text)) str += Create_Course(c);
  }
  x.innerHTML = str;
};
const LoadCourses = async () => {
  let url = "http://localhost:3000/courses";
  let fet = await fetch(url);
  let data = await fet.json();
  Course = data;
  let x = document.querySelector(".cour");
  for (tags of data) {
    x.innerHTML += Create_Course(tags);
  }
};
function reload_Courses(e) {
  let x = e.target.innerHTML;
  console.log(x);
}
LoadCourses();
document
  .querySelector(".Search_form")
  .addEventListener("submit", filterCourses);

document.getElementById("coures").addEventListener("click", reload_Courses);
