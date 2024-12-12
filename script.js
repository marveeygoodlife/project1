document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
event.preventDefault(); //prevent form submittion

const username = document.getElementById('username').value.trim();
const email = document.getElementById('email').value.trim();

// validation for empty input
if(!username || !email){
    console.log('Please fill in all fields');
    return;
}

if (!validateEmail(email)) {
    console.log('Please enter a valid email')
    return;
 }

 // submit form if all input are validated
 console.log('Form successfully submitted!');
 form.submit();
 console.log(username);
});

function validateEmail(email) {
    const validemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validemail.test((email).toLowerCase());
}

})