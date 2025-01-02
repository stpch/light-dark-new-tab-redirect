const urlInput = document.getElementById('url')

if (!urlInput) {
    throw Error('Missing elements')
} else if (!chrome.storage) {
    throw Error('Storage undefined')
}

const loadOptions = () => {
    chrome.storage.sync.get(
        { url: '' },
        items => {
            document.getElementById('url').value = items.url
        }
    )
}

const saveOptions = event => {
    const url = event.currentTarget.value

    chrome.storage.sync.set(
        { url },
        () => {
            console.log('Options saved')
        }
    );
}

document.addEventListener('DOMContentLoaded', loadOptions)
urlInput.addEventListener('change', saveOptions)
