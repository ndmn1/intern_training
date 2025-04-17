// Form validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      // Validate form on submit
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          document.querySelector('.success-message').style.display = 'none';
          let isValid = true;
          
          // Validate name
          if (nameInput && nameInput.value.trim().length < 2) {
              showError(nameInput, 'Tên phải có ít nhất 2 ký tự');
              isValid = false;
          } else if (nameInput) {
              clearError(nameInput);
          }
          
          // Validate email
          if (emailInput && !isValidEmail(emailInput.value.trim())) {
              showError(emailInput, 'Email không hợp lệ');
              isValid = false;
          } else if (emailInput) {
              clearError(emailInput);
          }
          
          // Validate subject
          if (subjectInput && subjectInput.value.trim().length < 5) {
              showError(subjectInput, 'Tiêu đề phải có ít nhất 5 ký tự');
              isValid = false;
          } else if (subjectInput) {
              clearError(subjectInput);
          }
          
          // Validate message
          if (messageInput && messageInput.value.trim().length < 10) {
              showError(messageInput, 'Tin nhắn phải có ít nhất 10 ký tự');
              isValid = false;
          } else if (messageInput) {
              clearError(messageInput);
          }
          
          // If form is valid, submit it
          if (isValid) {
              // Simulate form submission
              const submitBtn = contactForm.querySelector('.btn-submit');
              const originalBtnText = submitBtn.innerHTML;
              
              submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
              submitBtn.disabled = true;
              
              // Simulate API call
              setTimeout(() => {
                  // Reset form
                  contactForm.reset();
                  
                  // Reset button
                  submitBtn.innerHTML = originalBtnText;
                  submitBtn.disabled = false;
                  
                  // Show success message
                  document.querySelector('.success-message').style.display = 'block';
              }, 1500);
          }
      });
      
      // Input validation on blur
      if (nameInput) {
          nameInput.addEventListener('blur', function() {
              if (this.value.trim().length < 2) {
                  showError(this, 'Tên phải có ít nhất 2 ký tự');
              } else {
                  clearError(this);
              }
          });
      }
      
      if (emailInput) {
          emailInput.addEventListener('blur', function() {
              if (!isValidEmail(this.value.trim())) {
                  showError(this, 'Email không hợp lệ');
              } else {
                  clearError(this);
              }
          });
      }
      
      if (subjectInput) {
          subjectInput.addEventListener('blur', function() {
              if (this.value.trim().length < 5) {
                  showError(this, 'Tiêu đề phải có ít nhất 5 ký tự');
              } else {
                  clearError(this);
              }
          });
      }
      
      if (messageInput) {
          messageInput.addEventListener('blur', function() {
              if (this.value.trim().length < 10) {
                  showError(this, 'Tin nhắn phải có ít nhất 10 ký tự');
              } else {
                  clearError(this);
              }
          });
      }
  }
}

// Show error message
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  
  formGroup.classList.add('error');
  errorMessage.textContent = message;
}

// Clear error message
function clearError(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
