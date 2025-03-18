import { defineStore } from 'pinia';

export const usePhotoStore = defineStore('photo', {
    state: () => ({
        photos: [],
        isLoading: false,
        albumIdsInput: '',
        displayedPhotos: [],
        sortByField: null,
        sortDirection: 'asc',
        currentPage: 1,
        itemsPerPage: 30,
        itemsPerScroll: 20,
        tableHeaders: {
            id: 'Ид',
            albumId: 'Альбом',
            title: 'Название',
            url: 'Ссылка',
            thumbnailUrl: 'Миниатюра',
        },
    }),
    getters: {
        getDisplayedPhotos: (state) => {
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            return state.photos.slice(0, startIndex + state.itemsPerPage);
        },
    },
    actions: {
        async fetchPhotos(albumIds = '') {
            this.isLoading = true;
            try {
                let url = 'https://jsonplaceholder.typicode.com/photos';
                if (albumIds) {
                    const ids = albumIds.split(' ').filter(Boolean);
                    const params = ids.map((id) => `albumId=${id}`).join('&');
                    url += `?${params}`;
                }
                const response = await fetch(url);
                this.photos = await response.json();
                this.displayedPhotos = this.photos.slice(0, this.itemsPerPage);             } catch (error) {

                console.error('Error fetching photos:', error);
            } finally {
                this.isLoading = false;
                this.currentPage = 2;
            }
        },
        loadMoreItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerScroll;
            const nextPhotos = this.photos.slice(startIndex, endIndex);
            this.displayedPhotos = [...this.displayedPhotos, ...nextPhotos];
            this.currentPage++;
        },

        sortBy(field) {
            if (this.sortByField === field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortByField = field;
                this.sortDirection = 'asc';
            }

            this.photos.sort((a, b) => {
                const valueA = a[field];
                const valueB = b[field];

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
                } else {
                    const compareA = String(valueA).toUpperCase();
                    const compareB = String(valueB).toUpperCase();

                    if (compareA < compareB) {
                        return this.sortDirection === 'asc' ? -1 : 1;
                    }
                    if (compareA > compareB) {
                        return this.sortDirection === 'asc' ? 1 : -1;
                    }
                    return 0;
                }
            });
            this.displayedPhotos = this.photos.slice(0, this.itemsPerPage);
        },
    },
});