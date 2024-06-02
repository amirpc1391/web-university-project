document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:3000/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === "success") {
                window.location.href = 'dashboard.html';
                return 0;
                // alert('ورود موفق بود');
            } else {
                alert('ورود ناموفق بود');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('خطا در ورود');
        });
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const fullname = document.getElementById('signupFullname').value;
    const password = document.getElementById('signupPassword').value;

    fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, fullname, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('ثبت‌ نام موفق بود');
            } else {
                alert('ثبت‌نام ناموفق بود');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('خطا در ثبت‌نام');
        });
});

function openForm(evt, formName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(formName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Open the default tab
document.getElementById("defaultOpen").click();
