import React, { useState } from "react";
import c from './../users.module.css';
import angleRight from './../../../images/navigationsIcons/angle-right.svg';
import angleLeft from './../../../images/navigationsIcons/angle-left.svg';
import { useEffect } from "react";

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 5 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };
    let portionCount = Math.ceil(pagesCount / portionSize); // количество порций
    let [portionNumber, setPortionNumber] = useState(1); // номер порции
    let rightPortionPageNumber = portionNumber * portionSize; // стр на правой границе порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // стр на левой границе порции
    /* if (rightPortionPageNumber > pages[-1]) {
        console.log('!!!!')
        leftPortionPageNumber = 1;
        rightPortionPageNumber = portionSize;
        setPortionNumber(1);
    } */
    useEffect( () => {
        setPortionNumber(1);
    }, [totalItemsCount]);

    const showNextPortion = () => {
        setPortionNumber(portionNumber + 1);
        onPageChanged(rightPortionPageNumber + 1);
    };
    const showPrevPortion = () => {
        setPortionNumber(portionNumber - 1);
        onPageChanged(leftPortionPageNumber - 1);
    };
    return <div className={c.pageNumbers} >
        <div>
            {portionNumber > 1 && <button className={c.buttons} onClick={showPrevPortion}>
                <img src={angleLeft} className={c.angleLeft} />
                </button>}
        </div>

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber ).map((p) => {
            return <span key={p} className={currentPage === p ? c.selectedPage : c.commonPage}
                onClick={() => onPageChanged(p)} > {p} </span>
            })
        }

        <div>
            {portionNumber < portionCount && <button className={c.buttons} onClick={showNextPortion}>
                <img src={angleRight} className={c.angleRight} />
                </button>}
        </div>
    </div>
};

export default Paginator;