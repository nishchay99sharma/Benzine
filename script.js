document.addEventListener("DOMContentLoaded", function () {
  // Tab switching logic (only relevant for the login/registration page)
  const loginTab = document.getElementById("login-tab");
  const registerTab = document.getElementById("register-tab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginTab && registerTab) {
    // Ensure elements exist
    loginTab.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.remove("d-none");
      registerForm.classList.add("d-none");
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
    });

    registerTab.addEventListener("click", function (e) {
      e.preventDefault();
      registerForm.classList.remove("d-none");
      loginForm.classList.add("d-none");
      registerTab.classList.add("active");
      loginTab.classList.remove("active");
    });
  }

  // Registration form submission
  if (registerForm) {
    // Ensure register form exists
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;

      if (email && password) {
        const user = { email: email, password: password };

        // Check if user already exists
        const existingUser = localStorage.getItem(email);
        if (existingUser) {
          alert("User already exists! Please login.");
        } else {
          localStorage.setItem(email, JSON.stringify(user));
          alert("Registration successful! You can now log in.");

          // Clear registration form and switch to login
          document.getElementById("registerEmail").value = "";
          document.getElementById("registerPassword").value = "";
          loginTab.click();
        }
      } else {
        alert("Please enter all fields.");
      }
    });
  }

  // Login form submission with redirect to home.html
  if (loginForm) {
    // Ensure login form exists
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (email && password) {
        const storedUser = localStorage.getItem(email);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.password === password) {
            window.location.href = "home.html"; // Redirect to home page
          } else {
            alert("Incorrect password. Please try again.");
          }
        } else {
          alert("User not found. Please register.");
        }
      } else {
        alert("Please enter all fields.");
      }
    });
  }

  // Logout functionality (only applicable in home.html)
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    // Check if the button exists
    logoutBtn.addEventListener("click", function () {
      window.location.href = "index.html"; // Redirect to login page
    });
  }
});

document
  .getElementById("testimonialForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const testimonialText = document.getElementById("testimonialText").value;
    const testimonialName = document.getElementById("testimonialName").value;

    if (testimonialText && testimonialName) {
      // Store testimonial in localStorage (for now)
      let pendingTestimonials =
        JSON.parse(localStorage.getItem("pendingTestimonials")) || [];
      pendingTestimonials.push({
        text: testimonialText,
        name: testimonialName,
      });
      localStorage.setItem(
        "pendingTestimonials",
        JSON.stringify(pendingTestimonials)
      );

      alert("Your testimonial has been submitted and is pending approval.");

      // Clear form
      document.getElementById("testimonialText").value = "";
      document.getElementById("testimonialName").value = "";
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const approvedTestimonials =
    JSON.parse(localStorage.getItem("approvedTestimonials")) || [];
  const testimonialList = document.getElementById("testimonial-list");

  approvedTestimonials.forEach((testimonial) => {
    const testimonialDiv = document.createElement("div");
    testimonialDiv.classList.add("testimonial");
    testimonialDiv.innerHTML = `
            <p class="font-italic">"${testimonial.text}"</p>
            <span>- ${testimonial.name}</span>
        `;
    testimonialList.appendChild(testimonialDiv);
  });
});

// Handle quiz submission
document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect answers (you may want to compare them with correct answers)
  const answers = {
    question1: document.getElementById("question1").value,
    question2: document.getElementById("question2").value,
    question3: document.getElementById("question3").value,
  };

  // For demonstration, just outputting the answers
  // You could add logic to compare against correct answers and calculate a score
  document.getElementById(
    "resultText"
  ).innerText = `You answered:\n1. ${answers.question1}\n2. ${answers.question2}\n3. ${answers.question3}`;

  // Show results section and hide the quiz
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
});

function filterResources() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const resources = document.querySelectorAll(".resource-item");

  resources.forEach((resource) => {
    const title = resource.getAttribute("data-title").toLowerCase();
    if (title.includes(filter)) {
      resource.style.display = ""; // Show resource
    } else {
      resource.style.display = "none"; // Hide resource
    }
  });
}
