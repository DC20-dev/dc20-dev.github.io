const above_header_content = document.querySelector('.base-info');
const above_header_content_image = document.querySelector('.img-content');
const above_header_content_text = document.querySelector('.text-content');

const header_project_name = document.querySelector('.page-header h1');
const header_image = document.querySelector('.page-header .img-content-header');


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Calculate visibility percentage
        const visiblePercentage = entry.intersectionRatio;

        // Update opacity based on visibility
        header_project_name.style.opacity = 1 - visiblePercentage;
        header_image.style.opacity = 1 - visiblePercentage;

        if (visiblePercentage < 0.5) {
            above_header_content_image.style.opacity = visiblePercentage - 0.5;
            above_header_content_text.style.opacity = visiblePercentage - 0.5;
        }
        else {
            above_header_content_image.style.opacity = visiblePercentage;
            above_header_content_text.style.opacity = visiblePercentage;
        }
    });
}, {
    root: null, // Use the viewport as the container
    threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Trigger on every 1% visibility change
});

observer.observe(above_header_content);
