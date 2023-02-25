export const createObjectsPhotos = url => {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () {
      const width = this.width;
      const height = this.height;
      resolve({ width, height, src: url });
    };
    img.onerror = function () {
      reject(url);
    };
    img.src = url;
  });
};

export const photosForGallery = images => {
  const breakpoints = [1280, 768, 480, 320];
  const img = images?.map(({ src, width, height }, ind) => ({
    src,
    width,
    height,
    key: ind,
    alt: 'images',
    images: breakpoints.map(breakpoint => {
      const h = Math.round((height / width) * breakpoint);
      return {
        src,
        width: breakpoint,
        h,
        alt: 'images',
      };
    }),
  }));
  return img;
};
