// Matcha Cafe Gallery - JavaScript

class CafeGallery {
    constructor() {
        this.cafes = this.loadCafes();
        this.currentEditIndex = null;
        this.init();
    }

    init() {
        this.renderCafes();
        this.attachEventListeners();
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
        
        // Close modal when clicking outside
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
            // Edit mode
            modalTitle.textContent = 'Edit Matcha Cafe';
            const cafe = this.cafes[editIndex];
            document.getElementById('cafeName').value = cafe.name;
            document.getElementById('cafeLocation').value = cafe.location;
            document.getElementById('cafeDate').value = cafe.date;
            document.getElementById('cafeRating').value = cafe.rating;
            document.getElementById('cafeImage').value = cafe.image || '';
            document.getElementById('cafeNotes').value = cafe.notes || '';
        } else {
            // Add mode
            modalTitle.textContent = 'Add Matcha Cafe';
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
            rating: parseInt(document.getElementById('cafeRating').value),
            image: document.getElementById('cafeImage').value,
            notes: document.getElementById('cafeNotes').value,
            id: this.currentEditIndex !== null ? this.cafes[this.currentEditIndex].id : Date.now()
        };

        if (this.currentEditIndex !== null) {
            // Update existing cafe
            this.cafes[this.currentEditIndex] = cafeData;
        } else {
            // Add new cafe
            this.cafes.push(cafeData);
        }

        this.saveCafes();
        this.renderCafes();
        this.closeModal();
    }

    deleteCafe(index) {
        const cafe = this.cafes[index];
        if (confirm(`Are you sure you want to delete "${cafe.name}"?`)) {
            this.cafes.splice(index, 1);
            this.saveCafes();
            this.renderCafes();
        }
    }

    renderCafes() {
        const grid = document.getElementById('cafeGrid');
        
        if (this.cafes.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🍵</div>
                    <div class="empty-state-text">No cafes yet</div>
                    <div class="empty-state-subtext">Start your matcha journey by adding your first cafe</div>
                </div>
            `;
            return;
        }

        // Sort cafes by date (most recent first)
        const sortedCafes = [...this.cafes].sort((a, b) => new Date(b.date) - new Date(a.date));

        grid.innerHTML = sortedCafes.map((cafe, index) => {
            const originalIndex = this.cafes.findIndex(c => c.id === cafe.id);
            const stars = '⭐'.repeat(cafe.rating);
            const formattedDate = new Date(cafe.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });

            return `
                <div class="cafe-card">
                    <div class="cafe-image">
                        ${cafe.image ? `<img src="${cafe.image}" alt="${cafe.name}">` : '🍵'}
                    </div>
                    <div class="cafe-content">
                        <div class="cafe-header">
                            <div>
                                <h3 class="cafe-name">${cafe.name}</h3>
                                <div class="cafe-location">${cafe.location}</div>
                                <div class="cafe-date">${formattedDate}</div>
                            </div>
                            <div class="cafe-rating">${stars}</div>
                        </div>
                        ${cafe.notes ? `<div class="cafe-notes">${cafe.notes}</div>` : ''}
                        <div class="cafe-actions">
                            <button class="btn-edit" onclick="gallery.openModal(${originalIndex})">Edit</button>
                            <button class="btn-delete" onclick="gallery.deleteCafe(${originalIndex})">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    saveCafes() {
        localStorage.setItem('matchaCafes', JSON.stringify(this.cafes));
    }

    loadCafes() {
        const saved = localStorage.getItem('matchaCafes');
        if (saved) {
            return JSON.parse(saved);
        }
        // Return some sample data for demonstration
        return [
            {
                id: 1,
                name: "Cha Cha Matcha",
                location: "New York, NY",
                date: "2024-12-15",
                rating: 5,
                image: "",
                notes: "Incredible ceremonial grade matcha with the perfect balance of umami and sweetness. The latte art was stunning, and the atmosphere was peaceful yet modern."
            },
            {
                id: 2,
                name: "Matcha Cafe Maiko",
                location: "San Francisco, CA",
                date: "2024-11-20",
                rating: 4,
                image: "",
                notes: "Authentic Japanese preparation methods. The matcha soft serve was a delightful treat. Slightly bitter notes complemented by the creamy texture."
            }
        ];
    }
}

// Initialize the gallery when DOM is loaded
let gallery;
document.addEventListener('DOMContentLoaded', () => {
    gallery = new CafeGallery();
});
