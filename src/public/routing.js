window.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(event) {
		const link = event.target.closest('[data-link]')
		if (link instanceof HTMLAnchorElement) {
			event.preventDefault();
			const url = link.href
			window.history.pushState({}, '', url)
			routing(url)
		}

	})
	window.addEventListener("popstate", () => {
		routing(window.location.pathname)
	});
})


const routing = async (url) => {
	let app = document.getElementById('app')
	let content = ''
	let response;
	switch (url) {
		case "/":
			response = await fetch('/');
			content = await response.text()
			break;
		case "http://localhost:3000/createUser/":
			content = await fetch('/createUser/');
			content = await response.text()
			break
		case "http://localhost:3000/test":
			response = await fetch('/test');
			content = await response.text()
			break
		default:
			content = `<p>Error ou page je sais pas<p>`

	}
	app.innerHTML = content
}

