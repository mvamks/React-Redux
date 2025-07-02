 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 import './heroesAddForm.scss';
 import { useDispatch, useSelector } from 'react-redux';
 import { useHttp } from '../../hooks/http.hook';
 import {heroCreated } from '../heroesList/heroesSlice';
 import { selectAllFilters } from '../heroesFilters/heroesFiltersSlice';
 const { v4: uuidv4 } = require('uuid');
 


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters)  || []; // получаем фильтры
    const heroes = useSelector(state => state.heroes.heroes);
    const { request } = useHttp();

    const getValidationSchema  = (heroes) => 
        Yup.object({
            name: Yup.string()
                .min(2, 'Минимум 2 символа для заполнения!')
                .required("Введите имя!")
                .test('unique-name', 'Герой с таким именем уже существует!', function(value) {
                    if(!value) return true; // если поле пустое, пусть валидируется другим правилом
                    const normalized = value.trim().toLowerCase();
                    const nameExists = heroes?.some(hero => hero.name.trim().toLowerCase() === normalized);
                    return !nameExists;
                }),
            text: Yup.string()
                .min(10, 'Не менее 10 символов')
                .required("Введите описание!"),
            element: Yup.string()
                .required("Выберете элемент!")
    });

    const handleSubmit = (values, { resetForm }) => {
         console.log(JSON.stringify(values, null, 2)); 
        const newHero = {
            id: uuidv4(),
            name: values.name,
            description: values.text,
            element: values.element
        };
         // Добавляем в состояние
        dispatch(heroCreated(newHero));

          // Отправляем на сервер
        request("/heroes", "POST", JSON.stringify(newHero))
            .then(() => console.log(`Герой ${values.name} добавлен на сервер !`))
            .catch(err => console.log(err));

        resetForm(); // очистка формы
    }

    const renderFilters = (filters) => {
        if (!filters || filters.length === 0) return <option disabled>Фильтры не найдены</option>;

        return filters
            .filter(f => f.name !== 'all')
            .map(f => <option key={f.name} value={f.name}>{f.label}</option>);
    };


    return (
        <Formik 
            initialValues = {{
                name: '', 
                text: '',
                element: '',  
            }}
            validationSchema = {getValidationSchema(heroes)}   
            onSubmit = { handleSubmit }
            
            >
            <Form className="border p-4 shadow-lg rounded form" noValidate >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage className="error" name='name' component='div' />    
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage className="error" name='text' component='div' />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field as="select" 
                        required
                        className="form-select" 
                        id="element" 
                        name="element"
                        >
                        <option value="">Я владею элементом...</option>
                        {renderFilters(filters)}
                    </Field>
                    <ErrorMessage className="error" name='element' component='div' />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
            
            
        </Formik>
        
    )
}

export default HeroesAddForm;

//https://mvamks.github.io/React-Redux