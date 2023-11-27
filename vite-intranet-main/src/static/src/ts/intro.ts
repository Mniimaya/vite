const backgrounds = [
  "/assets/intro/1.jpg",
  "/assets/intro/2.jpg",
  "/assets/intro/8.jpg",
  "/assets/intro/9.jpg",
];
//Максимум не включается, минимум включается
const getRandomIndex = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
const index = getRandomIndex(0, 4);
const main: HTMLElement = document.querySelector(".intro__content");
main.style.backgroundRepeat = "no-repeat";
main.style.backgroundSize = "100% 216px";
main.style.backgroundImage = `url(${backgrounds[2]})`;

if (document.location.pathname == "/section/phone.html") {
  main.style.backgroundImage = `url('/assets/intro/phone.jpg')`;
}
if (document.location.pathname == "/") {
  main.style.backgroundImage = `url('/assets/intro/index.jpg')`;
  main.style.backgroundSize = "100% 280px";
}
if (document.location.pathname == "/service/order.html") {
  main.style.backgroundImage = `url('/assets/intro/8.jpg')`;
}

if (document.location.pathname == "/section/function.html") {
  main.style.backgroundImage = `url('/assets/intro/function.jpg')`;
}
if (document.location.pathname == "/section/online.html") {
  main.style.backgroundImage = `url('/assets/intro/services.jpg')`;
}
if (
  document.location.pathname == "/section/documents.html" ||
  document.location.pathname == "/section/documents/0067-01.html" ||
  document.location.pathname == "/section/documents/0067-02.html" ||
  document.location.pathname == "/section/documents/0067-03.html" ||
  document.location.pathname == "/section/documents/0067-04.html" ||
  document.location.pathname == "/section/documents/0067-05.html" ||
  document.location.pathname == "/section/documents/0067-06.html" ||
  document.location.pathname == "/section/documents/0067-07.html" ||
  document.location.pathname == "/section/documents/0067-08.html" ||
  document.location.pathname == "/section/documents/0067-09.html" ||
  document.location.pathname == "/section/documents/0067-10.html" ||
  document.location.pathname == "/section/documents/0067-11.html" ||
  document.location.pathname == "/section/documents/0067-12.html"
) {
  main.style.backgroundImage = `url('/assets/intro/documents.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (document.location.pathname == "/section/fku.html") {
  main.style.backgroundImage = `url('/assets/intro/about.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (document.location.pathname == "/section/managements.html") {
  main.style.backgroundImage = `url('/assets/intro/about.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (document.location.pathname == "/section/structure.html") {
  main.style.backgroundImage = `url('/assets/intro/about.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (document.location.pathname == "/section/filials.html") {
  main.style.backgroundImage = `url('/assets/intro/about.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (document.location.pathname == "/section/contacts.html") {
  main.style.backgroundImage = `url('/assets/intro/contacts.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (document.location.pathname == "/section/cabinet.html") {
  main.style.backgroundImage = `url('/assets/intro/profile.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (
  document.location.pathname == "/service/profile.html" ||
  document.location.pathname == "/service/profile-search.html" ||
  document.location.pathname == "/service/profile-user.html"
) {
  main.style.backgroundImage = `url('/assets/intro/profile.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (
  document.location.pathname == "/service/news.html" ||
  document.location.pathname == "/service/news/0002-archive.html"
) {
  main.style.backgroundImage = `url('/assets/intro/new.jpg')`;
  main.style.backgroundSize = "100% 100%";
}

if (
  document.location.pathname == "/service/weekend.html" ||
  document.location.pathname == "/service/weekend/0001-faq.html" ||
  document.location.pathname == "/service/weekend/0001-trips.html" ||
  document.location.pathname == "/service/weekend/0001-bereg.html" ||
  document.location.pathname == "/service/weekend/0001-dnepr.html" ||
  document.location.pathname == "/service/weekend/0001-ellada.html" ||
  document.location.pathname == "/service/weekend/0001-mayak.html" ||
  document.location.pathname == "/service/weekend/0001-parus.html" ||
  document.location.pathname == "/service/weekend/0001-raduga.html" ||
  document.location.pathname == "/service/weekend/0001-rozhok.html" ||
  document.location.pathname == "/service/weekend/0001-sokol.html" ||
  document.location.pathname == "/service/weekend/0001-mo.html"
) {
  main.style.backgroundImage = `url('/assets/intro/weekend.jpg')`;
  main.style.backgroundSize = "100% 216px";
}

if (
  document.location.pathname == "/service/vacancy.html" ||
  document.location.pathname == "/service/vacancy/0005-requests.html" ||
  document.location.pathname == "/service/vacancy/0005-form.html" ||
  document.location.pathname == "/service/vacancy/0005-details.html" ||
  document.location.pathname == "/service/vacancy/0005-preview.html" ||
  document.location.pathname == "/service/vacancy/0005-drafts.html" ||
  document.location.pathname == "/service/vacancy/0005-archive.html" ||
  document.location.pathname == "/service/vacancy/0005-all-requests.html" ||
  document.location.pathname == "/service/vacancy/0005-replies.html" ||
  document.location.pathname == "/service/vacancy/0005-resume-database.html" ||
  document.location.pathname == "/service/vacancy/0005-expired.html" ||
  document.location.pathname == "/service/vacancy/0005-add-card-candidate.html"
) {
  main.style.backgroundImage = `url('/assets/intro/vacancy.jpg')`;
  main.style.backgroundSize = "100% 100%";
}
