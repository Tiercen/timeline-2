const timeline_wrapper = document.querySelector('.timeline-wrapper');

    const lifeEventsSection = document.querySelector('.timeline');

    // Fetch JSON data life-events
    fetch('./data/life-events.json')
      .then(response => response.json())
      .then(data => {
        // Sort data in chronological order
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const startMarker = lifeEventsSection.querySelector('.fixed.start'); // Added to get the fixed start and end markers
    
        // Loop through data and create list items
        data.forEach(life => {
          const lifeItem = document.createElement('li');
            // Get the date object
          const date = new Date(life.date);
  
          // Reformat the date using toLocaleDateString()
          const formattedDate = date.toLocaleDateString('en-US', {
            // weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          });
            lifeItem.setAttribute('data-date', formattedDate);
  
            let lifeImg = ''; // Initialize empty string for life event image
  
          // Check if life.logo exists and create image element if it does
          if (life.img) {
            // Use backticks for template literals to handle dynamic paths
            lifeImg = `<img src="${life.img}" alt="${life.event}">`;
          }
  
          lifeItem.innerHTML = `
          <span class="title">${life.event}</span>
          <div class="data">
            <h3>${life.title}</h3>
            <small>${formattedDate}</small>
            <p>${life.description}</p>
            <span class="close">Click To Close</span>
          </div>
        `;
  
        lifeEventsSection.appendChild(lifeItem);

        lifeEventsSection.insertBefore(lifeItem, lifeEventsSection.querySelector('.fixed.end')); // Added to get the fixed start and end markers

        
        // Add event listener to the new elements
        const timeLineElement = lifeItem.querySelector('.data');
        timeLineElement.onclick = () => timeLineElement.classList.toggle('show');

        });

        // Add touch event listeners for opening/closing the details
        const timeLineElement = lifeItem.querySelector('.data');

        timeLineElement.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent touch scrolling
        timeLineElement.classList.toggle('show');
        });
  
      });

const timelineWrapper = document.querySelector('.timeline-wrapper');
const timeline = document.querySelector('.timeline');
let isDragging = false;
let currentX;
let initialX;
let xOffset = 0;

timelineWrapper.addEventListener('mousedown', dragStart);
timelineWrapper.addEventListener('mouseup', dragEnd);
timelineWrapper.addEventListener('mouseleave', dragEnd);
timelineWrapper.addEventListener('mousemove', drag);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  isDragging = true;
  timelineWrapper.classList.add('grabbing'); // Add the 'grabbing' class
}

function dragEnd(e) {
  initialX = currentX;
  isDragging = false;
  timelineWrapper.classList.remove('grabbing'); // Remove the 'grabbing' class
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    xOffset = currentX;
    setTranslate(currentX, 0, timeline);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

let touchStart = null;
let touchEnd = null;

timelineWrapper.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientX;
  timelineWrapper.style.scrollSnapType = 'none'; // Disable scroll snapping during touch interaction
});

timelineWrapper.addEventListener('touchmove', (e) => {
  if (touchStart !== null) {
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStart;
    timeline.style.transform = `translateX(${diffX}px)`;
  }
});

timelineWrapper.addEventListener('touchend', () => {
  touchStart = null;
  timelineWrapper.style.scrollSnapType = 'x mandatory'; // Re-enable scroll snapping
  timeline.style.transform = 'none';
});

const hexagonGrid = document.getElementById('hexagonGrid');

// Function to generate the hexagonal grid pattern
function generateBackgroundPattern() {
  const hexagonSize = 25; // Adjust this value to control the size of the hexagons
  const hexagonRows = 50; // Adjust this value based on your layout
  const hexagonCols = 100; // Adjust this value based on your layout

  for (let row = 0; row < hexagonRows; row++) {
    for (let col = 0; col < hexagonCols; col++) {
      const x = col * hexagonSize * 1.5;
      const y = row * hexagonSize * Math.sqrt(3) + ((col % 2) * hexagonSize * Math.sqrt(3) / 2);
      drawHexagon(hexagonGrid, x, y, hexagonSize);
    }
  }
}

// Function to draw a single hexagon
function drawHexagon(svg, x, y, size) {
  const points = calculateHexagonPoints(x, y, size);
  const hexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  hexagon.setAttribute('points', points);
  hexagon.style.fill = 'white';
  hexagon.style.stroke = 'lightgray';
  hexagon.style.strokeWidth = '5';
  svg.appendChild(hexagon);
}

// Function to calculate the points of a hexagon
function calculateHexagonPoints(x, y, size) {
  let points = '';
  for (let side = 0; side < 7; side++) {
    const px = x + size * Math.cos(side * 2 * Math.PI / 6);
    const py = y + size * Math.sin(side * 2 * Math.PI / 6);
    points += `${px},${py} `;
  }
  return points.trim();
}

// Initial setup
generateBackgroundPattern();

hexagonGrid.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  for (const hexagon of hexagonGrid.children) {
    const rect = hexagon.getBoundingClientRect();
    const hexagonCenterX = rect.left + rect.width / 2;
    const hexagonCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt((mouseX - hexagonCenterX) ** 2 + (mouseY - hexagonCenterY) ** 2);
    if (distance < 70) { // Adjust this value to control when the glow effect is applied
      hexagon.style.stroke = 'darkgray';
      hexagon.style.filter = 'drop-shadow(0 0 15px lightgray)'; // Add the glow effect
    } else {
      hexagon.style.stroke = 'lightgray';
      hexagon.style.filter = 'none'; // Remove the glow effect
    }
  }
});
