// Floating shapes animation handled by CSS

// AI Assistant Chat
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');

if(chatForm) {
  chatForm.addEventListener('submit', function(e){
    e.preventDefault();
    const userInput = document.getElementById('user-input').value.trim();
    if(!userInput) return;

    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    setTimeout(() => {
      const botResponse = `AI: You said "${userInput}"`;
      addMessage(botResponse, 'bot');
    }, 1000);
  });
}

function addMessage(message, sender){
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Support form
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('contact-success').style.display = 'block';
    contactForm.reset();
  });
}

// Modal functionality for projects (if needed)
$(document).ready(function(){
  $('.project-card').click(function(){
    const modalHtml = `
      <div class="modal-overlay active">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Project Details</h3>
            <div class="modal-close">&times;</div>
          </div>
          <div class="modal-content">
            <p class="modal-description">More information about this project goes here.</p>
          </div>
        </div>
      </div>`;
    $('body').append(modalHtml).addClass('modal-open');
  });

  $('body').on('click', '.modal-close, .modal-overlay', function(e){
    if($(e.target).is('.modal-close, .modal-overlay')){
      $('.modal-overlay').remove();
      $('body').removeClass('modal-open');
    }
  });
});
