
/// Config Your LIFF ID Here
const liffId = "2002444379-Ol7qY7bJ";
/// Config Your LIFF ID Here
liff.init({
  liffId: liffId
}).then(() => {
  if (liff.isLoggedIn()) {
    liff.getProfile().then((profile) => {
      // Replace the placeholder with the actual profile picture URL
      document.getElementById("profilePicture").src = profile.pictureUrl;
      document.getElementById("userName").textContent = profile.displayName;
      const loadingIcon = document.getElementById("loading-icon");
      loadingIcon.style.display = "none";
      // Attach the form submission handler
      const form = document.getElementById("product");
      form.onsubmit = function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Disable the submit button and show the loading icon
        const submitButton = document.getElementById("submit-button");
        const submitText = document.getElementById("submit-text");
        const loadingIcon = document.getElementById("loading-icon");
        submitButton.disabled = true;
        submitText.style.display = "none";
        loadingIcon.style.display = "inline";

        // Populate the Line user profile data
        document.getElementById("LineUserId").value = profile.userId;
        document.getElementById("LineDisplayName").value = profile.displayName;
        document.getElementById("LinePictureUrl").value = profile.pictureUrl;
        document.getElementById("LineStatusMessage").value = profile.statusMessage;
        // Set the current timestamp in Thailand time zone
        const timestampField = document.getElementById("timestamp");
        const options = {
          timeZone: "Asia/Bangkok", // Thailand time zone
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false, // Set to 24-hour format
        };
        const currentTimestamp = new Date().toLocaleString("en-US", options);
        timestampField.value = currentTimestamp;

        // Your form submission code here
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxZ226lOVGixjb4rD-3O-PalDCqxyomPO6q3gL04NudU8nlYn7YzLGlRn82AqavP9A/exec';
        const form = document.forms['product'];

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'ลงทะเบียนสำเร็จ',
            }).then(() => {
              window.location.reload();
              liff.closeWindow();
            });
          })
          .catch(error => console.error('Error!', error.message))
          .finally(() => {
            // Re-enable the submit button and hide the loading icon
            submitButton.disabled = false;
            submitText.style.display = "inline";
            loadingIcon.style.display = "none";
          });
      };
    });
  } else {
    liff.login({
      redirectUri: "https://dormitory-registration.codemour.repl.co/",
    });
  }
});
