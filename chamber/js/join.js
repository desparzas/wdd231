// Set timestamp when form loads
function setTimestamp() {
    document.getElementById("timestamp").value = new Date().toISOString()
  }
  
  // Show modal
  function showModal(modalId) {
    document.getElementById(modalId).style.display = "block"
  }
  
  // Close modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none"
  }
  
  // Select membership and close modal
  function selectMembership(level) {
    document.querySelector(`input[name="membership"][value="${level}"]`).checked = true
    closeModal(`${level}-modal`)
  }
  
  // Validate form
  function validateForm(event) {
    const form = event.target
    const title = form.elements.title
  
    if (title.value && title.value.length < 7) {
      alert("Title must be at least 7 characters long.")
      event.preventDefault()
      return false
    }
  
    return true
  }
  
  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    setTimestamp()
  
    // Set up modal close buttons
    document.querySelectorAll(".close").forEach((closeBtn) => {
      closeBtn.onclick = function () {
        closeModal(this.closest(".modal").id)
      }
    })
  
    // Close modal when clicking outside
    window.onclick = (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal(event.target.id)
      }
    }
  
    // Add form validation
    document.querySelector("form").addEventListener("submit", validateForm)
  })
  