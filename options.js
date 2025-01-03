const options = document.getElementById('options')
const fieldset = options.querySelector('fieldset')
const urlInput = options.querySelector('input[name="url"]')

if (!fieldset || !urlInput) {
    throw Error('Missing elements')
}

const urlRegex = /^(https):\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/

const getHelpText = () => options.querySelector('small')

const loadOptions = () => {
    chrome.storage.sync.get(
        { url: '' },
        items => {
            urlInput.value = items.url
        }
    )
}

const saveOptions = event => {
    event.preventDefault()
    getHelpText()?.remove()

    const formData = new FormData(options)
    const url = formData.get('url')

    if (typeof url === 'string' && urlRegex.test(url)) {
        chrome.storage.sync.set(
            { url },
            () => {
                fieldset.setAttribute('aria-invalid', 'false')
                urlInput.setAttribute('aria-invalid', 'false')
                fieldset.insertAdjacentHTML('afterend', '<small>Saved</small>')
            }
        );
    } else {
        fieldset.setAttribute('aria-invalid', 'true')
        urlInput.setAttribute('aria-invalid', 'true')
        fieldset.insertAdjacentHTML('afterend', '<small>Invalid URL</small>')
    }

    urlInput.focus()
}

const resetStatus = () => {
    const help = getHelpText()

    if (help) {
        fieldset.removeAttribute('aria-invalid')
        urlInput.removeAttribute('aria-invalid')
        help.remove()
    }

}

document.addEventListener('DOMContentLoaded', loadOptions)
options.addEventListener('submit', saveOptions)
urlInput.addEventListener('input', resetStatus)
