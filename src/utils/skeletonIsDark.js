export const skeletonIsDark = (theme, isBackground) =>  {
    if (isBackground) {
        return theme === 'dark' ? '#D1D7E0' : '#f3f3f3';
    } else {
        return theme === 'dark' ? '#e9ecef' : '#ecebeb';
    }
} 