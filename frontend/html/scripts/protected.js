async function buttonClicked() {
	const response = await fetch('/api/logout')
	if (response.ok) {
		document.getElementById('Result').textContent = 'User deconnected';
		// Redirection vers la page login au lieu de reload
		window.location.href = '/login/';
	} else {
		document.getElementById('Result').textContent = 'User connected';
	}
}

