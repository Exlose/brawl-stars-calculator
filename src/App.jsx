import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';

const trio_table = [[0, 1999, 10], [2000, 2499, 8], [2500, 2799, 6], [2800, 2999, 4], [3000, 3099, 2]];
const solo_sd_table = [[0, 1999, 13], [2000, 2499, 10], [2500, 2799, 8], [2800, 2999, 5], [3000, 3099, 4], [3100, 3999, 3]];
const duo_sd_table = [[0, 1999, 12], [2000, 2499, 10], [2500, 2799, 7], [2800, 2999, 5]];
const trio_sd_table = [[0, 1999, 12], [2000, 2499, 10], [2500, 2799, 7], [2800, 2999, 5], [3000, 3099, 3]];

function App() {
  const [mode, setmode] = useState('trio');
  const [modecalc, setmodecalc] = useState('streak');
  const [targetinput, settargetinput] = useState('Желаемая серия побед:');
  const [input_trophies, settrophies] = useState(null);
  const [wins, setwins] = useState(null);
  const [targettrophies, settargettrophies] = useState(null);
  const [alreadywins, setalreadywins] = useState(null);
  const [winrateinput, setwinrateinput] = useState(null);
  const [rt, setrt] = useState(0);
  const [bt, setbt] = useState(0);
  let active_table = 'trio';

  const [rtv, setrtv] = useState('Итого кубков:');

  function raschstreak() {
    let b = 2;
    let b_value = 0;
    let trophies = input_trophies;
    let kubwinstreak = 0;

    if (isNaN(alreadywins) || alreadywins === null) {setalreadywins(0);};

    switch (mode) {
        case 'trio':
            active_table = trio_table;
            b = 1;
            break;
        case 'solosd':
            active_table = solo_sd_table;
            b = 2;
            break;
        case 'duosd':
            active_table = duo_sd_table;
            b = 2;
            break;
        case 'triosd':
            active_table = trio_sd_table;
            b = 2;
            break;
    };

    for (let i = alreadywins; i < wins; i++) {
        let winstreak = i + 1;

        for (const [min, max, kub] of active_table) {
            if (min <= trophies && trophies <= max) {
                b = kub;
                break;
            };
        };

        if (trophies < 2000) {
            if (winstreak <= 10) {
                b_value = winstreak - 1; 
            } else {
                b_value = 10;
            };
        };

        trophies += b;
        trophies += b_value;
        kubwinstreak += b_value;
    };

    setrt(trophies);
    setbt(kubwinstreak);
  };

  function raschtarget() {
    let b = 2;
    let b_value = 0;
    let trophies = input_trophies;
    let kubwinstreak = 0;
    let tt = targettrophies;
    let ngame = 0;
    let winrate = 100;
    
    if (isNaN(alreadywins) || alreadywins === null) {setalreadywins(0);};
    let winstreak = alreadywins;

    switch (mode) {
        case 'trio':
            active_table = trio_table;
            b = 1;
            break;
        case 'solosd':
            active_table = solo_sd_table;
            b = 2;
            break;
        case 'duosd':
            active_table = duo_sd_table;
            b = 2;
            break;
        case 'triosd':
            active_table = trio_sd_table;
            b = 2;
            break;
    };

    if (winrateinput === null || winrateinput === 0) {
        winrate = 100;
    } else {
        winrate = winrateinput;
    };

    while (trophies < targettrophies) {
        winstreak += 1;
        let worl = Math.floor(Math.random() * 100 + 1);

        if (worl <= winrate) {
            for (const [min, max, kub] of active_table) {
                if (min <= trophies && trophies <= max) {
                    b = kub;
                    break;
                };
            };

            if (trophies < 2000) {
                if (winstreak <= 10) {
                    b_value = winstreak - 1; 
                } else {
                    b_value = 10;
                };
            };

            trophies += b;
            trophies += b_value;
            kubwinstreak += b_value;
        } else {
            winstreak = 0;
            if (mode === 'trio') {
                if (trophies >= 8) {
                    trophies -= 8;
                } else {
                    trophies = 0;
                };
            } else {
                if (trophies >= 7) {
                    trophies -= 7;
                } else {
                    trophies = 0;
                };
            };
        }
        ngame += 1;
        if (ngame > 10000) {
            setrt('произошла ошибка');
            break;
        };
    };
    setrt(ngame);
    setbt(kubwinstreak);
  };

  return (
    <div className='body'>
        <Dropdown currentMode={mode} changeMode={setmode} />
        <div className='all_inputs'>
            <div className="main">
                <h1 className='calc'>Калькулятор {modecalc === 'streak' ? 'кубков' : 'игр'}</h1>

                <div className='modecalc'>
                    <button className={`mc tm ${modecalc === 'streak' ? 'select' : ''}`} onClick={(e) => {
                        setmodecalc('streak');
                        settargetinput('Желаемая серия побед:');
                        setrtv('Итого кубков:');
                        setwins('');
                        setalreadywins('');
                        settrophies('');
                    }}>До Х серии 🔥</button>
                    <button className={`mc tm ${modecalc === 'target' ? 'select' : ''}`} onClick={(e) => {
                        setmodecalc('target');
                        settargetinput('Желаемые кубки');
                        setrtv('Итого игр:');
                        settargettrophies('');
                        setalreadywins('');
                        settrophies('');
                    }}>До Х кубков 🏆</button>
                </div>

                <h3 className="podin">Стартовые кубки:</h3>
                <input className="input" type="number" value={input_trophies || ''} onChange={(e) => settrophies(Number(e.target.value))}></input>

                <h3 className="podin">{targetinput}</h3>
                <input className="input" type="number" value={modecalc === 'streak' ? wins || '' : targettrophies || ''} onChange={(e) => {
                    const value = Number(e.target.value);
                    if (modecalc === 'streak') {
                        setwins(value);
                    } else {
                        settargettrophies(value);
                    };
                }}></input>

                <button className="rasch" onClick={(e) => {
                    if (modecalc === 'streak') {
                        raschstreak();
                    } else {
                        raschtarget();
                    };
                    const button = e.currentTarget;
                    button.classList.remove('anim');
                    void button.offsetWidth;
                    button.classList.add('anim');
                    }}>РАССЧИТАТЬ</button>

                <div className="result"> 
                    <div className="rt">
                        <h3 className="rbt">{rtv}</h3>
                        <h2 className="rbt">{rt}</h2>
                    </div>
                    <div className="bt">
                        <h3 className="rbt">Бонус серии:</h3>
                        <h2 className="rbt">{bt}</h2>
                    </div>
                </div>
            </div>
            <div className='additionaly'>
                <h1 className='calc'>ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ</h1>

                <h3 className="podin">Имеющаяся серия побед:</h3>
                <input className="input" type="number" value={alreadywins || ''} onChange={(e) => setalreadywins(Number(e.target.value))} placeholder='НЕОБЯЗАТЕЛЬНО'></input>

                <h3 className="podin">Ваш винрейт:</h3>
                <h6 className="podin">Итоговое значение может быть неточным, используется только для "до x кубков"</h6>
                <input className="input" type="number" value={winrateinput || ''} onChange={(e) => setwinrateinput(Number(e.target.value))} placeholder='НЕОБЯЗАТЕЛЬНО'></input>
                <h6 className="podin">Если итог 10001 - в расчетах произошла ошибка, повысьте винрейт</h6>
            </div>
        </div>
    </div>
  );
};

export default App