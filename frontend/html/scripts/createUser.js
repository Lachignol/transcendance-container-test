

async function delUser(user) {
	const userId = user.id;
	if (!userId) return;
	const response = await fetch('/api/deleteUser/' + userId, {
		method: 'DELETE',
	});
	if (response.ok) {
		document.getElementById('userResult').textContent = `User ${user.name} delete sucessfully`;
	} else {
		document.getElementById('userResult').textContent = 'Erreur: ' + response.statusText;
	}



}


async function fetchUser() {
	const userId = document.getElementById('userId').value;
	if (!userId) return;
	const response = await fetch('/api/user/' + userId);
	document.getElementById('userResult').textContent = '';
	if (response.ok) {
		const user = await response.json();
		document.getElementById('userResult').textContent = JSON.stringify(user, null, 1);
		userResult.innerHTML += `<br><img src='/uploads/${user.picture}' alt='userPicture' />`;
		document.getElementById('userResult').innerHTML += `<button type="button" onclick='delUser(${JSON.stringify(user)})'>Delete</button>`;
	}
	else if (response.status == 404) {
		document.getElementById('userResult').textContent = 'User not found';

	} else {
		document.getElementById('userResult').textContent = 'Erreur: ' + response.message;
	}
}

