const isMobile = () => typeof window !== 'undefined' ? window.screen.width <= 768 : false

export default isMobile