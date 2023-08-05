// Test in Example

// const contactForm = document.querySelector('#contactForm');
// const submitBtn = document.querySelector(".sim-btn btn-hover-new");
// const nameInput = document.querySelector("#name");
// const emailInput = document.querySelector("#email");
// const phoneInput = document.querySelector("#phone");
// const messageInput = document.querySelector("#message");


// emailjs.init(publicKey);

// contactForm.addEventListener("submit" , e => {
//     e.preventDefault();
//     submitBtn.innerText = "Waiting";
//     const inputField = {
//         name: nameInput.value,
//         email: emailInput.value,
//         message: messageInput.value,
//         phone: phoneInput.value
//     }
//     emailjs.send(serviceID,templateID,inputField)
//     .then(() => {
//         submitBtn.innerText = "Sent";
//         nameInput.value = "";
//         emailInput.value = "";
//         messageInput.value = "";
//     }, (error) => {
//         console.log(error);
//         submitBtn.innerText = "Failed" ;
//     });
// });

