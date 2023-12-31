// Initializing Buttons
const allBtn = document.getElementById("all-button");
const musicBtn = document.getElementById("music-button");
const comedyBtn = document.getElementById("comedy-button");
const drawingBtn = document.getElementById("drawing-button");
const sortBtn = document.getElementById("sort-by-view");
const btnArr = [allBtn, musicBtn, comedyBtn, drawingBtn];

// Initializing Card Container
const cardContainer = document.getElementById("cards-container");

// Fetch Category API
async function fetchCategoryAPI() {
	const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
	const resource = await response.json();
	if(!resource.status) {
		console.log("Error loading api category") // Work on it later
	}
	data = resource.data;

	// Connecting buttons with category API
	addBtnEvents(data);
}
// Fetch category API on file load
fetchCategoryAPI()

// Fetch Data API
async function fetchDataAPI(id) {
	const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
	const resource = await response.json();
	
	// Error Handling
	cardContainer.innerHTML = '';
	const err = document.getElementById("error");
	if(!resource.status) {
		err.classList.remove("hidden");
	} else {
		err.classList.add("hidden");
		const data = resource.data;
		displayCard(data);

		// Adding functionality to sort-by-view button
		addSortByViewEvent(data);
	}
}

// Adding event on sort-by-view button
function addSortByViewEvent(data) {
	sortBtn.addEventListener("click", () => {
		data.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
		cardContainer.innerHTML = '';
		if(document.getElementById("error").classList.contains("hidden")) displayCard(data);
	})
}

// Adding button functionality
function activateBtn(id) {
	console.log("id:", id);
	btnArr.forEach(elem => {
		elem.addEventListener("click", () => {
			// Add active class
			elem.classList.add("active");

			// Remove active class from all other buttons
			btnArr.forEach(inElem => {
				if(inElem !== elem && inElem.classList.contains("active")) {
					inElem.classList.remove("active");
				}
			})
			// Fetch data API on button click
			fetchDataAPI(id);
		})
	})
}

function addBtnEvents(data) {
	for(let i = 0; i < data.length; i++) {
		const catId = data[i].category_id;
		btnArr[i].addEventListener("click", () => {
			// Add active class
			btnArr[i].classList.add("active");

			// Remove active class from all other buttons
			btnArr.forEach(inElem => {
				if(inElem !== btnArr[i] && inElem.classList.contains("active")) {
					inElem.classList.remove("active");
				}
			})

			// Fetch data API on button click
			fetchDataAPI(catId);
		})	

		// Load default data
		if(i == 0) fetchDataAPI(catId);
	}
}



function displayCard(dataList) {
	dataList.forEach(data => {
		// Converting Seconds to hours and minutes
		const sec = data.others.posted_date;
		let min = Math.floor(sec / 60);
		const hours = Math.floor(min / 60);
		min = min - hours * 60;	

		const card = document.createElement("div");
		card.innerHTML = `
		<div class="card bg-base-100">
					<!-- Video -->
					<figure class="rounded-lg relative h-[200px]">
						<img src="${data.thumbnail}" class="h-full w-full object-cover" alt="" />
						<div class="absolute bg-custom-black-2 bottom-3 p-1 right-3 text-white text-[10px] rounded-[4px] ${sec ? "block" : "hidden"}">${hours}hrs ${min}mins ago</div>
					</figure>

					<!-- Information -->
					<div class="pt-5 flex gap-3">
						<!-- Author pfp -->
						<div class="h-10 w-10 shrink-0">
							<img class="rounded-[50%] h-full w-full object-cover" src="${data.authors[0].profile_picture}" alt="">	
						</div>	
						<div>
							<h2 class="card-title text-base text-custom-black-2 font-bold leading-6">${data.title}</h2>
							<!-- Author -->
							<div class="mt-1 flex gap-1 items-center">
								<p class="text-custom-grey-4 text-sm">${data.authors[0].profile_name}</p>
								<div class="${data.authors[0].verified ? "block" : "hidden"}">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_11_34)">
    <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
    <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
  </g>
  <defs>
    <clipPath id="clip0_11_34">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>	
								</div>
							</div>
							<p class="text-custom-grey-4 mt-1 text-sm">${data.others.views} Views</p>
						</div>
					</div>
				</div>
		`
		cardContainer.appendChild(card);
	})
}
