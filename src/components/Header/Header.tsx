// Імпортуємо необхідні залежності
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';

import css from './Header.module.css';
import imdb_logo from '../../images/PNG/imdb_logo.png';
import menu_icon from '../../images/SVG/menu_icon.svg';
import clear_icon from '../../images/SVG/clear_icon.svg'
import search_icon from '../../images/SVG/search_icon.svg';

// Описуємо компоненту Header
const Header: FC = () => {
    // Стан, що визначає, відкритий чи закритий список меню
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    // Стан для зберігання тексту пошуку
    const [searchText, setSearchText] = useState<string>('');

    // Посилання на елемент списку меню
    const menuRef = useRef<HTMLDivElement>(null);

    // Посилання на елемент з іконкою меню
    const menuIconRef = useRef<HTMLImageElement>(null);


    // Ефект, який додає прослуховувач подій для закриття списку меню
    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            // Перевіряємо, чи клікнули поза елементами списку та іконкою меню
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                menuIconRef.current &&
                !menuIconRef.current.contains(event.target as Node)
            ) {
                // Закриваємо меню
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);

    // Обробник кліку на іконку меню
    const handleMenuImageClick = useCallback(() => {
        // Змінюємо стан, відкриваючи або закриваючи меню
        setMenuOpen(prevState => !prevState);
    }, []);

    // Обробник зміни тексту у полі пошуку
    const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // Отримуємо та зберігаємо введений текст у стані компонента
        setSearchText(e.target.value);
    }, []);

    const handleClearSearchText = useCallback(() => {
        setSearchText('');
    }, []);


    // Повертаємо JSX компоненту
    return (
        <div className={css.header}>
            {/* Логотип */}
            <img className={css.imdb_logo} src={imdb_logo} alt="imdb_logo"/>

            {/* Іконка меню, додаємо клас "active" якщо меню відкрите */}
            <div className={css.menu_block}>
                <img
                    ref={menuIconRef}
                    className={`${css.menu_icon} ${menuOpen ? css.active : ''}`}
                    src={menu_icon}
                    alt="menu_logo"
                    onClick={handleMenuImageClick}
                />
                <p>Меню</p>
            </div>

            {/* Список меню, додаємо клас "active" якщо меню відкрите */}
            <div ref={menuRef} className={`${css.menu} ${menuOpen ? css.active : ''}`}>
                <span>as</span>
                <span>as</span>
            </div>

            <div className={css.search_block}>
                <input
                    type="text"
                    placeholder="Search Movie"
                    className={css.search_input}
                    value={searchText}
                    onChange={handleSearchInputChange}
                />
                <div className={css.clear_button} onClick={handleClearSearchText}>
                    <img src={clear_icon} alt="clear_icon"/>
                </div>
                <button className={css.search_button} role="button">
                <img className={css.search_icon} src={search_icon} alt="search_square"/>
                </button>
            </div>

        </div>
    );
};

export {Header};
