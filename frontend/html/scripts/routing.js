window.addEventListener('DOMContentLoaded', function() {
	routing(window.location.pathname);
	document.addEventListener('click', function(event) {

		const link = event.target.closest('[data-link]')
		if (link instanceof HTMLAnchorElement) {
			event.preventDefault();
			const url = new URL(link.href).pathname;
			window.history.pushState({}, '', url)
			routing(url)
		}

	})
	window.addEventListener("popstate", () => {
		routing(window.location.pathname)
	});
})


const routing = async (url) => {
	let body = document.getElementById('body')
	let content = ''
	let response;
	switch (url) {
		case "/":
			response = await fetch('/api/');
			content = await response.text()
			break;
		case "/createUser/":
			content = await fetch('/api/createUser/');
			break
		case "/test":
			response = await fetch('/api/test');
			content = await response.text()
			break
		default:
			content = `<p>Error ou page je sais pas<p>`

	}
	body.innerHTML = content
}

