async function delMatch(match) {
	const matchId = match.id;
	if (!matchId) return;
	const response = await fetch('/api/deleteMatch/' + matchId, {
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
	const response = await fetch('/api/match/' + MatchId);
	document.getElementById('matchResult').textContent = '';
	if (response.ok) {
		const match = await response.json();
		document.getElementById('matchResult').textContent = JSON.stringify(match, null, 1);
		document.getElementById('matchResult').innerHTML += `<button type="button" onclick='delMatch(${JSON.stringify(match)})'>Delete</button>`;
	}
	else if (response.status == 404) {
		document.getElementById('matchResult').textContent = 'Match not found';

	} else {
		document.getElementById('matchResult').textContent = 'Erreur: ' + response.message;
	}
}

async function fetchAllUsers() {
	const select1 = document.getElementById("idUser1");
	const select2 = document.getElementById('idUser2');

	if (!select1 || !select2) {
		console.log("in return")
		return;
	}
	const response = await fetch('/api/getAllUsers/');
	if (response.ok) {
		const users = await response.json();
		users.forEach((user) => {
			select1.innerHTML += `<option value='${user.id}'>${user.id}</option >`
			select2.innerHTML += `<option value='${user.id}'>${user.id}</option >`
		}
		);
	}
	else if (response.status == 404) {
		document.getElementById('usersResult').textContent = 'User not found';

	} else {
		document.getElementById('usersResult').textContent = 'Erreur: ' + response.message;
	}
}

