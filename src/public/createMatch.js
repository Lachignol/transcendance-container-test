window.load(fetchAllUsers);

async function delMatch(match) {
	const matchId = match.id;
	if (!matchId) return;
	const response = await fetch('/deleteMatch/' + matchId, {
		method: 'DELETE',
	});
	if (response.ok) {
		document.getElementById('matchResult').textContent = `Match  with ${players[0]} and ${players[1]} delete sucessfully`;
	} else {
		document.getElementById('matchResult').textContent = 'Erreur: ' + response.statusText;
	}



}


async function fetchMatch() {
	const MatchId = document.getElementById('matchId').value;
	if (!MatchId) return;
	const response = await fetch('/match/' + MatchId);
	document.getElementById('matchResult').textContent = '';
	if (response.ok) {
		const match = await response.json();
		document.getElementById('matchResult').textContent = JSON.stringify(user, null, 1);
		document.getElementById('matchResult').innerHTML += `<button type="button" onclick='delMatch(${JSON.stringify(match)})'>Delete</button>`;
	}
	else if (response.status == 404) {
		document.getElementById('matchResult').textContent = 'User not found';

	} else {
		document.getElementById('matchResult').textContent = 'Erreur: ' + response.message;
	}
}


async function fetchAllUsers() {
	const UserId1 = document.getElementById('idUser1').value;
	const UserId2 = document.getElementById('idUser2').value;
	if (!UserId1 || !UserId2) return;
	const response = await fetch('/getAllUsers/');
	if (response.ok) {
		const users = await response.json();
		document.UserId1.value = JSON.stringify(users, null, 1);
	}
	else if (response.status == 404) {
		document.getElementById('usersResult').textContent = 'User not found';

	} else {
		document.getElementById('usersResult').textContent = 'Erreur: ' + response.message;
	}
}

