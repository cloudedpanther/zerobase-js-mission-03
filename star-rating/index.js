const StarRating = ($container) => {
  const applyStyle = () => {
    const HREF = 'star-rating/theme.css';
    const links = document.querySelectorAll('link');
    const lastLink = Array.from(links).slice(-1)[0];

    if (lastLink.href.includes(HREF)) return;

    const newLink = document.createElement('link');
    newLink.href = HREF;
    newLink.rel = 'stylesheet';
    lastLink.after(newLink);
  };

  const createContainer = () => {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-rating-container';
    $container.appendChild(starContainer);
  };

  const createStars = () => {
    const {
      dataset: { maxRating },
    } = $container;
    for (let i = 0; i < maxRating; i += 1) {
      const star = document.createElement('i');
      star.className = 'bx bxs-star';
      star.dataset.rating = i + 1;

      $container.firstChild.appendChild(star);
    }
  };

  const getStarList = (e) => Array.from(e.currentTarget.firstChild.children);

  const resetHover = (e) => {
    const starList = getStarList(e);
    starList.forEach((star) => star.classList.remove('hovered'));
  };

  const handleHover = (e) => {
    resetHover(e);

    if (!e.target.className.includes('bxs-star')) return;

    const starList = getStarList(e);
    const {
      dataset: { rating },
    } = e.target;
    for (let i = 0; i < rating; i += 1) {
      starList[i].classList.add('hovered');
    }
  };

  const resetSelect = (e) => {
    const starList = getStarList(e);
    starList.forEach((star) => star.classList.remove('selected'));
  };

  const dispatchRatingEvent = (e) => {
    const {
      dataset: { rating },
    } = e.target;
    const ratingEvent = new CustomEvent('rating-change', {
      bubbles: true,
      cancelable: true,
      detail: rating,
    });
    e.currentTarget.dispatchEvent(ratingEvent);
  };

  const handleSelect = (e) => {
    if (!e.target.className.includes('bxs-star')) return;

    resetSelect(e);

    const starList = getStarList(e);
    const {
      dataset: { rating },
    } = e.target;
    for (let i = 0; i < rating; i += 1) {
      starList[i].classList.add('selected');
    }

    dispatchRatingEvent(e);
  };

  const init = () => {
    applyStyle();
    createContainer();
    createStars();

    $container.addEventListener('mouseover', handleHover);
    $container.addEventListener('mouseleave', resetHover);
    $container.addEventListener('click', handleSelect);
  };

  init();
};

export default StarRating;
