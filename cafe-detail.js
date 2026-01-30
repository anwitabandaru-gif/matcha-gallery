class CafeDetail {
    constructor() {
        this.cafe = null;
        this.supabase = null;
        this.init();
    }

    async init() {
        // Initialize Supabase
        this.supabase = initSupabase();
        
        // Get cafe ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const cafeId = urlParams.get('id');
        
        if (!cafeId) {
            this.showError('No cafe ID provided');
            return;
        }
        
        await this.loadCafe(cafeId);
        this.renderCafe();
    }

    async loadCafe(cafeId) {
        try {
            const { data, error } = await this.supabase
                .from('cafes')
                .select('*')
                .eq('id', cafeId)
                .single();
            
            if (error) throw error;
            
            this.cafe = data;
        } catch (error) {
            console.error('Error loading cafe:', error);
            this.showError('Could not load cafe details');
        }
    }

    getStars(rating) {
        const fullStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return fullStars + emptyStars;
    }

    renderCafe() {
        const container = document.getElementById('detailContainer');
        
        if (!this.cafe) {
            return;
        }

        const formattedDate = new Date(this.cafe.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const avgRating = ((this.cafe.ratings.environment + this.cafe.ratings.drink + this.cafe.ratings.photo) / 3).toFixed(1);

        container.innerHTML = `
            <div class="detail-header">
                <h1 class="detail-title">${this.cafe.name}</h1>
                <div class="detail-location">📍 ${this.cafe.location}</div>
                <div class="detail-date">📅 ${formattedDate}</div>
            </div>

            ${this.cafe.image ? `
                <div class="detail-image-container">
                    <img src="${this.cafe.image}" alt="${this.cafe.name}" class="detail-image">
                </div>
            ` : `
                <div class="detail-image-container">
                    <div class="detail-placeholder">🍵</div>
                </div>
            `}

            <div class="overall-rating">
                <div class="overall-rating-label">overall rating</div>
                <div class="overall-rating-value">${avgRating} / 5.0</div>
                <div class="overall-rating-stars">${this.getStars(Math.round(avgRating))}</div>
            </div>

            <div class="ratings-section">
                <h2 class="section-title">ratings breakdown</h2>
                <div class="ratings-grid">
                    <div class="rating-card">
                        <div class="rating-card-icon">🏪</div>
                        <div class="rating-card-label">environment</div>
                        <div class="rating-card-stars">${this.getStars(this.cafe.ratings.environment)}</div>
                    </div>
                    <div class="rating-card">
                        <div class="rating-card-icon">🍵</div>
                        <div class="rating-card-label">drink quality</div>
                        <div class="rating-card-stars">${this.getStars(this.cafe.ratings.drink)}</div>
                    </div>
                    <div class="rating-card">
                        <div class="rating-card-icon">📸</div>
                        <div class="rating-card-label">photo-op</div>
                        <div class="rating-card-stars">${this.getStars(this.cafe.ratings.photo)}</div>
                    </div>
                </div>
            </div>

            ${this.cafe.drinkInfo?.name ? `
                <div class="drink-section">
                    <h2 class="drink-title">🥤 drink details</h2>
                    <div class="drink-grid">
                        <div class="drink-item">
                            <div class="drink-item-label">what i ordered</div>
                            <div class="drink-item-value">${this.cafe.drinkInfo.name}</div>
                        </div>
                        ${this.cafe.drinkInfo.flavor ? `
                            <div class="drink-item">
                                <div class="drink-item-label">flavor notes</div>
                                <div class="drink-item-value">${this.cafe.drinkInfo.flavor}</div>
                            </div>
                        ` : ''}
                        ${this.cafe.drinkInfo.color ? `
                            <div class="drink-item">
                                <div class="drink-item-label">color</div>
                                <div class="drink-item-value">${this.cafe.drinkInfo.color}</div>
                            </div>
                        ` : ''}
                        ${this.cafe.drinkInfo.order ? `
                            <div class="drink-item">
                                <div class="drink-item-label">hot or iced</div>
                                <div class="drink-item-value">${this.cafe.drinkInfo.order === 'hot' ? '☕ hot' : '❄️ iced'}</div>
                            </div>
                        ` : ''}
                        ${this.cafe.drinkInfo.price ? `
                            <div class="drink-item">
                                <div class="drink-item-label">price</div>
                                <div class="drink-item-value">${this.cafe.drinkInfo.price}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}

            ${this.cafe.notes ? `
                <div class="notes-section">
                    <h2 class="section-title">my thoughts</h2>
                    <div class="notes-content">${this.cafe.notes}</div>
                </div>
            ` : ''}

            <div class="action-buttons">
                <a href="index.html" class="action-btn btn-back">← back to cafes</a>
                <a href="index.html?edit=${this.cafe.id}" class="action-btn btn-edit">edit this review ✎</a>
            </div>
        `;
    }

    showError(message) {
        const container = document.getElementById('detailContainer');
        container.innerHTML = `
            <div class="detail-header">
                <h1 class="detail-title">oops!</h1>
                <div class="detail-location">${message}</div>
            </div>
            <div class="action-buttons">
                <a href="index.html" class="action-btn btn-back">← back to cafes</a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CafeDetail();
});