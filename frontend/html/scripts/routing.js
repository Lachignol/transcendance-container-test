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


//gerer la creation du header dynamique aussi je pense
//
//
function createTitleHead(url) {
	formatUrl = url.replaceAll('/', '')

	head = `<meta charset="UTF-8" />
	<title>${formatUrl}</title>
	<script  src="/scripts/routing.js" ></script>`
	return head
}
function createScript(url) {
	formatUrl = url.replaceAll('/', '')
	const script = document.createElement('script')
	script.src = `/scripts/${formatUrl}.js`
	return script
}


const routing = async (url) => {
	let body = document.getElementById('body');
	let head = document.getElementById('head');
	let content = '';
	let response;
	let script
	const headContent = createTitleHead(url);

	switch (url) {
		case "/":
			response = await fetch('/api/');
			content = await response.text()
			break;
		case "/createUser/":
			response = await fetch('/api/createUser/');
			content = await response.text()
			script = createScript(url);
			break
		case "/createMatch/":
			response = await fetch('/api/createMatch/');
			content = await response.text()
			script = createScript(url);
			break
		case "/login/":
			response = await fetch('/api/login/');
			content = await response.text()
			script = createScript(url);
			break
		case "/signUp/":
			response = await fetch('/api/signUp/');
			content = await response.text()
			script = createScript(url);
			break
		case "/websocketPage/":
			response = await fetch('/api/websocketPage/');
			content = await response.text()
			script = createScript(url);
			break
		case "/protected/":
			response = await fetch('/api/protected/');
			content = await response.text()
			script = createScript(url);
			break
			break
		case "/test":
			response = await fetch('/api/test');
			content = await response.text()
			script = createScript(url);
			break
		default:
			content = `<p>404 not found<p>`

	}

	head.innerHTML = headContent
	body.innerHTML = content;
	if (script)
		body.appendChild(script)
}

