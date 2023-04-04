import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import 'tippy.js/dist/tippy.css';
import { useEffect, useRef, useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import ResultSearchItem from '~/components/ResultSearchItem';
import './Search.scss';
import { useDebounce } from '~/hooks';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { ProductApi } from '~/api';

function Search({ handleOpenOffcanvas }) {
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchRef = useRef();
    const searchResultRef = useRef();
    const searchInputRef = useRef();

    const debounced = useDebounce(input, 500);

    const navigate = useNavigate();
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResults([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            // const result = await searchService.search(debounced);
            const result = await ProductApi.getAll({
                query: debounced,
                pageIndex: 1,
                pageSize: 12,
                totalRow: 0,
                sort: 0,
                products: [],
                brandId: 0,
                categoryId: 0,
                seriesId: 0,
                minPrice: 0,
                maxPrice: 0,
            });
            setSearchResults(result.products);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    useEffect(() => {
        if (searchResults) {
            if (visible && searchResults.length > 0) {
                searchResultRef.current.classList.remove('d-none');
            } else {
                searchResultRef.current.classList.add('d-none');
            }
        }
    }, [visible, searchResults]);

    useEffect(() => {
        let handleMousedown = (e) => {
            if (searchRef) {
                if (!searchRef.current.contains(e.target)) {
                    setVisible(false);
                }
            }
        };

        document.addEventListener('mousedown', handleMousedown);

        return () => {
            document.removeEventListener('mousedown', handleMousedown);
        };
    });

    const handleSetInput = (e) => {
        if (e.target.value[0] === ' ') {
            return;
        }

        setInput(e.target.value);
        setVisible(true);
    };
    const handleClearInput = () => {
        setInput('');
        searchInputRef.current.focus();
    };

    const handleSearch = (e) => {
        if (input.trim() !== '') {
            handleOpenOffcanvas();
            navigate(`/product?${createSearchParams({ q: input })}`);

            setVisible(false);
            searchResultRef.current.scrollIntoView();
        }
    };

    const handleClickItem = () => {
        handleClearInput();
        handleOpenOffcanvas();
        setVisible(false);
    };

    const handleEnterSearch = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <Container
            fluid
            className=" d-flex align-items-center justify-content-center search__container"
            ref={searchRef}
        >
            <Row>
                <Col sx={12} className="p-0 mx-2 search">
                    <input
                        ref={searchInputRef}
                        onFocus={() => setVisible(true)}
                        className="search__input"
                        placeholder="Search Music..."
                        spellCheck={false}
                        value={input}
                        onChange={handleSetInput}
                        onKeyDown={handleEnterSearch}
                    />
                    {!!input && !loading && (
                        <button className="clear__input" onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon icon={faSpinner} className="loading" />}
                    <button className="search__button" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </Col>
                <div className="search__result d-none p-0" tabIndex="-1" ref={searchResultRef}>
                    <PopperWrapper>
                        <h4 className="result__title">Result</h4>
                        <div className="result-item" onClick={() => handleClickItem()}>
                            {searchResults &&
                                searchResults.map((searchResult, idx) => (
                                    <ResultSearchItem key={idx} searchResult={searchResult} />
                                ))}
                        </div>
                    </PopperWrapper>
                </div>
            </Row>
        </Container>
    );
}

export default Search;
