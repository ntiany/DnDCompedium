window.onload = async () => {
	const root = document.querySelector('#races');
	const data = await fetchData('http://www.dnd5eapi.co/api/races/');
	render(root, data);
	style('.list-group-item', 'active');
}


const fetchData = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

const render = (el, data) => {
	
	const title = `<h2>Races in D&D (${data.count})</h2>`;
	let list = '<ul class="list-group">';

	data.results.forEach(race => {
		list += `<li class="list-group-item">${race.name}</li>` 
	});
	list += '</ul>';

	el.innerHTML = title + list;
	el.style.width = '18rem';	
};

const style = (selector, cssClass) => {
	const elements = document.querySelectorAll(selector);
	elements.forEach(el => {
		el.addEventListener('mouseover', () => { el.classList.add(cssClass); })
		el.addEventListener('mouseleave', () => { el.classList.remove(cssClass); })
	});
};
