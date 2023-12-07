import React from 'react';
import ReviewCard from '../shared/ReviewCard';
import { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { shelterCommentAPIService } from '../../services/commentAPIService'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateShelterReview from './CreateShelterReview';

const PAGE_SIZE = 3

const ShelterReviews = ({id}) => {
    const [page, setPage] = useState(1)

    const [results, setResults] = useState([])

    const [count, setCount] = useState(0)

    const [active, setActive] = useState(1)

    const API = shelterCommentAPIService()

    useEffect(() => {
        API.getShelterCommentList(id, active, PAGE_SIZE).then(ret => {
            console.log("Hi")
            if (ret.success) {
                setResults(ret.data.results)
                setCount(ret.data.count)
                
            }
        })

    }, [active])

    console.log(results)
    console.log(active)
    
    let items = [];
    for (let number = 1; number <= (count + PAGE_SIZE - 1) / PAGE_SIZE; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => onPageClick(number)}>
            {number}
            </Pagination.Item>,
        );
    }

    const onPageClick = async (page) => {
        setActive(page)
    }

    if (count === 0) {
        return (
            <p className="text-center">This shelter has no reviews yet.</p>
        );

    }


    return (
        <>
            {results.map((x, i) => {return <ReviewCard key={i} data={x}/>})}
            <div className="col-12 d-flex justify-content-center mt-3 px-2 px-xl-4 py-2 py-sm-0">
                <Pagination>
                    <Pagination.First onClick={() => onPageClick(1)}/>
                    {items}
                    <Pagination.Last onClick={() => onPageClick(count)}/>
                </Pagination>
            </div>
            <CreateShelterReview id={id}/>
        </>
    );
};

export default ShelterReviews;