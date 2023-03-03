const StarRating = ($container) => {
  const applyStyle = () => {
    const HREF = "star-rating/theme.css";
    const links = document.querySelectorAll("link");
    const lastLink = Array.from(links).slice(-1)[0];

    if (lastLink.href.includes(HREF)) return;

    const newLink = document.createElement("link");
    newLink.href = HREF;
    newLink.rel = "stylesheet";
    lastLink.after(newLink);
  };

  const setContainer = () => {
    $container.classList.add("star-rating-container");
  };

  const createStars = () => {
    const maxRating = $container.dataset.maxRating;
    for (let i = 0; i < maxRating; i++) {
      const star = document.createElement("i");
      star.className = "bx bxs-star";
      star.dataset.rating = i + 1;

      $container.appendChild(star);
    }
  };

  const resetHover = (e) => {
    const starList = Array.from(e.currentTarget.children);
    starList.forEach((star) =>
      star.classList.remove("hovered")
    );
  };

  const handleHover = (e) => {
    resetHover(e);

    if (!e.target.className.includes("bxs-star")) return;

    const starList = Array.from(e.currentTarget.children);
    const rating = e.target.dataset.rating;
    for (let i = 0; i < rating; i++) {
      starList[i].classList.add("hovered");
    }
  };

  const resetSelect = (e) => {
    const starList = Array.from(e.currentTarget.children);
    starList.forEach((star) =>
      star.classList.remove("selected")
    );
  };

  const dispatchRatingEvent = (e) => {
    const rating = e.target.dataset.rating;
    const ratingEvent = new CustomEvent("rating-change", {
      bubbles: true,
      cancelable: true,
      detail: rating,
    });
    e.currentTarget.dispatchEvent(ratingEvent);
  };

  const handleSelect = (e) => {
    if (!e.target.className.includes("bxs-star")) return;

    resetSelect(e);

    const starList = Array.from(e.currentTarget.children);
    const rating = e.target.dataset.rating;
    for (let i = 0; i < rating; i++) {
      starList[i].classList.add("selected");
    }

    dispatchRatingEvent(e);
  };

  const init = () => {
    applyStyle();
    setContainer();
    createStars();

    $container.addEventListener("mouseover", handleHover);
    $container.addEventListener("mouseleave", resetHover);
    $container.addEventListener("click", handleSelect);
  };

  init();
};

export default StarRating;
