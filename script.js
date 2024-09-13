var _a;
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    generateResume();
    changePhoto(event);
});
function changePhoto(event) {
    var fileInput = event.target;
    var profilePhoto = document.getElementById('profilePhoto');
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && profilePhoto) {
                profilePhoto.src = e.target.result; // Set the new image source
            }
        };
        reader.readAsDataURL(fileInput.files[0]); // Read the selected file as a data URL
    }
}
function generateResume() {
    var nameElement = document.getElementById('Name');
    var contactElement = document.getElementById('Contact Details');
    var emailElement = document.getElementById('Emails');
    var institutionElement = document.getElementById('institution');
    var qualificationElement = document.getElementById('Qualification');
    var fieldOfStudyElement = document.getElementById('field-of-study');
    var startDateElement = document.getElementById('start-date');
    var endDateElement = document.getElementById('end-date');
    var descriptionElement = document.getElementById('text');
    var skillsElement = document.getElementById('Skills');
    var experienceElement = document.getElementById('text');
    var profilePhotoElement = document.getElementById('profilePhoto');
    if (nameElement && contactElement && emailElement && institutionElement &&
        qualificationElement && fieldOfStudyElement && startDateElement &&
        endDateElement && descriptionElement && skillsElement && experienceElement && profilePhotoElement) {
        var name_1 = nameElement.value;
        var contact = contactElement.value;
        var email = emailElement.value;
        var institution = institutionElement.value;
        var qualification = qualificationElement.value;
        var fieldOfStudy = fieldOfStudyElement.value;
        var startDate = startDateElement.value;
        var endDate = endDateElement.value;
        var description = descriptionElement.value;
        var skills = skillsElement.value;
        var experience = experienceElement.value;
        var profilePhotoSrc = profilePhotoElement.src;
        // Create resume output
        var resumeOutput = "\n        <h1>Milestone 5: Unique Path and Shareable Link </h1>\n            <h1>My Resume</h1>\n            <img src=\"".concat(profilePhotoSrc, "\" alt=\"Profile Photo\" style=\"width: 150px; height: 150px; border-radius: 50%; border: 3px solid #295263; object-fit: cover; display: block; margin: 0 auto 20px;\">\n            <h2>Personal Information</h2>\n            <p><strong>Name:</strong> ").concat(name_1, "</p>\n            <p><strong>Contact:</strong> ").concat(contact, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <h2>Education</h2>\n            <p><strong>Institution:</strong> ").concat(institution, "</p>\n            <p><strong>Qualification:</strong> ").concat(qualification, "</p>\n            <p><strong>Field of Study:</strong> ").concat(fieldOfStudy, "</p>\n            <p><strong>Start Date:</strong> ").concat(startDate, "</p>\n            <p><strong>End Date:</strong> ").concat(endDate, "</p>\n            <p><strong>Description:</strong> ").concat(description, "</p>\n            <h2>Skills</h2>\n            <p>").concat(skills, "</p>\n            <h2>Work Experience</h2>\n            <p><strong>Experience:</strong> ").concat(experience, "</p>\n            <button id=\"downloadBtn\" style=\"display: block; width: 100%; padding: 15px; background-color:#006400; color: white; font-size: 16px; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s ease; align-items: center; justify-content: center; display: flex;\">Download PDF</button>\n            <button id=\"shareLinkBtn\" style=\"display: block; width: 100%; margin-top: 10px; padding: 15px; background-color: #0073e6; color: white; font-size: 16px; border: none; border-radius: 4px; cursor: pointer;\">Share Resume Link</button>\n            <div id=\"shareLinkOutput\" style=\"margin-top: 15px;\"></div>\n        ");
        var resumeOutputElement = document.getElementById('resume-output');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            var downloadBtn = document.getElementById('downloadBtn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function () {
                    var resume = document.getElementById('resume-output');
                    if (resume) {
                        window.html2pdf().from(resume).save('resume.pdf');
                    }
                    else {
                        console.error("The 'resume-output' element was not found.");
                    }
                });
            }
            else {
                console.error("The 'downloadBtn' element was not found in the DOM.");
            }
            var shareLinkBtn = document.getElementById('shareLinkBtn');
            if (shareLinkBtn) {
                shareLinkBtn.addEventListener('click', function () {
                    var uniqueID = new Date().getTime();
                    var shareableLink = "https://your-deployed-app.com/resumebysimra/".concat(uniqueID);
                    var shareLinkOutput = document.getElementById('shareLinkOutput');
                    if (shareLinkOutput) {
                        shareLinkOutput.innerHTML = "\n                            <p>Your shareable link:</p>\n                            <input type=\"text\" value=\"".concat(shareableLink, "\" readonly style=\"width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;\">\n                        ");
                        navigator.clipboard.writeText(shareableLink).then(function () {
                            alert('Shareable link copied to clipboard!');
                        }).catch(function (err) {
                            console.error('Failed to copy the link: ', err);
                        });
                    }
                    else {
                        console.error("The 'shareLinkOutput' element was not found in the DOM.");
                    }
                });
            }
            else {
                console.error("The 'shareLinkBtn' element was not found in the DOM.");
            }
        }
        else {
            console.error('The resume output element is missing');
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
}
