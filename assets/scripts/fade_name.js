const info = document.querySelector('.base-info');
const header_h1 = document.querySelector('.page-header h1');

const info_image = document.querySelector('.img-content');
const info_text = document.querySelector('.text-content');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Calculate visibility percentage
        const visiblePercentage = entry.intersectionRatio;

        // Update opacity based on visibility
        header_h1.style.opacity = 1 - visiblePercentage;
        if (visiblePercentage < 0.5) {
            info_image.style.opacity = visiblePercentage - 0.5;
            info_text.style.opacity = visiblePercentage - 0.5;
        }
        else {
            info_image.style.opacity = visiblePercentage;
            info_text.style.opacity = visiblePercentage;
        }
    });
}, {
    root: null, // Use the viewport as the container
    threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Trigger on every 1% visibility change
});

observer.observe(info);