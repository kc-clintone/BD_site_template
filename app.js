      // DOM Elements
      const mainButton = document.getElementById('mainButton');
      const birthdayCard = document.getElementById('birthdayCard');
      const musicButton = document.getElementById('musicButton');
      const birthdayAudio = document.getElementById('birthdayAudio');
      const recipientName = document.getElementById('recipientName');

      // Get name from URL parameter
      function getNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        return name || 'Beautiful Soul';
      }

      // Set the recipient name
      function setRecipientName() {
        const name = getNameFromURL();
        recipientName.textContent = name;
        console.log('Setting recipient name to:', name);
      }

      // Create confetti animation
      function createConfetti() {
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
            
            if (Math.random() > 0.5) {
              confetti.style.borderRadius = '50%';
            }

            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
              if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
              }
            }, 5000);
          }, i * 50);
        }

        console.log('Confetti animation started!');
      }

      // Show birthday card with animation
      function showBirthdayCard() {
        console.log('Showing birthday card...');
        mainButton.classList.add('hidden');
        birthdayCard.classList.remove('hidden');
        
        // Trigger animation after element is visible
        setTimeout(() => {
          birthdayCard.classList.add('show');
        }, 50);

        // Create confetti
        createConfetti();
      }

      // Play birthday music
      function playBirthdayMusic() {
        console.log('Attempting to play birthday music...');
        
        // Check if audio file exists and try to play
        birthdayAudio.play().then(() => {
          console.log('Birthday music is playing!');
          musicButton.textContent = '🎵 Playing...';
          
          // Reset button text when music ends
          birthdayAudio.addEventListener('ended', () => {
            musicButton.textContent = '🎵 Listen to this';
            console.log('Music ended');
          });
          
        }).catch((error) => {
          console.log('Could not play audio (this is expected if the file does not exist):', error);
          musicButton.textContent = '🎵 Audio not available';
          
          // Reset button text after a delay
          setTimeout(() => {
            musicButton.textContent = '🎵 Listen to this';
          }, 2000);
        });
      }

      // Event Listeners
      mainButton.addEventListener('click', showBirthdayCard);
      musicButton.addEventListener('click', playBirthdayMusic);

      // Initialize the page
      document.addEventListener('DOMContentLoaded', () => {
        console.log('Birthday greeting page loaded!');
        setRecipientName();
      });

      // Handle audio loading errors gracefully
      birthdayAudio.addEventListener('error', (e) => {
        console.log('Audio file not found - this is expected for demo purposes');
      });
