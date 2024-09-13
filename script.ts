document.getElementById('resume-form')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();
    generateResume();
    changePhoto(event);
});

function changePhoto(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const profilePhoto = document.getElementById('profilePhoto') as HTMLImageElement;
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e: ProgressEvent<FileReader>) {
            if (e.target && profilePhoto) {
                profilePhoto.src = e.target.result as string; // Set the new image source
            }
        };
        
        reader.readAsDataURL(fileInput.files[0]); // Read the selected file as a data URL
    }
}

function generateResume(): void {

    const nameElement = document.getElementById('Name') as HTMLInputElement | null;
    const contactElement = document.getElementById('Contact Details') as HTMLInputElement | null;
    const emailElement = document.getElementById('Emails') as HTMLInputElement | null;
    const institutionElement = document.getElementById('institution') as HTMLInputElement | null;
    const qualificationElement = document.getElementById('Qualification') as HTMLInputElement | null;
    const fieldOfStudyElement = document.getElementById('field-of-study') as HTMLInputElement | null;
    const startDateElement = document.getElementById('start-date') as HTMLInputElement | null;
    const endDateElement = document.getElementById('end-date') as HTMLInputElement | null;
    const descriptionElement = document.getElementById('text') as HTMLTextAreaElement | null;
    const skillsElement = document.getElementById('Skills') as HTMLSelectElement | null;
    const experienceElement = document.getElementById('text') as HTMLTextAreaElement | null;
    const profilePhotoElement = document.getElementById('profilePhoto') as HTMLImageElement | null;

    if (nameElement && contactElement && emailElement && institutionElement &&
        qualificationElement && fieldOfStudyElement && startDateElement &&
        endDateElement && descriptionElement && skillsElement && experienceElement && profilePhotoElement) {

        const name = nameElement.value;
        const contact = contactElement.value;
        const email = emailElement.value;
        const institution = institutionElement.value;
        const qualification = qualificationElement.value;
        const fieldOfStudy = fieldOfStudyElement.value;
        const startDate = startDateElement.value;
        const endDate = endDateElement.value;
        const description = descriptionElement.value;
        const skills = skillsElement.value;
        const experience = experienceElement.value;
        const profilePhotoSrc = profilePhotoElement.src;

        // Create resume output
        const resumeOutput = `
        <h1>Milestone 5: Unique Path and Shareable Link </h1>
            <h1>My Resume</h1>
            <img src="${profilePhotoSrc}" alt="Profile Photo" style="width: 150px; height: 150px; border-radius: 50%; border: 3px solid #295263; object-fit: cover; display: block; margin: 0 auto 20px;">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h2>Education</h2>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Qualification:</strong> ${qualification}</p>
            <p><strong>Field of Study:</strong> ${fieldOfStudy}</p>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>End Date:</strong> ${endDate}</p>
            <p><strong>Description:</strong> ${description}</p>
            <h2>Skills</h2>
            <p>${skills}</p>
            <h2>Work Experience</h2>
            <p><strong>Experience:</strong> ${experience}</p>
            <button id="downloadBtn" style="display: block; width: 100%; padding: 15px; background-color:#006400; color: white; font-size: 16px; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s ease; align-items: center; justify-content: center; display: flex;">Download PDF</button>
            <button id="shareLinkBtn" style="display: block; width: 100%; margin-top: 10px; padding: 15px; background-color: #0073e6; color: white; font-size: 16px; border: none; border-radius: 4px; cursor: pointer;">Share Resume Link</button>
            <div id="shareLinkOutput" style="margin-top: 15px;"></div>
        `;

        const resumeOutputElement = document.getElementById('resume-output');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;

            const downloadBtn = document.getElementById('downloadBtn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function () {
                    const resume = document.getElementById('resume-output');
                    if (resume) {

                        (window as any).html2pdf().from(resume).save('resume.pdf');
                    } else {
                        console.error("The 'resume-output' element was not found.");
                    }
                });
            } else {
                console.error("The 'downloadBtn' element was not found in the DOM.");
            }

            const shareLinkBtn = document.getElementById('shareLinkBtn');
            if (shareLinkBtn) {
                shareLinkBtn.addEventListener('click', function () {
                    const uniqueID = new Date().getTime(); 
                    const shareableLink = `https://your-deployed-app.com/resumebysimra/${uniqueID}`;
                    const shareLinkOutput = document.getElementById('shareLinkOutput');
                    if (shareLinkOutput) {
                        shareLinkOutput.innerHTML = `
                            <p>Your shareable link:</p>
                            <input type="text" value="${shareableLink}" readonly style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        `;
                        
                        navigator.clipboard.writeText(shareableLink).then(() => {


                            alert('Shareable link copied to clipboard!');
                        }).catch(err => {
                            console.error('Failed to copy the link: ', err);
                        });
                    } else {
                        console.error("The 'shareLinkOutput' element was not found in the DOM.");
                    }
                });
            } else {
                console.error("The 'shareLinkBtn' element was not found in the DOM.");
            }
        } else {
            console.error('The resume output element is missing');
        }
    } else {
        console.error('One or more form elements are missing');
    }
}
