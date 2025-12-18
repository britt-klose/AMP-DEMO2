document.getElementById('mydbform').addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Form data:", {username, password}); 

    const response = await fetch('http://localhost:8081/loginAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    
    const result = await response.json();
    console.log("Server response:", result);
    if (result.success) {
        alert('You have logged in successfully! ');
    } else {
        alert('Error signing in: ' + result.message);
    }
});