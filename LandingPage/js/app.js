
let navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

function inViewport(section) {
	var theDistanc = section.getBoundingClientRect();

	return (
		theDistanc.top >= -299 &&
		theDistanc.left >= 0 &&
		theDistanc.bottom <= (1.2 * window.innerHeight || document.documentElement.clientHeight) &&
		theDistanc.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

function deactivateSections() {
    sections.forEach((section)=>{
        section.classList.remove("activeClass", "actived");
    });
}

function deactivateNavLinks() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((section)=>{
        section.classList.remove("active-nav");
    });
}

window.addEventListener('load', buildNavbar())

function activateCurrentSection(currentSection) {
    currentSection.classList.add("activeClass", "actived");

    deactivateNavLinks();
    activateNavLinks(currentSection.getAttribute('id'));
}

function activateNavLinks(currentSectionId) {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
        navbarAnchors.forEach((section)=>{
            if(section.getAttribute('href') == `#${currentSectionId}`) {
                section.classList.add("active-nav");
            }
        });
}

function scrollToSectionOnClick() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((section) => {
        section.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(section.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function buildNavbar() {
	sections.forEach((section)=>{
	    let listItem = document.createElement("li");
	    listItem.classList.add("navbar__list__item");
    	let sectionName = section.getAttribute("data-nav");
    	let currentSectionId = section.getAttribute("id");
        listItem.innerHTML = `<a href="#${currentSectionId}" class="nav__hyperlink">${sectionName}</a>`;
        navbarList.appendChild(listItem);
    });
}

scrollToSectionOnClick();
window.addEventListener('scroll', function (event) {
	event.preventDefault();
	
    sections.forEach((section) => {
        if (inViewport(section)) {
            deactivateSections();
            activateCurrentSection(section);
        } else if(window.scrollY==0) {
            deactivateSections();
            deactivateNavLinks();
        }
    }, false);
});