export class FilterNews {

  static bannerImages = document.querySelector('.js-banner-images');
  static filterTitle = document.querySelector('.js-filter-title');
  static filterParams = document.querySelector('.js-filter-params');
  static filterResult = document.querySelector('.js-filter-result');
  static activeFilters = [];

  static init() {
    if (!this.bannerImages || !this.filterTitle || !this.filterParams || !this.filterResult) return;

    this.filterTitle.addEventListener('click', () => {
      this.filterParams.classList.toggle('is-open');
      this.filterTitle.classList.toggle('is-active');
    });

    const defaultParam = this.filterParams.querySelector('.param-item:first-child');

    defaultParam.addEventListener('click', () => {
      this.activeFilters = [];
      this.filterParams.querySelectorAll('.param-item:not(:first-child)').forEach(param => {
        param.classList.remove('is-active');
      });
      this.bannerImages.querySelectorAll('.banner__image').forEach(img => {
        img.classList.remove('is-active');
        img.classList.remove('is-shadow');
      });
      this.updateResult();
      this.filterParams.classList.remove('is-open');
      this.filterTitle.classList.remove('is-active');
    });


    this.filterParams.querySelectorAll('.param-item:not(:first-child)').forEach((param, index) => {
      param.addEventListener('click', () => {
        param.classList.toggle('is-active');
        const imageIndex = index + 1;

        if (param.classList.contains('is-active')) {
          this.activeFilters.push(imageIndex);
        } else {
          this.activeFilters = this.activeFilters.filter(item => item !== imageIndex);
        }

        this.updateImageStates();
        this.updateResult();
      });
    });

    document.addEventListener('click', (event) => {
      if (!this.filterTitle.contains(event.target) && !this.filterParams.contains(event.target)) {
        this.filterParams.classList.remove('is-open');
        this.filterTitle.classList.remove('is-active');
      }
    });

  }

  static updateImageStates() {
    this.bannerImages.querySelectorAll('.banner__image').forEach(img => {
      img.classList.remove('is-active');
      img.classList.remove('is-shadow');
    });

    this.activeFilters.forEach(filterIndex => {
      const image = this.bannerImages.querySelector(`.image-${filterIndex}`);
      if (image) {
        image.classList.add('is-active');
      }
    });

    if (this.activeFilters.length > 0) {
      this.bannerImages.querySelectorAll('.banner__image:not(.is-active)').forEach(img => {
        img.classList.add('is-shadow');
      });
    }
  }

  static updateResult() {
    this.filterResult.innerHTML = '';

    this.activeFilters.forEach(filterIndex => {
      const selectedParamText = this.filterParams.querySelector(`.param-item:nth-child(${filterIndex + 1})`).textContent;

      const resultItem = document.createElement('div');
      const resultItemSpan = document.createElement('span');
      resultItemSpan.textContent = selectedParamText;

      const iconDiv = document.createElement('div');
      iconDiv.classList.add('icon');
      iconDiv.innerHTML = `
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 0.5L1 6.5M1 0.5L7 6.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      resultItem.appendChild(resultItemSpan);
      resultItem.appendChild(iconDiv);
      resultItem.classList.add('result-item');
      resultItem.dataset.filterIndex = filterIndex;

      resultItem.addEventListener('click', () => {
        const indexToRemove = parseInt(resultItem.dataset.filterIndex, 10);
        this.toggleFilter(indexToRemove);
        this.updateResult();
        this.updateImageStates();
        this.filterParams.querySelector(`.param-item:nth-child(${indexToRemove + 1})`).classList.remove('is-active');
      });

      this.filterResult.appendChild(resultItem);
    });
  }

  static toggleFilter(index) {
    if (this.activeFilters.includes(index)) {
      this.activeFilters = this.activeFilters.filter(item => item !== index);
    }
  }
}