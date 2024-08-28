javascript:(function(){
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

        const changeMarker = id => {
            const rowElem = findChatBtn(id);
            if (rowElem) {
                const markerBtn = rowElem.closest('div.tr').querySelector('button.app-canban-card-item__marker');
                if (markerBtn) {
                    markerBtn.click();
                    setTimeout(() => {
                        const markerDropdown = findElem('#__BVID__4652___BV_modal_body_ > div > div.row > div.col-12.mt-4.aa > div:nth-child(2) > div.multiselect.marker-list-select.mt-3 > div.multiselect__select');
                        if (markerDropdown) {
                            markerDropdown.click();
                            setTimeout(() => {
                                const agreeOption = [...document.querySelectorAll('.multiselect__option')]
                                    .find(option => option.textContent.includes('Согласование'));
                                if (agreeOption) {
                                    agreeOption.click();
                                    setTimeout(() => {
                                        const confirmBtn = findElem('#__BVID__4652___BV_modal_body_ > div > div:nth-child(2) > div > button');
                                        if (confirmBtn) {
                                            confirmBtn.click();
                                            setTimeout(() => processNext(), 2000);
                                        }
                                    }, 1000);
                                }
                            }, 1000);
                        }
                    }, 1000);
                }
            }
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
                            changeMarker(btn.dataset.row_id);
                            highlight(btn.closest('div'));
                        }, 1000);
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
})();
