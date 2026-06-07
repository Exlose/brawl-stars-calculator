import React, { useState, useRef, useEffect } from 'react';

let activesd = 'РЕЖИМ';

function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    switch (props.currentMode) {
        case 'solosd':
            activesd = 'СОЛО';
            break;
        case 'duosd':
            activesd = 'ПАРНОЕ';
            break;
        case 'triosd':
            activesd = 'ТРОЙНОЕ';
            break;
        case 'trio':
            activesd = 'РЕЖИМ';
            break;
    };

    useEffect(() => {
  // 1. Создаем функцию, которая будет срабатывать при ЛЮБОМ клике на странице
        const handleClickOutside = (event) => {
            // 2. Проверяем: если ссылка привязана к элементу И этот элемент НЕ содержит в себе место клика (event.target)
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false); // Закрываем меню!
            }
        };

        // 3. Вешаем этот слушатель на весь документ браузера
        document.addEventListener('mousedown', handleClickOutside);

        // 4. Обязательно убираем за собой слушать, если компонент исчезнет (правило хорошего тона)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modegame">
            <button className={`mode tm ${props.currentMode === 'trio' ? 'select' : ''}`} id="triomode" onClick={(e) => {
                props.changeMode('trio');
                const button = e.currentTarget;
                button.classList.remove('anim');
                void button.offsetWidth;
                button.classList.add('anim');
                }}>👥 ТРИО</button>
            <button className={`mode tm ${props.currentMode !== 'trio' ? 'select' : ''}`} id="dropBtn" onClick={(e) => {
                setIsOpen(!isOpen);
                const button = e.currentTarget;
                button.classList.remove('anim');
                void button.offsetWidth;
                button.classList.add('anim');
                }}>
                <span className="main_text">🌵 ШД(1 МЕСТО)</span>
                <span className="sub-text">{activesd}</span>
            </button>
            <ul ref={menuRef} className={`dropdown-menu ${isOpen ? 'open' : ''}`} id="dropMenu" onClick={() => setIsOpen(false)}>
                <li className="dropdown-item" data-mode="solosd" onClick={
                    (e) => {props.changeMode('solosd');
                    const button = e.currentTarget;
                    button.classList.remove('anim');
                    void button.offsetWidth;
                    button.classList.add('anim');
                    }}>Одиночное</li>
                <li className="dropdown-item" data-mode="duosd" onClick={(e) => {
                    props.changeMode('duosd');
                    const button = e.currentTarget;
                    button.classList.remove('anim');
                    void button.offsetWidth;
                    button.classList.add('anim');
                    }}>Парное</li>
                <li className="dropdown-item" data-mode="triosd" onClick={(e) => {
                    props.changeMode('triosd');
                    const button = e.currentTarget;
                    button.classList.remove('anim');
                    void button.offsetWidth;
                    button.classList.add('anim');
                    }}>Тройное</li>
            </ul>
      </div>
    );
};

export default Dropdown