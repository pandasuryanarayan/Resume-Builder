let personalInfo = JSON.parse(sessionStorage.getItem('personalInfo')) || {};
let educationInfo = JSON.parse(sessionStorage.getItem('educationInfo')) || {};
let extraInfo = JSON.parse(sessionStorage.getItem('extraInfo')) || {};

function savePersonalInfo() {
    personalInfo.fullName = document.getElementById('fullName').value;
    personalInfo.address = document.getElementById('address').value;
    personalInfo.email = document.getElementById('email').value;
    personalInfo.phone = document.getElementById('phone').value;
    sessionStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    window.location.href = 'education.html';
    console.log(personalInfo);
}

function saveEducationInfo() {
    educationInfo.university = document.getElementById('university').value;
    educationInfo.degree = document.getElementById('degree').value;
    educationInfo.graduationDate = document.getElementById('graduationDate').value;
    sessionStorage.setItem('educationInfo', JSON.stringify(educationInfo));
    window.location.href = 'extra_info.html';
    console.log(educationInfo);
}

function saveExtraInfo() {
    extraInfo.skills = document.getElementById('skills').value;
    extraInfo.actHob = document.getElementById('actHob').value;
    sessionStorage.setItem('extraInfo', JSON.stringify(extraInfo));
    window.location.href = 'generate_resume.html';
    console.log(extraInfo);
}

function generateResume() {
    console.log(personalInfo);
    console.log(educationInfo);
    const generatedResumeSection = document.getElementById('generatedResume');

    generatedResumeSection.style.backgroundColor = 'lightskyblue';
    generatedResumeSection.style.opacity = '0.5';
    const personalInfoDiv = document.createElement('div');
    personalInfoDiv.innerHTML = `<h2>${personalInfo.fullName}</h2>
                                  <p>Address: ${personalInfo.address}</p>
                                  <p>Email: ${personalInfo.email}</p>
                                  <p>Phone: ${personalInfo.phone}</p>`;
    generatedResumeSection.appendChild(personalInfoDiv);

    const educationDiv = document.createElement('div');
    educationDiv.innerHTML = `<h3>Education</h3>
                               <p>University: ${educationInfo.university}</p>
                               <p>Degree: ${educationInfo.degree}</p>
                               <p>Graduation Date: ${educationInfo.graduationDate}</p>`;
    generatedResumeSection.appendChild(educationDiv);

    const extraInfoDiv = document.createElement('div');
    extraInfoDiv.innerHTML = `<h3>Extra Information</h3>
                               <p>Skills: ${extraInfo.skills}</p>
                               <p>Activities/Hobbies: ${extraInfo.actHob}</p>`;
    generatedResumeSection.appendChild(extraInfoDiv);
}

function downloadResume() {
    const generatedResumeSection = document.getElementById('generatedResume');

    if (typeof jsPDF === 'undefined') {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        let y = 20;
        const leftMargin = 20;

        // Iterate through each child element in the generated resume section and add it to the PDF
        for (const element of generatedResumeSection.children) {
            // Split the text into lines based on the width of the page
            const lines = pdf.splitTextToSize(element.innerText, pdf.internal.pageSize.width - 2 * leftMargin);

            // Add each line to the PDF
            for (const line of lines) {
                pdf.text(leftMargin, y, line);
                y += 8; // Adjust this value as needed for line spacing
            }

            y += 10; // Add extra spacing between elements
        }

        // Save the PDF with a specific name
        pdf.save('generated_resume.pdf');
    } else {
        const pdf = new jsPDF();

        // Set initial y-coordinate and left margin
        let y = 20;
        const leftMargin = 20;

        for (const element of generatedResumeSection.children) {
            const lines = pdf.splitTextToSize(element.innerText, pdf.internal.pageSize.width - 2 * leftMargin);

            for (const line of lines) {
                pdf.text(leftMargin, y, line);
                y += 8;
            }

            y += 10;
        }

        pdf.save('generated_resume.pdf');
    }
}
