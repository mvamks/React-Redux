//import {useHttp} from '../../hooks/http.hook';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchHeroes, selectAll } from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRef } from 'react';
import './heroesList.scss';
import {FadeLoader} from 'react-spinners';
//import Spinner from '../spinner/Spinner';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE
//const selectHeroes = state => state.heroes.heroes;
const selectActiveFilter  = state => state.filters.activeFilter;

const selectFiltredHeroes = createSelector(
    [selectAll, selectActiveFilter],
    (heroes, activeFilter) => {
        if (activeFilter === 'all') {
            return heroes;
        }
        return heroes.filter(hero => hero.element === activeFilter);
    }       
);

const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const filtredHeroes = useSelector(selectFiltredHeroes);
    const dispatch = useDispatch();
    //const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

     // ФИЛЬТРАЦИЯ по активному фильтру
     
     /* const filtredHeroes = activeFilter === 'all'
        ? heroes
        : heroes.filter(hero => hero.element === activeFilter); */ // поле element в JSON


    if (heroesLoadingStatus === "loading") {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                 <FadeLoader color="#36d7b7"/>
            </div>
       );
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return (
            <TransitionGroup component='ul' appear>
                {arr.map(({id, ...props}) => {
                    const nodeRef = React.createRef();
                    return (
                        <CSSTransition 
                            key={id}
                            timeout={700} 
                            classNames='hero' 
                            nodeRef={nodeRef}
                            >
                            <HeroesListItem ref={nodeRef} id={id} {...props} />  
                        </CSSTransition>
                    )       
               })}
            </TransitionGroup>  
        );  
    }

    const elements = renderHeroesList(filtredHeroes); // Подаём ОТФИЛЬТРОВАННЫХ героев
    return elements;
}


export default HeroesList;