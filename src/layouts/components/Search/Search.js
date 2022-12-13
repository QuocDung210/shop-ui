import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import 'tippy.js/dist/tippy.css';
import { useEffect, useRef, useState } from 'react';

// import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ResultSearchItem from '~/components/ResultSearchItem';
import './Search.scss';
import { useDebounce } from '~/hooks';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '~/services/searchService';

function Search() {
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const searchR = useSelector((state) => state.search.search.searchRes);
    const pending = useSelector((state) => state.search.search.isFetching);

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
        // const fetchApi = async () => {
        //     setLoading(true);
        //     const result = await searchService.search(debounced);
        //     setSearchResults(result);
        //     setLoading(false);
        // };

        // fetchApi();
        search(debounced, dispatch);
    }, [debounced]);

    useEffect(() => {
        if (searchR) {
            if (visible && searchR.length > 0) {
                searchResultRef.current.classList.remove('d-none');
            } else {
                searchResultRef.current.classList.add('d-none');
            }
        }
    }, [visible, searchR]);

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
        setVisible(false);
        searchResultRef.current.scrollIntoView();
        if (input.trim() !== '') {
            navigate(`/search/${input}`);
        }
    };

    const handleClickItem = () => {
        handleClearInput();
        setVisible(false);
    };

    const handleEnterSearch = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            if (input.trim() !== '') {
                navigate(`/search/${input}`);
                setVisible(false);
                searchResultRef.current.scrollIntoView();
            }
        }
    };

    return (
        <Container
            fluid
            className="p-0 d-flex align-items-center justify-content-center search__container"
            ref={searchRef}
        >
            <div className="w-100 d-none d-lg-block">
                <Col sx={12} className="p-0 search">
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
                    {!!input && !pending && (
                        <button className="clear__input" onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {pending && <FontAwesomeIcon icon={faSpinner} className="loading" />}
                    <button className="search__button" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </Col>
                <div className="search__result d-none" tabIndex="-1" ref={searchResultRef}>
                    <PopperWrapper>
                        <h4 className="result__title">Result</h4>
                        <div className="result-item" onClick={() => handleClickItem()}>
                            {searchR &&
                                searchR.map((searchResult) => (
                                    <ResultSearchItem key={searchResult.id} searchResult={searchResult} />
                                ))}
                        </div>
                    </PopperWrapper>
                </div>
            </div>
            <div className="d-block d-lg-none w-100">
                <Col xs={12}>
                    <Form className="d-flex search-form">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={input}
                            onChange={handleSetInput}
                            onKeyDown={handleEnterSearch}
                        />
                        <Button variant="outline-success" onClick={handleSearch}>
                            Search
                        </Button>
                    </Form>
                </Col>
            </div>
        </Container>
    );
}

export default Search;
