function checkLoginStatus() {
    const userJson = localStorage.getItem('jamplayer_current_user');
    const userBtn = document.getElementById('user-btn');

    if (userJson) {
        const user = JSON.parse(userJson);

    } else {

    }
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}
function handleUserBtnClick() {
    const userJson = localStorage.getItem('jamplayer_current_user');
    if (userJson) {
        // Logged in -> Open Profile/Settings
        openSettings();
        // Populate profile fields
        const user = JSON.parse(userJson);
        const nameDisplay = document.getElementById('user-name-display');
        if (nameDisplay) nameDisplay.value = user.fullName;

        const idInput = document.getElementById('clientIdInput');
        if (idInput) idInput.value = clientId; // Current Client ID
    } else {
        // Not logged in -> Go to Login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
}

// Settings / Modal
function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
}


function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}



function handleSignOut() {
    console.log("Signing out...");
    localStorage.removeItem('jamplayer_current_user');
    localStorage.removeItem('jamplayer_remember');
    localStorage.removeItem('jamendo_client_id');

    closeSettings();
    window.location.href = 'login.html';
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.app-container section > div').forEach(div => {
        if (!div.id.includes('error')) div.style.display = 'none';
    });
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));

    // Highlight active nav item
    const navItems = document.querySelectorAll('nav li');
    if (sectionId === 'home') navItems[0].classList.add('active');
    if (sectionId === 'search') navItems[1].classList.add('active');
    if (sectionId === 'library') {
        navItems[2].classList.add('active');
        fetchLikedTracks();
    }
    if (sectionId === 'download') navItems[3].classList.add('active');

    let targetId = '';
    if (sectionId === 'home') targetId = 'home-view';
    else if (sectionId === 'search') targetId = 'search-results';
    else if (sectionId === 'library') targetId = 'library-view';
    else if (sectionId === 'download') targetId = 'download-view';

    const section = document.getElementById(targetId);
    if (section) {
        section.style.display = 'block';
    }
}
