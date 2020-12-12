import MainWrapper from "@components/MainWrapper"

import Container from "react-bootstrap/Container"
import FormControl from "react-bootstrap/FormControl"

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory from "react-bootstrap-table2-paginator";


const columns = [
    {
        dataField: 'code',
        text: 'Код',
    },
    {
        dataField: 'title',
        text: 'Продукт',
    },

    {
        dataField: 'currency',
        text: 'Валюта',
    },
    {
        dataField: 'price',
        text: 'Цена',
    }
]
const data=[
    {
        "code": "4601546109996",
        "title": "1С:Предприятие 8.3. Версия для обучения программированию.",
        "currency": "руб.",
        "price": "1200"
    },
    {
        "code": "2900002166477",
        "title": "1С:Предприятие 8. Комплект для обучения в высших и средних учебных заведениях Узбекистана. Электронная поставка",
        "currency": "USD",
        "price": "190"
    },
    {
        "code": "4601546109996",
        "title": "1С:Предприятие 8.3. Версия для обучения программированию.",
        "currency": "руб.",
        "price": "1200"
    },
    {
        "code": "4601546083876",
        "title": "1С:Электронное обучение. Корпоративный университет. NFR",
        "currency": "руб."
    },
    {
        "code": "2900002003901",
        "title": "1С:Электронное обучение. Корпоративный университет. NFR. Электронная поставка",
        "currency": "руб."
    },
    {
        "code": "2900002137521",
        "title": "1С:Электронное обучение. Экзаменатор. NFR. Электронная поставка",
        "currency": "руб."
    },
    {
        "code": "4601546097651",
        "title": "1С:Электронное обучение. Экзаменатор. NFR",
        "currency": "руб."
    },
    {
        "code": "2900002164008",
        "title": "1С:Электронное обучение. Веб-кабинет преподавателя и студента. NFR. Электронная поставка",
        "currency": "руб."
    },
    {
        "code": "2900001696616",
        "title": "1С:Электронное обучение. Веб-кабинет преподавателя и студента. NFR",
        "currency": "руб."
    },
    {
        "code": "2900002137415",
        "title": "1С:Предприятие 8. Комплект для обучения в высших и средних учебных заведениях. Электронная поставка",
        "currency": "руб."
    }
]

const { SearchBar } = Search;

const Products = () => {
    const router = useRouter()
    return (
        <>
            <NextSeo
                title={"Ависта 1С Образовательные программы"}
                description={"ООО Ависта, 1С Образовательные программы"}
                canonical={process.env.HOST_PRODUCTION_URL}
                url={`${process.env.HOST_PRODUCTION_URL}${router.pathname}`}
                openGraph={{
                    locale: "ru_RU",
                    article: {
                        tags: ["Ависта", "1С", "Продукция", "Товары"]
                    }
                }}
            />
            <MainWrapper>
                <Container className={"py-5"}>
                    <ToolkitProvider
                        keyField="id"
                        data={ data }
                        columns={ columns }
                        search
                    >
                        {
                            props => (
                                <div>
                                    <h3>Образовательные программные продукты фирмы 1С:</h3>
                                    <MySearch { ...props.searchProps } />
                                    <hr />
                                    <BootstrapTable
                                        { ...props.baseProps }
                                        pagination={ paginationFactory() }
                                    />

                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Container>
            </MainWrapper>
        </>
    )
}

const MySearch = (props) => {
    let input;
    return (
        <div className={"py-2"}>
            <FormControl
                className="form-control"
                ref={ n => input = n }
                type="text"
                placeholder={"Поиск"}
                onChange={() => props.onSearch(input.value)}
            />
        </div>
    );
};

export default Products