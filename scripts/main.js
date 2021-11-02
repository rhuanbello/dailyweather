const initSearch = () => {
    const inputSearch = document.querySelector('.search-container .input-search')
    const btnSearchTerm = document.querySelector('.search-container .search-btn.term')

    const search = () => {
        let searchTerm = inputSearch.value
        let btn = btnSearchTerm 
        
        if (searchTerm) {
            btn.setAttribute('href', `https://www.google.de/search?q=${searchTerm}`)
            btn.setAttribute('target', '_blank')
        } else {
            btn.setAttribute('href', '')
            btn.setAttribute('target', '')
        }
        
    }

    btnSearchTerm.addEventListener('click', search)

    // Se pressionar enter e houver valor no input
    document.addEventListener('keydown', (e) => {
        if(e.key === "Enter" && inputSearch.value) {
           btnSearchTerm.click()
        }
    });

}

initSearch()

const chooseInput = () => {
    const inputLocation = document.querySelector('.search-container .input-location')
    const inputSearch = document.querySelector('.search-container .input-search')
    const btnChangeInputToLocation = document.querySelector('.search-container .btn-location')
    const btnChangeInputToSearch = document.querySelector('.search-container .btn-search')
    const btnSearchTerm = document.querySelector('.search-container .search-btn.term')
    const btnSearchLocation = document.querySelector('.search-container .search-btn.location')
    const btnChange = document.querySelectorAll('.search-container .search-options .change')

    const changeInputToLocation = () => {
        inputLocation.classList.toggle('hidden');
        inputSearch.classList.toggle('hidden');
        btnSearchLocation.classList.toggle('hidden')
        btnSearchTerm.classList.toggle('hidden')
        btnChangeInputToLocation.classList.toggle('active')
        btnChangeInputToSearch.classList.toggle('active')
        inputSearch.value = ''
        inputLocation.value = ''
    }


    btnChange.forEach(btn => {
        btn.addEventListener('click', changeInputToLocation)

    })

}

chooseInput()

