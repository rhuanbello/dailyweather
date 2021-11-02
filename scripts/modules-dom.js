export function Dom(elemento) {
    this.element = function() {
        return document.querySelector(elemento)
    }
		this.allElements = function() {
        return document.querySelectorAll(elemento)

    }
		this.addClass = function(classe) {
        this.element().classList.add(classe)

    }
        this.removeClass = function(classe) {
        this.element().classList.remove(classe)

    }

    this.addClassAll = function(classe) {
        this.allElements().forEach(item => {
            item.classList.add(classe)
        })

    }

    this.removeClassAll = function(classe) {
        this.allElements().forEach(item => {
            item.classList.remove(classe)
        })

    }

}

