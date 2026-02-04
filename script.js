/* ================================================= */
/* ===   WATZ STORE - THE FINAL DEFINITIVE SCRIPT  === */
/* ================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // === 1. CORE CART SYSTEM (GLOBAL) ===
    let cart = JSON.parse(localStorage.getItem('watzOtakuCart')) || [];
    const saveCart = () => { localStorage.setItem('watzOtakuCart', JSON.stringify(cart)); updateCartIcon(); };
    const addToCart = (productId, quantity = 1) => { const product = allProducts.find(p => p.id === productId); if (!product) return; const existingItem = cart.find(item => item.id === productId); if (existingItem) { existingItem.quantity += quantity; } else { cart.push({ ...product, quantity: quantity }); } saveCart(); animateCartIcon(); };
    const updateQuantity = (productId, newQuantity) => { const itemInCart = cart.find(item => item.id === productId); if (itemInCart) { if (newQuantity > 0) { itemInCart.quantity = newQuantity; } else { removeFromCart(productId); } saveCart(); }};
    const removeFromCart = (productId) => { cart = cart.filter(item => item.id !== productId); saveCart(); };
    const updateCartIcon = () => { const cartCountElements = document.querySelectorAll('#cart-count'); if (cartCountElements.length > 0) { const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); cartCountElements.forEach(el => el.textContent = totalItems); }};
    const animateCartIcon = () => { const cartCountElements = document.querySelectorAll('#cart-count'); cartCountElements.forEach(el => { el.classList.add('updated'); setTimeout(() => el.classList.remove('updated'), 300); }); };

    // === 2. PAGE-SPECIFIC LOGIC ===

    // --- LOGIC FOR THE HOMEPAGE (`index.html`) ---
    if (document.body.querySelector('.hero')) {
        const productGrid = document.getElementById('product-grid');
        if (productGrid && typeof allProducts !== 'undefined') {
            productGrid.innerHTML = '';
            allProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card hidden'; 
                card.dataset.name = product.name;
                card.innerHTML = `
                    <a href="product.html?id=${product.id}" class="product-link">
                        <div class="product-image-container"><img src="${product.images[0]}" alt="${product.name}"></div>
                        <h3>${product.name}</h3><p class="price">${product.price} BDT</p>
                    </a>
                    <button class="buy-btn btn btn-solid" data-name="${product.name}">Order Now!</button>`;
                productGrid.appendChild(card);
            });
        }
        
        const searchInput = document.getElementById('search-input'), suggestionsBox = document.getElementById('suggestions-box'), noResultsMessage = document.getElementById('no-results');
        const suggestionKeywords = ['Sticker', 'Washi Tape', 'Keychain', 'Pin', 'Journal', 'Jujutsu Kaisen', 'Spy x Family', 'Chainsaw Man', 'Ghibli', 'Anya', 'Gojo', 'Pochita'];
        const filterProducts = () => { const searchTerm = searchInput.value.toLowerCase(); let productsFound = 0; document.querySelectorAll('.product-card').forEach(card => { const productName = card.dataset.name.toLowerCase(); if (productName.includes(searchTerm)) { card.style.display = 'flex'; productsFound++; } else { card.style.display = 'none'; } }); noResultsMessage.style.display = (productsFound === 0) ? 'block' : 'none'; };
        searchInput.addEventListener('input', () => { const inputText = searchInput.value.toLowerCase(); suggestionsBox.innerHTML = ''; if (inputText.length > 0) { const matchingSuggestions = suggestionKeywords.filter(k => k.toLowerCase().includes(inputText)); if (matchingSuggestions.length > 0) { matchingSuggestions.forEach(s => { const item = document.createElement('div'); item.className = 'suggestion-item'; item.textContent = s; item.onclick = () => { searchInput.value = s; suggestionsBox.style.display = 'none'; filterProducts(); }; suggestionsBox.appendChild(item); }); suggestionsBox.style.display = 'block'; } else { suggestionsBox.style.display = 'none'; } } else { suggestionsBox.style.display = 'none'; } });
        document.addEventListener('click', e => { if (!e.target.closest('.search-box')) { suggestionsBox.style.display = 'none'; }});
        document.getElementById('search-btn').addEventListener('click', () => { filterProducts(); suggestionsBox.style.display = 'none'; });
        searchInput.addEventListener('keyup', e => { if (e.key === 'Enter') { filterProducts(); suggestionsBox.style.display = 'none'; }});

        const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); else entry.target.classList.remove('show'); }); }, { threshold: 0.1 });
        document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
    }

    // --- LOGIC FOR THE PRODUCT DETAIL PAGE (`product.html`) ---
    if (document.body.querySelector('.product-detail-container')) {
        const productDetailContainer = document.getElementById('product-detail-container');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = allProducts.find(p => p.id === productId);

        if (product) {
            document.title = `${product.name} - WATZ STORE`;
            productDetailContainer.innerHTML = `
                <div class="product-detail-image"><img src="" alt="" id="main-product-image"><div class="product-thumbnails" id="product-thumbnails"></div></div>
                <div class="product-detail-info">
                    <h1>${product.name}</h1><p class="price">${product.price} BDT</p><p class="description">${product.description}</p>
                    <div class="quantity-selector"><label for="quantity-input">Quantity</label><div class="quantity-controls"><button class="quantity-btn" id="decrease-quantity">-</button><input type="number" id="quantity-input" value="1" min="1"><button class="quantity-btn" id="increase-quantity">+</button></div></div>
                    <div class="product-action-buttons"><button class="btn btn-solid" data-name="${product.name}">Order Now</button><button class="btn btn-outline" id="add-to-cart-button" data-id="${product.id}" data-name="${product.name}">Add to Cart</button></div>
                </div>
                <div class="product-detail-sidebar">
                    <div class="info-block"><h3><i class="fa-solid fa-truck-fast info-icon"></i>Delivery</h3><div class="info-item"><i class="fa-solid fa-location-dot"></i><span>Inside Dhaka: 60 BDT</span></div><div class="info-item"><i class="fa-solid fa-map"></i><span>Outside Dhaka: 120 BDT</span></div><div class="info-item"><i class="fa-solid fa-hand-holding-dollar"></i><span>Cash on Delivery</span></div></div>
                    <div class="info-block"><h3><i class="fa-solid fa-box-open info-icon"></i>Return</h3><div class="info-item"><i class="fa-solid fa-right-left"></i><span>7 Days Return</span></div></div>
                    <div class="info-block"><div class="brand-profile"><img src="logo.png" class="logo-img"><span class="brand-name">WATZ STORE</span></div></div>
                </div>`;

            const mainImage = document.getElementById('main-product-image');
            const thumbnailsContainer = document.getElementById('product-thumbnails');
            mainImage.src = product.images[0]; mainImage.alt = product.name;
            if (product.images.length > 1) {
                product.images.forEach((imageSrc, index) => { const thumb = document.createElement('img'); thumb.src = imageSrc; thumb.className = 'thumbnail-img'; if (index === 0) thumb.classList.add('active'); thumb.addEventListener('click', () => { mainImage.src = imageSrc; document.querySelectorAll('.thumbnail-img').forEach(t => t.classList.remove('active')); thumb.classList.add('active'); }); thumbnailsContainer.appendChild(thumb); });
            } else { thumbnailsContainer.style.display = 'none'; }
            
            const decreaseBtn = document.getElementById('decrease-quantity'), increaseBtn = document.getElementById('increase-quantity'), quantityInput = document.getElementById('quantity-input');
            decreaseBtn.addEventListener('click', () => { if (parseInt(quantityInput.value) > 1) quantityInput.value = parseInt(quantityInput.value) - 1; });
            increaseBtn.addEventListener('click', () => { quantityInput.value = parseInt(quantityInput.value) + 1; });

            document.getElementById('add-to-cart-button').addEventListener('click', e => { addToCart(parseInt(e.target.dataset.id), parseInt(quantityInput.value)); });

            const reviewsContainer = document.getElementById('reviews-container');
            const dummyReviews = [{name: 'Samin Y.', date: '28 Jan 2026', rating: 5, isVerified: true, comment: 'Absolutely love the quality!', photos: []},{name: '017***1234', date: '15 Jan 2026', rating: 4, isVerified: false, comment: 'Good product.', photos: []}];
            if (reviewsContainer) {
                const totalReviews = dummyReviews.length;
                const averageRating = (dummyReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
                reviewsContainer.innerHTML = `
                    <h2 class="section-title"><span>Ratings & Reviews</span></h2>
                    <div class="reviews-summary">
                        <div class="average-rating"><div class="score">${averageRating}/5</div><div class="stars">${'★'.repeat(Math.round(averageRating))}${'☆'.repeat(5-Math.round(averageRating))}</div><div class="total-reviews">${totalReviews} Ratings</div></div>
                        <div class="rating-breakdown">
                            <div class="rating-row"><div class="stars">★★★★★</div><div class="progress-bar"><div class="progress-bar-fill" style="width: 80%;"></div></div><div class="count">${dummyReviews.filter(r=>r.rating===5).length}</div></div>
                            <div class="rating-row"><div class="stars">★★★★☆</div><div class="progress-bar"><div class="progress-bar-fill" style="width: 20%;"></div></div><div class="count">${dummyReviews.filter(r=>r.rating===4).length}</div></div>
                            <div class="rating-row"><div class="stars">★★★☆☆</div><div class="progress-bar"><div class="progress-bar-fill" style="width: 0%;"></div></div><div class="count">${dummyReviews.filter(r=>r.rating===3).length}</div></div>
                            <div class="rating-row"><div class="stars">★★☆☆☆</div><div class="progress-bar"><div class="progress-bar-fill" style="width: 0%;"></div></div><div class="count">${dummyReviews.filter(r=>r.rating===2).length}</div></div>
                            <div class="rating-row"><div class="stars">★☆☆☆☆</div><div class="progress-bar"><div class="progress-bar-fill" style="width: 0%;"></div></div><div class="count">${dummyReviews.filter(r=>r.rating===1).length}</div></div>
                        </div>
                    </div>
                    <div class="review-form-container">
                        <h3>Leave a Review</h3>
                        <form id="review-form" class="review-form"><div class="star-rating-input"><span class="stars"><span class="star" data-value="1">★</span><span class="star" data-value="2">★</span><span class="star" data-value="3">★</span><span class="star" data-value="4">★</span><span class="star" data-value="5">★</span></span></div><textarea placeholder="Share your thoughts..."></textarea><div class="photo-upload"><button type="button" id="photo-upload-btn"><i class="fa-solid fa-camera"></i>Add Photos</button><input type="file" id="photo-input" multiple hidden></div><button type="submit" class="cta-button">Submit</button></form>
                    </div>
                    <div class="reviews-list">
                        ${dummyReviews.map(review => `
                            <div class="review">
                                <div class="review-header"><div class="avatar">${review.name.charAt(0)}</div><div class="reviewer-info"><div class="name">${review.name} ${review.isVerified ? `<span class="verified-badge"><i class="fa-solid fa-certificate"></i> Verified Purchase</span>` : ''}</div><div class="date">${review.date}</div></div><div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div></div>
                                <div class="review-body"><p>${review.comment}</p></div>
                            </div>`).join('')}
                    </div>`;
                document.getElementById('photo-upload-btn').addEventListener('click', () => document.getElementById('photo-input').click());
                document.querySelectorAll('.star-rating-input .star').forEach(star => { star.addEventListener('click', () => { const value = star.dataset.value; document.querySelectorAll('.star-rating-input .star').forEach(s => s.classList.remove('selected')); for (let i = 0; i < value; i++) { document.querySelectorAll('.star-rating-input .star')[i].classList.add('selected'); } }); });
            }
        } else { productDetailContainer.innerHTML = `<p class="loading-placeholder">Oops! Product not found. (´• ω •\`)</p>`; }
    }

    // --- LOGIC FOR THE CART PAGE (`cart.html`) ---
    if (document.body.querySelector('.cart-page-main')) {
        const cartItemsList = document.getElementById('cart-items-list');
        const summarySubtotal = document.getElementById('summary-subtotal'), summaryShipping = document.getElementById('summary-shipping'), summaryTotal = document.getElementById('summary-total'), cartItemCountTitle = document.getElementById('cart-item-count-title'), cartItemCountSummary = document.getElementById('cart-item-count-summary'), checkoutButton = document.getElementById('checkout-button'), checkoutForm = document.getElementById('checkout-form');
        const renderCartPage = () => {
            cartItemsList.innerHTML = '';
            if (cart.length === 0) { cartItemsList.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>'; checkoutButton.disabled = true; checkoutForm.classList.remove('visible'); } else { checkoutButton.disabled = false; cart.forEach(item => { const itemRow = document.createElement('div'); itemRow.className = 'cart-item-row'; itemRow.innerHTML = `<img src="${item.images[0]}" alt="${item.name}" class="item-image"><div class="item-details"><p class="item-name">${item.name}</p></div><div class="quantity-controls"><button class="quantity-btn decrease-btn" data-id="${item.id}">-</button><input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}"><button class="quantity-btn increase-btn" data-id="${item.id}">+</button></div><p class="item-price">৳ ${item.price * item.quantity}</p><button class="remove-item-btn" data-id="${item.id}"><i class="fa-solid fa-trash-can"></i></button>`; cartItemsList.appendChild(itemRow); }); }
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = (subtotal > 0) ? 60 : 0;
            const total = subtotal + shipping;
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            summarySubtotal.textContent = `৳ ${subtotal}`; summaryShipping.textContent = `৳ ${shipping}`; summaryTotal.textContent = `৳ ${total}`; cartItemCountTitle.textContent = totalItems; cartItemCountSummary.textContent = totalItems;
        };
        cartItemsList.addEventListener('click', (event) => { const target = event.target.closest('button'); if (!target) return; const productId = parseInt(target.dataset.id); const item = cart.find(i => i.id === productId); if (target.matches('.increase-btn')) { if(item) updateQuantity(productId, item.quantity + 1); } if (target.matches('.decrease-btn')) { if(item) updateQuantity(productId, item.quantity - 1); } if (target.matches('.remove-item-btn')) { removeFromCart(productId); } renderCartPage(); });
        cartItemsList.addEventListener('change', (event) => { if (event.target.matches('.quantity-input')) { updateQuantity(parseInt(event.target.dataset.id), parseInt(event.target.value)); renderCartPage(); }});
        checkoutButton.addEventListener('click', () => { checkoutForm.classList.add('visible'); checkoutForm.scrollIntoView({ behavior: 'smooth' }); });
        checkoutForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const placeOrderBtn = checkoutForm.querySelector('.place-order-btn');
            placeOrderBtn.disabled = true; placeOrderBtn.textContent = 'Placing Order...';
            let orderDetails = "--- WATZ STORE ORDER ---\n\n";
            cart.forEach(item => { orderDetails += `${item.quantity} x ${item.name} = ৳ ${item.quantity * item.price}\n`; });
            orderDetails += "\n--------------------------\n";
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            orderDetails += `Subtotal: ৳ ${subtotal}\nShipping: ৳ 60\nTOTAL: ৳ ${subtotal + 60}\n\n`;
            const formData = new FormData(checkoutForm);
            formData.append("Order Summary", orderDetails);
            const data = Object.fromEntries(formData);
            try {
                const response = await fetch('https://formspree.io/f/xwvqwvzg', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }});
                if (response.ok) { alert('🎉 Order placed successfully! We will contact you shortly to confirm.'); cart = []; saveCart(); window.location.href = 'index.html'; } else { throw new Error('Network response was not ok.'); }
            } catch (error) { console.error('Formspree submission error:', error); alert('Oops! Something went wrong.'); placeOrderBtn.disabled = false; placeOrderBtn.textContent = 'Place Order'; }
        });
        renderCartPage();
    }
    
    // --- GLOBAL LOGIC ---
    updateCartIcon();
    document.body.addEventListener('click', function(event) {
        // This targets both the homepage buy button and the product page buy button
        if (event.target.matches('.buy-btn, .btn-solid')) { 
            const productName = event.target.dataset.name;
            const whatsappNumber = '8801700000000';
            const message = `Hi WATZ STORE! 👋 I would like to order: *${productName}*`;
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        }
    });
});