document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    var form = document.getElementById('resumeForm');
    var resumeOutput = document.getElementById('resume-output');
    var editButton = document.getElementById('edit-button');
    if (!form || !resumeOutput || !editButton) {
        console.error('Form, resume output, or edit button element not found.');
        return;
    }
    // Helper function to create a new input element
    var createInput = function (placeholder) {
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.classList.add('dynamic-input');
        return input;
    };
    // Functions to add new input fields for each section
    var addInputField = function (containerId, placeholder) {
        var container = document.getElementById(containerId);
        if (container) {
            container.appendChild(createInput(placeholder));
        }
    };
    // Attach event listeners to the "Add" buttons
    (_a = document.getElementById('addExperience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return addInputField('experienceContainer', 'Describe your experience'); });
    (_b = document.getElementById('addEducation')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return addInputField('educationContainer', 'Describe your education'); });
    (_c = document.getElementById('addAward')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return addInputField('awardsContainer', 'Award/Certification name'); });
    (_d = document.getElementById('addLanguage')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return addInputField('languagesContainer', 'Language'); });
    // Function to generate the resume
    var generateResume = function (event) {
        var _a, _b, _c, _d, _e, _f, _g;
        event.preventDefault();
        var fullName = (_a = document.getElementById('fullName')) === null || _a === void 0 ? void 0 : _a.value;
        var jobTitle = (_b = document.getElementById('jobTitle')) === null || _b === void 0 ? void 0 : _b.value;
        var phone = (_c = document.getElementById('phone')) === null || _c === void 0 ? void 0 : _c.value;
        var email = (_d = document.getElementById('email')) === null || _d === void 0 ? void 0 : _d.value;
        var linkedin = (_e = document.getElementById('linkedin')) === null || _e === void 0 ? void 0 : _e.value;
        var summary = (_f = document.getElementById('summary')) === null || _f === void 0 ? void 0 : _f.value;
        var skills = (_g = document.getElementById('skillsInput')) === null || _g === void 0 ? void 0 : _g.value;
        if (!fullName || !jobTitle || !phone || !email || !summary || !skills) {
            console.error('One or more input elements are empty.');
            return;
        }
        var skillsList = skills.split(',').map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill; });
        // Start building the resume HTML
        var resumeHTML = "\n            <div class=\"resume-header\">\n                <h2 id=\"resume-name\" contenteditable=\"false\">".concat(fullName, "</h2>\n                <p id=\"resume-job-title\" contenteditable=\"false\">").concat(jobTitle, "</p>\n                <p id=\"resume-contact\" contenteditable=\"false\">Phone: ").concat(phone, " | Email: ").concat(email, " | LinkedIn: ").concat(linkedin, "</p>\n            </div>\n            <section>\n                <h2>Professional Summary</h2>\n                <p id=\"resume-summary\" contenteditable=\"false\">").concat(summary, "</p>\n            </section>\n            <section>\n                <h2>Skills</h2>\n                <ul id=\"resume-skills-list\">\n                    ").concat(skillsList.map(function (skill) { return "<li contenteditable=\"false\">".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </section>\n        ");
        // Function to render each dynamic section
        var addSectionItems = function (containerId, sectionTitle) {
            var container = document.getElementById(containerId);
            if (container) {
                var items = [];
                for (var i = 0; i < container.children.length; i++) {
                    var child = container.children[i];
                    var value = child.value.trim();
                    if (value)
                        items.push(value);
                }
                if (items.length) {
                    resumeHTML += "<section><h2>".concat(sectionTitle, "</h2><ul>").concat(items.map(function (item) { return "<li contenteditable=\"false\">".concat(item, "</li>"); }).join(''), "</ul></section>");
                }
            }
        };
        // Render dynamic sections
        addSectionItems('experienceContainer', 'Work Experience');
        addSectionItems('educationContainer', 'Education');
        addSectionItems('awardsContainer', 'Awards & Certifications');
        addSectionItems('languagesContainer', 'Languages');
        // Display the generated resume
        resumeOutput.innerHTML = resumeHTML;
        // Add editing functionalities after rendering the resume
        addEditableListeners();
        addEditButtonListener();
    };
    // Function to make elements editable on 'Edit' click and save on 'Save' click
    var addEditButtonListener = function () {
        editButton.addEventListener('click', function () {
            var isEditing = editButton.textContent === 'Edit';
            var editableElements = (resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.querySelectorAll('[contenteditable]')) || [];
            editableElements.forEach(function (element) {
                element.setAttribute('contenteditable', String(isEditing));
            });
            editButton.textContent = isEditing ? 'Save' : 'Edit';
        });
    };
    // Function to sync edits made in the generated resume back to the form inputs
    var addEditableListeners = function () {
        var editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(function (element) {
            element.addEventListener('input', function (event) {
                var target = event.target;
                var id = target.id;
                if (id === 'resume-name') {
                    document.getElementById('fullName').value = target.innerText;
                }
                else if (id === 'resume-job-title') {
                    document.getElementById('jobTitle').value = target.innerText;
                }
                else if (id === 'resume-summary') {
                    document.getElementById('summary').value = target.innerText;
                }
                else if (id === 'resume-contact') {
                    var contactParts = target.innerText.split(' | ');
                    document.getElementById('phone').value = contactParts[0].replace('Phone: ', '');
                    document.getElementById('email').value = contactParts[1].replace('Email: ', '');
                    document.getElementById('linkedin').value = contactParts[2].replace('LinkedIn: ', '');
                }
            });
        });
    };
    // Attach the generateResume function to the form submission
    form.addEventListener('submit', generateResume);
});
