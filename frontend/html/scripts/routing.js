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
			response = await fetch('/api/createUser/');
			content = await response.text()
			break
		case "/createMatch/":
			response = await fetch('/api/createMatch/');
			content = await response.text()
			break

		case "/login/":
			response = await fetch('/api/login/');
			content = await response.text()
			break
		case "/signUp/":
			response = await fetch('/api/signUp/');
			content = await response.text()
			break
		case "/protected/":
			response = await fetch('/api/protected/');
			content = await response.text()
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

