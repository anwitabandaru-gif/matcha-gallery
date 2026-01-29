class CafeGallery {
    constructor() {
        this.cafes = this.loadCafes();
        this.currentEditIndex = null;
        this.init();
    }

    init() {
        this.renderCafes();
        this.attachEventListeners();
        
        // Check if we should open edit modal from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const editIndex = urlParams.get('edit');
        if (editIndex !== null) {
            const index = parseInt(editIndex);
            if (index >= 0 && index < this.cafes.length) {
                setTimeout(() => this.openModal(index), 100);
            }
        }
    }

    attachEventListeners() {
        const addBtn = document.getElementById('addCafeBtn');
        const closeBtn = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const form = document.getElementById('cafeForm');
        const modal = document.getElementById('cafeModal');

        addBtn.addEventListener('click', () => this.openModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    openModal(editIndex = null) {
        const modal = document.getElementById('cafeModal');
        const form = document.getElementById('cafeForm');
        const modalTitle = document.querySelector('.modal-title');
        
        this.currentEditIndex = editIndex;
        
        if (editIndex !== null) {
            modalTitle.textContent = '✎ edit matcha cafe';
            const cafe = this.cafes[editIndex];
            document.getElementById('cafeName').value = cafe.name;
            document.getElementById('cafeLocation').value = cafe.location;
            document.getElementById('cafeDate').value = cafe.date;
            document.getElementById('ratingEnvironment').value = cafe.ratings.environment;
            document.getElementById('ratingDrink').value = cafe.ratings.drink;
            document.getElementById('ratingPhoto').value = cafe.ratings.photo;
            document.getElementById('drinkName').value = cafe.drinkInfo.name || '';
            document.getElementById('drinkFlavor').value = cafe.drinkInfo.flavor || '';
            document.getElementById('drinkColor').value = cafe.drinkInfo.color || '';
            document.getElementById('drinkOrder').value = cafe.drinkInfo.order || '';
            document.getElementById('drinkPrice').value = cafe.drinkInfo.price || '';
            document.getElementById('cafeImage').value = cafe.image || '';
            document.getElementById('cafeNotes').value = cafe.notes || '';
        } else {
            modalTitle.textContent = '✎ add a matcha cafe';
            form.reset();
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('cafeModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentEditIndex = null;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const cafeData = {
            name: document.getElementById('cafeName').value,
            location: document.getElementById('cafeLocation').value,
            date: document.getElementById('cafeDate').value,
            ratings: {
                environment: parseInt(document.getElementById('ratingEnvironment').value),
                drink: parseInt(document.getElementById('ratingDrink').value),
                photo: parseInt(document.getElementById('ratingPhoto').value)
            },
            drinkInfo: {
                name: document.getElementById('drinkName').value,
                flavor: document.getElementById('drinkFlavor').value,
                color: document.getElementById('drinkColor').value,
                order: document.getElementById('drinkOrder').value,
                price: document.getElementById('drinkPrice').value
            },
            image: document.getElementById('cafeImage').value,
            notes: document.getElementById('cafeNotes').value,
            id: this.currentEditIndex !== null ? this.cafes[this.currentEditIndex].id : Date.now()
        };

        if (this.currentEditIndex !== null) {
            this.cafes[this.currentEditIndex] = cafeData;
        } else {
            this.cafes.push(cafeData);
        }

        this.saveCafes();
        this.renderCafes();
        this.closeModal();
    }

    deleteCafe(index) {
        const cafe = this.cafes[index];
        if (confirm(`are you sure you want to delete "${cafe.name}"?`)) {
            this.cafes.splice(index, 1);
            this.saveCafes();
            this.renderCafes();
        }
    }

    getStars(rating) {
        const fullStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return fullStars + emptyStars;
    }

    renderCafes() {
        const grid = document.getElementById('cafeGrid');
        
        if (this.cafes.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🍵</div>
                    <div class="empty-state-text">no cafes yet!</div>
                    <div class="empty-state-subtext">start your matcha journey by adding your first cafe ♡</div>
                </div>
            `;
            return;
        }

        const sortedCafes = [...this.cafes].sort((a, b) => new Date(b.date) - new Date(a.date));

        grid.innerHTML = sortedCafes.map((cafe, index) => {
            const originalIndex = this.cafes.findIndex(c => c.id === cafe.id);
            const formattedDate = new Date(cafe.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });

            const drinkInfoHTML = cafe.drinkInfo.name ? `
                <div class="drink-info">
                    <div class="drink-name">🥤 ${cafe.drinkInfo.name}</div>
                    <div class="drink-details">
                        ${cafe.drinkInfo.flavor ? `<div>👅 ${cafe.drinkInfo.flavor}</div>` : ''}
                        ${cafe.drinkInfo.color ? `<div>🎨 ${cafe.drinkInfo.color}</div>` : ''}
                        ${cafe.drinkInfo.order ? `<div>${cafe.drinkInfo.order === 'hot' ? '☕ hot' : '❄️ iced'}</div>` : ''}
                        ${cafe.drinkInfo.price ? `<div>💰 ${cafe.drinkInfo.price}</div>` : ''}
                    </div>
                </div>
            ` : '';

            return `
                <div class="cafe-card" onclick="gallery.openCafeDetail(${originalIndex})">
                    <div class="cafe-image">
                        ${cafe.image ? `<img src="${cafe.image}" alt="${cafe.name}">` : '🍵'}
                    </div>
                    <div class="cafe-content">
                        <h3 class="cafe-name">${cafe.name}</h3>
                        <div class="cafe-location">📍 ${cafe.location}</div>
                        <div class="cafe-date">📅 ${formattedDate}</div>
                        
                        <div class="cafe-ratings">
                            <div class="rating-item">
                                <span class="rating-label">environment</span>
                                <div class="rating-stars">${this.getStars(cafe.ratings.environment)}</div>
                            </div>
                            <div class="rating-item">
                                <span class="rating-label">drink</span>
                                <div class="rating-stars">${this.getStars(cafe.ratings.drink)}</div>
                            </div>
                            <div class="rating-item">
                                <span class="rating-label">photo-op</span>
                                <div class="rating-stars">${this.getStars(cafe.ratings.photo)}</div>
                            </div>
                        </div>
                        
                        ${drinkInfoHTML}
                        
                        ${cafe.notes ? `<div class="cafe-notes">${cafe.notes}</div>` : ''}
                        
                        <div class="cafe-actions">
                            <button class="btn-edit" onclick="event.stopPropagation(); gallery.openModal(${originalIndex})">edit ✎</button>
                            <button class="btn-delete" onclick="event.stopPropagation(); gallery.deleteCafe(${originalIndex})">delete ✕</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    openCafeDetail(index) {
        const cafe = this.cafes[index];
        window.location.href = `cafe-detail.html?id=${cafe.id}`;
    }

    saveCafes() {
        localStorage.setItem('matchaCafes', JSON.stringify(this.cafes));
    }

    loadCafes() {
        const saved = localStorage.getItem('matchaCafes');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            {
                id: 1,
                name: "Cha Cha Matcha",
                location: "New York, NY",
                date: "2024-12-15",
                ratings: {
                    environment: 5,
                    drink: 5,
                    photo: 5
                },
                drinkInfo: {
                    name: "Matcha Latte",
                    flavor: "creamy, sweet, umami",
                    color: "vibrant green",
                    order: "iced",
                    price: "$6.50"
                },
                image: "",
                notes: "omg this place is SO cute!! the matcha was perfect and the vibes were immaculate ✨ definitely coming back!"
            },
            {
                id: 2,
                name: "Matcha Cafe Maiko",
                location: "San Francisco, CA",
                date: "2024-11-20",
                ratings: {
                    environment: 4,
                    drink: 5,
                    photo: 4
                },
                drinkInfo: {
                    name: "Traditional Matcha",
                    flavor: "authentic, slightly bitter",
                    color: "deep green",
                    order: "hot",
                    price: "$5.75"
                },
                image: "",
                notes: "super authentic japanese vibes! the matcha was chef's kiss 👌 loved the traditional preparation"
            }
        ];
    }
}

let gallery;
document.addEventListener('DOMContentLoaded', () => {
    gallery = new CafeGallery();
});