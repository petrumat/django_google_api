function createRecenterButton() {
    // Create a button for recenter the map to Bucharest
    var recenterButton = document.createElement('button');
    recenterButton.textContent = 'Recenter Map';
    recenterButton.classList.add('recenter-button'); // CSS

    // Add click event listener for the recenter button
    recenterButton.addEventListener('click', function() {
        map.setCenter(centerBucharest);
    });

    // Return the created button element
    return recenterButton;
}