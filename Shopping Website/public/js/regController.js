const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const button = document.getElementById('buttonReg');
const msg = document.getElementById('msg');
const msg2 = document.getElementById('mailAlert');



repassword.addEventListener('input', () => {


    button.disabled = true;
    if (repassword.value === password.value && 8 <= password.value.length && repassword.value != "" && password.value != "") {
        button.disabled = false;
        msg.classList.remove("alert-danger");
        msg.classList.add("alert-success");
        msg.textContent = "Passwords are match!";
        if (msg2) {

            msg2.remove();
        }
    } else {
        msg.classList.remove("alert-success");
        msg.classList.add("alert-danger");
        msg.textContent = "Passwords are not match! and must be 8 char at least";

        if (msg2) {

            msg2.remove();
        }
    }
})


