(function() {
    const input = prompt("Введите данные в формате: rowId1,comment1;rowId2,comment2");
    
    if (input) {
        const data = input.split(';').map(item => {
            const [id, comment] = item.split(',').map(s => s.trim());
            return { id, comment };
        });

        const findElem = selector => document.querySelector(selector);
        const findChatBtn = id => findElem(`[data-row_id="${id}"]`); // Убедитесь, что селектор актуален
        const findExcludeBtn = btn => btn.closest('div')?.querySelector('.move-to-prev-step-icon'); // Проверьте, есть ли этот класс

        const highlight = elem => {
            elem.style.border = '2px solid red';
            elem.style.backgroundColor = 'yellow';
        };

        const changeMarker = id => {
            const rowElem = findChatBtn(id);
            
            if (rowElem) {
                const markerBtn = rowElem.closest('.tr')?.querySelector('btn app-canban-card-item__marker');
                
                if (markerBtn) {
                    markerBtn.click();
                    setTimeout(() => {
                        const markerDropdown = findElem('.marker-list-select .multiselect__select'); // Убедитесь в актуальности селектора
                        
                        if (markerDropdown) {
                            markerDropdown.click();
                            setTimeout(() => {
                                const agreeOption = [...document.querySelectorAll('.multiselect__option')]
                                    .find(option => option.textContent.includes('Согласование'));
                                
                                if (agreeOption) {
                                    agreeOption.click();
                                    setTimeout(() => {
                                        const confirmBtn = findElem('button.button-primary'); // Проверьте актуальность кнопки
                                        
                                        if (confirmBtn) {
                                            confirmBtn.click();
                                            
                                            setTimeout(() => {
                                                findExcludeBtn(rowElem)?.click();
                                                setTimeout(confirmAction, 1500);
                                            }, 1500);
                                            
                                            setTimeout(processNext, 3000);
                                        } else {
                                            console.error('Кнопка "Подтвердить" не найдена');
                                        }
                                    }, 1500);
                                } else {
                                    console.error('Опция "Согласование" не найдена');
                                }
                            }, 1500);
                        } else {
                            console.error('Выпадающий список маркеров не найден');
                        }
                    }, 1500);
                } else {
                    console.error('Кнопка маркера не найдена');
                }
            } else {
                console.error('Элемент строки не найден');
            }
        };

        const insertComment = (btn, comment) => {
            btn.click();
            setTimeout(() => {
                const inputBox = findElem('textarea.comment_textarea');
                
                if (inputBox) {
                    inputBox.value = comment;
                    inputBox.dispatchEvent(new Event('input', { bubbles: true })); // Имитация ручного ввода
                    const sendBtn = findElem('button.m-transparent-btn');
                    
                    if (sendBtn) {
                        sendBtn.click();
                        setTimeout(() => {
                            findElem('a.comments-close')?.click();
                            changeMarker(btn.dataset.row_id);
                            highlight(btn.closest('div'));
                        }, 2000);
                    } else {
                        console.error('Кнопка отправки комментария не найдена');
                    }
                } else {
                    console.error('Поле комментария не найдено');
                }
            }, 2000);
        };

        const confirmAction = () => {
            const confirmBtn = document.querySelector('button.btn-primary.btn-lg');

            if (confirmBtn) {
                confirmBtn.click();
                console.log('Кнопка "Подтвердить" нажата');
            } else {
                console.error('Кнопка "Подтвердить" не найдена');
            }
        };

        let index = 0;

        const processNext = () => {
            if (index < data.length) {
                const { id, comment } = data[index++];
                const chatBtn = findChatBtn(id);
                
                if (chatBtn) {
                    insertComment(chatBtn, comment);
                } else {
                    console.error(`Не найдена кнопка чата для ID ${id}`);
                }
            }
        };

        processNext();
    }
})();
