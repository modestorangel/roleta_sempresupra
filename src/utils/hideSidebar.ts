const hideSidebar = (event: any) => {
    const isOpenSidebar = event.target.id === 'input-check'
    if (!isOpenSidebar){
        const el: any = document.getElementById('input-check')
        el.checked = false
    }
}

export default hideSidebar