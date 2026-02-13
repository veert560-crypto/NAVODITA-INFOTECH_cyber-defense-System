let userAttempts = {};
let logs = [];
function addLog(message) {
    let time = new Date().toLocaleTimeString();
    logs.unshift(`${time} - ${message}`);
}
function checkPassword() {
    let password = document.getElementById("password").value;
    let strengthBar = document.getElementById("strengthBar");
    let strengthText = document.getElementById("strengthText");

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$#!%*?&]/.test(password)) score++;

    if (score <= 1) {
        strengthBar.style.width = "25%";
        strengthBar.style.background = "red";
        strengthText.innerText = "Weak Password";
    } else if (score === 2 || score === 3) {
        strengthBar.style.width = "65%";
        strengthBar.style.background = "orange";
        strengthText.innerText = "Medium Password";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.innerText = "Strong Password";
    }
}
function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let logList = document.getElementById("logList");

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    // Initialize user object
    if (!userAttempts[username]) {
        userAttempts[username] = {
            attempts: 3,
            locked: false
        };
    }

    // 🚨 If account is already locked
    if (userAttempts[username].locked) {
        alert("Account is locked. Please use a different username.");
        addLog(`🚫 Locked account login attempt: ${username}`);
        logList.innerHTML = logs.map(l => `<li>${l}</li>`).join("");
        return;
    }

    let isStrong =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[@#$!%*?&]/.test(password);

    if (!isStrong) {
        userAttempts[username].attempts--;
        addLog(`❌ Weak password attempt for user: ${username}`);

        if (userAttempts[username].attempts === 0) {
            userAttempts[username].locked = true;
            addLog(`🚨 Account permanently locked for user: ${username}`);
            alert("Account locked. Please use a different username.");
        } else {
            alert(`Weak password. Attempts left: ${userAttempts[username].attempts}`);
        }
    } else {
        addLog(`✅ Secure login success for user: ${username}`);
        alert("Login successful");
    }

    logList.innerHTML = logs.map(l => `<li>${l}</li>`).join("");
}
