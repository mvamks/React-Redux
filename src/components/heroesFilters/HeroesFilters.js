import { useDispatch, useSelector } from "react-redux";
import { useHttp } from  '../../hooks/http.hook';
import { useEffect, useCallback } from "react";
import { activeFilterChanged } from "./heroesFiltersSlice";
import { fetchFilters } from "../../actions";

import './heroesFilters.scss';
import classNames from "classnames";




// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


//useDispatch — хук для отправки действий (actions) в Redux.
// useSelector хук для получения состояния из Redux.
//dispatch — позволяет отправлять действия.
//request — функция для отправки HTTP-запросов.
//filters, filtersLoadingStatus, activeFilter — извлекаются из Redux-состояния.
//useEffect — загрузка фильтров при монтировании компонента


const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const filters = useSelector(state => state.filters.filters ?? []);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
    const activeFilter = useSelector(state => state.filters.activeFilter);

    useEffect(() => {
        dispatch(fetchFilters(request));
        // eslint-disable-next-line
    }, []); 

    // Обработчик изменения фильтра
    const handleFilterChange = useCallback((name) => {
        dispatch(activeFilterChanged(name));
    }, [dispatch]);


    if (filtersLoadingStatus === 'loading') {
    return <h5 className="text-center mt-5">Загрузка фильтров...</h5>;
    }
    if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5 text-danger">Ошибка загрузки фильтров</h5>;
    }
    

    const renderButtons = (arr) => {
        if(arr.length === 0) {
            return <h5 className="text-center" >Нет фильтров</h5>
        }

        return arr.map(({name, className, label}) => { //filter
            const btnClass = classNames('btn',  className, { 
                'active' : name === activeFilter  
            });

            return (
                <button 
                    key={name}
                    id={name}
                    className={btnClass}  
                    onClick={() => handleFilterChange(name)}
                    >
                    {label}
                </button>
            )
        });
    };

    //const capitize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
     const elements = renderButtons(filters);
     console.log('elements:', elements );
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;