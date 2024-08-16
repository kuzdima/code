const input = prompt("Введите данные в формате: rowId1,comment1;rowId2,comment2");
if (input) {
    const data = input.split(';').map(i => {
        const [id, comment] = i.split(',').map(s => s.trim());
        return { id, comment };
    });

    const findElem = s => document.querySelector(s);
    const findChatBtn = id => findElem(`a[data-row_id="${id}"]`);
    const findExcludeBtn = btn => btn.closest('div')?.querySelector('.move-to-prev-step-icon');
    const highlight = elem => {
        elem.style.border = '2px solid red';
        elem.style.backgroundColor = 'yellow';
    };

    const insertComment = (btn, comment) => {
        btn.click();
        setTimeout(() => {
            const inputBox = findElem('textarea.w-100.comment_textarea');
            if (inputBox) {
                inputBox.value = comment;
                inputBox.dispatchEvent(new Event('input'));
                const sendBtn = findElem('button.m-transparent-btn');
                if (sendBtn) {
                    sendBtn.click();
                    setTimeout(() => {
                        findElem('a.comments-close')?.click();
                        findExcludeBtn(btn)?.click();
                        highlight(btn.closest('div'));
                        processNext();
                    }, 500);
                }
            }
        }, 1000);
    };

    let index = 0;
    const processNext = () => {
        if (index < data.length) {
            const { id, comment } = data[index++];
            const chatBtn = findChatBtn(id);
            if (chatBtn) insertComment(chatBtn, comment);
        }
    };

    processNext();
}
