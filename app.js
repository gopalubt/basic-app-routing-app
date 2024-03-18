function handleRoute() {
    const path = window.location.hash.slice(1) || '/';

    const routes = {
        '/': 'Home View',
        '/about': () => loadPage('about.html'), // Pass a function reference
        '/contact': () => loadPage('contact.html')
    };

    const routeHandler = routes[path] || notFoundView;

    if (typeof routeHandler === 'function') {
        routeHandler();
    } else {
        document.getElementById('content').textContent = routeHandler;
    }
}

function loadPage(pageName) {
    fetch(pageName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load page');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content').textContent = 'Error loading page';
        });
}

function notFoundView() {
    document.getElementById('content').textContent = 'Not Found';
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

handleRoute();
