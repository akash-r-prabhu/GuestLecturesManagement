function validateLogin(event) {
    event.preventDefault();
  
    // Get the username and password values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Validate the credentials and determine the group
    var group = validateCredentials(username, password);
  
    if (group === 'admin') {
      // Redirect admin to the admin dashboard
      window.location.href = 'index.html';
    } else if (group === 'user') {
      // Redirect user to the user dashboard
      window.location.href = 'index.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
  
  function validateCredentials(username, password) {
    // Replace this with your own logic to validate the credentials and determine the group
    // For example, compare with predefined username and password for admin and user
    var adminUsername = 'admin';
    var adminPassword = 'admin123';
    var userUsername = 'user';
    var userPassword = 'user123';
  
    if (username === adminUsername && password === adminPassword) {
      return 'admin';
    } else if (username === userUsername && password === userPassword) {
      return 'user';
    } else {
      return null;
    }
  }
  
  