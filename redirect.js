if (!chrome.storage) {
    throw Error('Storage undefined')
}

chrome.storage.sync.get(
    { url: '' },
    items => {
        if (items.url) {
            window.location.href = items.url
        }
    }
)
