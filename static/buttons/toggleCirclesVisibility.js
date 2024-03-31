function createToggleCirclesVisibilityButton() {
    // Create a button for recenter the map to Bucharest
    var button = document.createElement('button');
    button.textContent = 'Circles Visibility';
    button.classList.add('map-button'); // CSS

    // Add click event listener for the recenter button
    button.addEventListener('click', function() {
        toggleCirclesVisibility();
    });

    // Return the created button element
    return button;
}

function toggleCirclesVisibility() {
    circles.forEach(circle => {
        if (circle.getVisible())
            circle.setVisible(false);
        else
            circle.setVisible(true);
    });
}