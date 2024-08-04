// Fetch Bitcoin

document.getElementById('fetch-bitcoin-button').addEventListener('click', fetchBitcoinData);

document.getElementById('clear-bitcoin-button').addEventListener('click', function () {
	document.getElementById('data-bitcoin-container').innerHTML = '';
});

async function fetchBitcoinData() {
	renderBitcoinLoadingState();
	try {
		const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const bitcoinData = await response.json();
		renderBitcoinData(bitcoinData);
	} catch (error) {
		renderBitcoinErrorState();
	}
}

function renderBitcoinErrorState() {
	const container = document.getElementById('data-bitcoin-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderBitcoinLoadingState() {
	const container = document.getElementById('data-bitcoin-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderBitcoinData(bitcoinData) {
	const container = document.getElementById('data-bitcoin-container');
	container.innerHTML = ''; // Clear previous data

	const { chartName, bpi, time } = bitcoinData;
	const sectionBitcoin = document.createElement('section');
	sectionBitcoin.className = 'item';

	sectionBitcoin.innerHTML = `
			<h2>${chartName}</h2>
			<p><b>Time Updated:</b> ${time.updated}</p>
			<p><b>Price in USD:</b> ${bpi.USD.symbol} ${bpi.USD.rate}</p>
			<p><b>Price in GBP:</b> ${bpi.GBP.symbol} ${bpi.GBP.rate}</p>
			<p><b>Price in EUR:</b> ${bpi.EUR.symbol} ${bpi.EUR.rate}</p>
	`;
	container.appendChild(sectionBitcoin);
}

//Fetch User

document.getElementById('fetch-user-button').addEventListener('click', fetchUserData);

document.getElementById('clear-user-button').addEventListener('click', function () {
	document.getElementById('data-user-container').innerHTML = '';
});

async function fetchUserData() {
	renderUserLoadingState();
	try {
		const response = await fetch('https://randomuser.me/api/');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderUserData(data);
	} catch (error) {
		renderUserErrorState();
	}
}

function renderUserErrorState() {
	const container = document.getElementById('data-user-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderUserLoadingState() {
	const container = document.getElementById('data-user-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderUserData({ results }) {
	const user = results[0];
	const container = document.getElementById('data-user-container');
	container.innerHTML = ''; // Clear previous data

	const sectionUser = document.createElement('section');
	sectionUser.className = 'useritem';

	sectionUser.innerHTML = `
  <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
  <p><b>Username:</b> ${user.login.username}</p>
  <p><b>Age:</b> ${user.dob.age}</p>
  <p><b>Gender:</b> ${user.gender}</p>
  <img src="${user.picture.large}" alt="Random User Image">
  <p><b>Email:</b> ${user.email}</p>
  <p><b>Phone</b> ${user.phone}</p>\
    <p><b>Nationality:</b> ${user.nat}</p>
  <p><b>Location:</b> ${user.location.city}, ${user.location.country}</p>

  `;
	container.appendChild(sectionUser);
}

//Anime Fetch

document.getElementById('search-button').addEventListener('click', fetchData);

document.getElementById('clear-button').addEventListener('click', function () {
	document.getElementById('data-container').innerHTML = '';
});

function fetchData() {
	const limit = document.getElementById('limit').value;
	const search = document.getElementById('search').value;
	const type = document.getElementById('animetype').value;

	renderAnimeLoadingState();

	fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=${limit}&type=${type}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			if (data.data.length === 0) {
				renderEmptyState();
			} else {
				renderData(data);
			}
		})
		.catch(() => renderErrorState());
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderAnimeLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderEmptyState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Empty state: No results found</p>';
	console.log('No results found');
}

function renderData({ data }) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data

	data.forEach((anime) => {
		const section = document.createElement('section');
		section.className = 'item';
		section.innerHTML = `
            <h1>${anime.title}</h1>
            <h3>Type: ${anime.type}</h3>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title} Image">
            <h3>Episodes: ${anime.episodes}</h3>
            <h3>Synopsis:</h3>
            <p>${anime.synopsis}</p>
        `;
		container.appendChild(section);
	});
}
