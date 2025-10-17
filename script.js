        const POSTS_PER_PAGE = 6;
        let currentPage = 1;
        let currentCategory = 'All';
        let currentSearchTerm = '';

        // --- DOM Elements ---
        const mainContent = document.getElementById('main-content');
        const paginationContainer = document.getElementById('pagination');
        const categoryNav = document.getElementById('category-nav');
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        // --- Mock Blog Post Data (Includes image, category, date, title, description) ---
        const allPosts = [
            { id: 1, title: "Exploring Nature's Hidden Trails", description: "Discover the current wildlife style and breathtaking landscapes of the mountains.", date: "October 9, 2025", category: "Travel", image: " Wildlife.png" },
            { id: 2, title: "Latest Trends in AI Technology", description: "A deep dive into the most recent innovations in machine learning and neural networks.", date: "October 8, 2025", category: "Technology", image: "Dive.png" },
            { id: 3, title: "Easy and Modern Recipes for Delight", description: "Quick and simple culinary delights perfect for a busy weeknight dinner.", date: "October 7, 2025", category: "Food", image: "Culinary.png" },
            { id: 4, title: "The Rise of Quantum Computing", description: "Understanding the next frontier in processing power and computational science.", date: "October 6, 2025", category: "Technology", image: "Computation.png" },
            { id: 5, title: "Backpacking Through Southeast Asia", description: "Tips and tricks for an unforgettable journey through Vietnam, Thailand, and Cambodia.", date: "October 5, 2025", category: "Travel", image: "VTC.png" },
            { id: 6, title: "Mastering Sourdough at Home", description: "A comprehensive guide to baking the perfect loaf, from starter to finished crust.", date: "October 4, 2025", category: "Food", image: "Baking.png" },
            { id: 7, title: "New Horizons in Space Exploration", description: "The latest updates on NASA and SpaceX missions beyond Earth's orbit.", date: "October 3, 2025", category: "Technology", image: "Nasa.png" },
            { id: 8, title: "A Taste of Mediterranean Cuisine", description: "Exploring the healthy and vibrant flavors of Greece, Italy, and Spain.", date: "October 2, 2025", category: "Food", image: "Greece.png" },
            { id: 9, title: "Weekend Getaways in the Pacific Northwest", description: "Finding the best short trips for hiking and coastal views in the PNW.", date: "October 1, 2025", category: "Travel", image: "Hiking.png" },
            { id: 10, title: "Review: The New E-Bike Revolution", description: "Testing out the latest electric bicycles and their impact on urban commuting.", date: "September 30, 2025", category: "Technology", image: "Bicycle.png" },
            { id: 11, title: "The Science of Fluffy Pancakes", description: "A simple secret to achieving restaurant-quality fluffy breakfast pancakes.", date: "September 29, 2025", category: "Food", image: "Pancake.png" },
            { id: 12, title: "Tips for Long-Term Digital Nomad Life", description: "How to manage work, finance, and visa issues while traveling the world indefinitely.", date: "September 28, 2025", category: "Travel", image: "Traveling.png" },
            { id: 13, title: "Next-Gen Console Hardware Breakdown", description: "Analyzing the chips and cooling systems of the newest gaming consoles.", date: "September 27, 2025", category: "Technology", image: "Gaming.png" },
            { id: 14, title: "Budget Travel Hacks for Europe", description: "Save money without sacrificing the experience on your next European adventure.", date: "September 26, 2025", category: "Travel", image: "Europe.png" },
        ];

        // --- Core Filtering Logic (From Task4.js) ---

        /**
         * Filters posts based on the current category and search term.
         * @returns {Array}
         */
        function getFilteredPosts() {
            let filtered = allPosts;

            // 1. Filter by Category
            if (currentCategory !== 'All') {
                filtered = filtered.filter(post => post.category === currentCategory);
            }

            // 2. Filter by Search Term
            if (currentSearchTerm) {
                const term = currentSearchTerm.toLowerCase();
                filtered = filtered.filter(post => 
                    post.title.toLowerCase().includes(term) ||
                    post.description.toLowerCase().includes(term)
                );
            }
            return filtered;
        }

        // --- Rendering Functions (From Task4.js) ---

        /**
         * Renders the visible blog posts.
         */
        function renderPosts() {
            const filteredPosts = getFilteredPosts();
            const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

            // Ensure current page is valid after filtering/searching
            if (currentPage > totalPages) {
                currentPage = Math.max(1, totalPages);
            }

            // Calculate which posts to display (Pagination)
            const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
            const visiblePosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

            // Render the posts
            mainContent.innerHTML = '';
            if (visiblePosts.length === 0) {
                mainContent.innerHTML = `<p class="col-span-full text-center text-gray-500 p-10 text-xl">No posts found matching your current category or search criteria.</p>`;
            } else {
                visiblePosts.forEach(post => {
                    const article = document.createElement('article');
                    article.className = 'blog-post-card';

                    // Using object-fit-cover class from Tailwind for the image container in CSS
                    article.innerHTML = `
                        <img src="${post.image}" alt="${post.title} image" onerror="this.src='https://placehold.co/600x400/808080/ffffff?text=Image+Error'">
                        <div class="p-4">
                            <h3 class="text-xl font-semibold text-gray-800 mb-1">${post.title}</h3>
                            <p class="description text-gray-600 mb-3">${post.description}</p>
                            <p class="date text-sm text-gray-400">Published: ${post.date}</p>
                        </div>
                    `;
                    mainContent.appendChild(article);
                });
            }
            // Always update pagination after rendering posts
            renderPagination(filteredPosts.length);
        }

        /**
         * Renders the pagination controls based on the total number of filtered posts.
         * @param {number} totalItems - The total number of items after filtering.
         */
        function renderPagination(totalItems) {
            paginationContainer.innerHTML = '';
            const totalPages = Math.ceil(totalItems / POSTS_PER_PAGE);

            if (totalPages <= 1) return;

            // --- Previous Button ---
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.onclick = () => { if (currentPage > 1) { currentPage--; renderPosts(); } };
            prevButton.disabled = (currentPage === 1);
            prevButton.className = 'bg-white hover:bg-gray-100 border border-gray-300 rounded px-3 py-1 disabled:opacity-50';
            paginationContainer.appendChild(prevButton);

            // --- Page Number Buttons ---
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.onclick = () => { currentPage = i; renderPosts(); };
                
                let buttonClasses = 'bg-white hover:bg-gray-100 border border-gray-300 rounded px-3 py-1';
                if (i === currentPage) {
                    buttonClasses += ' active'; // Uses the active CSS class defined in <style>
                }
                pageButton.className = buttonClasses;
                paginationContainer.appendChild(pageButton);
            }
            
            // --- Next Button ---
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.onclick = () => { if (currentPage < totalPages) { currentPage++; renderPosts(); } };
            nextButton.disabled = (currentPage === totalPages);
            nextButton.className = 'bg-white hover:bg-gray-100 border border-gray-300 rounded px-3 py-1 disabled:opacity-50';
            paginationContainer.appendChild(nextButton);
        }

        // --- Event Listeners Setup (From Task4.js) ---

        /**
         * Handles category filter button clicks.
         * @param {Event} e - The click event object.
         */
        function handleCategoryClick(e) {
            if (e.target.tagName === 'BUTTON') {
                // Remove 'active' class from all buttons
                categoryNav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));

                // Set 'active' class on the clicked button
                e.target.classList.add('active');

                // Update state and re-render
                currentCategory = e.target.getAttribute('data-category');
                currentPage = 1; // Reset to first page on filter change
                renderPosts();
            }
        }

        /**
         * Handles search button clicks or Enter key press on the input.
         */
        function handleSearch() {
            currentSearchTerm = searchInput.value.trim();
            currentPage = 1; // Reset to first page on new search
            renderPosts();
        }

        // --- Initialization (From Task4.js) ---
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Setup Event Listeners
            categoryNav.addEventListener('click', handleCategoryClick);
            
            searchButton.addEventListener('click', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });

            // 2. Initial Render
            renderPosts();
        });