function(){
    const input = prompt("Введите данные в формате: rowId1,comment1;rowId2,comment2");
    if (input) {
        const data = input.split(';').map(item => {
            const [rowId, comment] = item.split(',').map(s => s.trim());
            return { rowId, comment };
        });
        function findElement(selector) {
            return document.querySelector(selector);
        }
        function findChatButton(id) {
            return findElement(`a[data-row_id="${id}"]`);
        }
        function findExcludeButton(btn) {
            return btn.closest('div')?.querySelector('.move-to-prev-step-icon');
        }
        function highlightRow(id) {
            const row = findChatButton(id)?.closest('tr');
            if (row) row.style.backgroundColor = "#FFFF99";
        }
        function insertComment(btn, comment) {
            btn.click();
            setTimeout(() => {
                const chatInput = findElement('textarea.w-100.comment_textarea');
                if (chatInput) {
                    chatInput.value = comment;
                    chatInput.dispatchEvent(new Event('input'));
                    const sendButton = findElement('button.m-transparent-btn');
                    if (sendButton) {
                        sendButton.click();
                        setTimeout(() => {
                            findElement('a.comments-close')?.click();
                            findExcludeButton(btn)?.click();
                            highlightRow(btn.getAttribute('data-row_id'));
                            processNext();
                        }, 500);
                    }
                }
            }, 1000);
        }
        let index = 0;
        function processNext() {
            if (index < data.length) {
                const { rowId, comment } = data[index++];
                const btn = findChatButton(rowId);
                if (btn) insertComment(btn, comment);
            }
        }
        processNext();
    }
}();
