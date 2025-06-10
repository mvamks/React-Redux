import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useRef } from 'react';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './heroesList.scss';
import {FadeLoader} from 'react-spinners';
//import Spinner from '../spinner/Spinner';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const heroes = useSelector(state => state.heroes);
    const  heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const activeFilter  = useSelector(state => state.activeFilter);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

     // ФИЛЬТРАЦИЯ по активному фильтру
     const filtredHeroes = activeFilter === 'all'
        ? heroes
        : heroes.filter(hero => hero.element === activeFilter); // поле element в JSON


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
                {arr.map(({id, ...props}) => (
                    <CSSTransition key={id} 
                                   timeout={700} 
                                   classNames='hero' 
                                   onEnter={() => console.log('Анимация начала появление')}
                                   onExited={() => console.log('Анимация завершила исчезновение')} >
                        <HeroesListItem key={id} id={id} {...props}/>
                    </CSSTransition>
               ))}
            </TransitionGroup>  
        );  
    }

    const elements = renderHeroesList(filtredHeroes); // Подаём ОТФИЛЬТРОВАННЫХ героев
    return elements;
}

export default HeroesList;