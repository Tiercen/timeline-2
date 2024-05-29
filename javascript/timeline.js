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
  
      });

const timelines = document.querySelectorAll('.timeline li .data');

for(const time of timelines) {
    time.onclick = ()=> time.classList.toggle('show');
}

timeline_wrapper.addEventListener('mousemove', (event) => {
    const timeline = document.querySelector('.timeline');
    const fixedMarkers = document.querySelectorAll('.timeline li.fixed'); // Added  to get a fixed start and end
    const totalFixedWidth = Array.from(fixedMarkers).reduce((sum, marker) => sum + marker.offsetWidth, 0); // Added  to get a fixed start and end
    let scroll_width = event.pageX / timeline_wrapper.clientWidth * (timeline_wrapper.clientWidth - timeline.clientWidth - totalFixedWidth); // modified  to get a fixed start and end

    console.log({
        'timeline_width' : timeline.clientWidth,
        'timeline_wrapper_width' : timeline_wrapper.clientWidth,
        'Mouse X-coordinate' : event.pageX
    });
    console.log(scroll_width.toFixed(1));
    timeline.style.left = scroll_width.toFixed(1) + 'px'
})