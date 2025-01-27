chrome.storage.sync.get(
    { url: '' },
    items => {
        if (items.url) {
            window.location.href = items.url
        } else {
            chrome.runtime.openOptionsPage()
        }
    }
)
