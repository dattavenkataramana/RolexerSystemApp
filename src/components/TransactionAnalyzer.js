import React, { useState, useEffect } from 'react';

import './TransactionAnalyzer.css';
import TransactionTable from './TransactionTable';
import TransactionStatistics from './TransactionStatistics';
import TransactionChart from './TransactionChart';
import { getTransactions, getStatisticsData } from '../service';

const TransactionAnalyzer = () => {

    const [selectedMonth, setSelectedMonth] = useState(3);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactions = await getTransactions(selectedMonth, searchText, currentPage);
                setTransactionData(transactions);

            } catch (error) {
                console.log("error: ", error);
            }
        };

        fetchTransactions();
    }, [selectedMonth, searchText, currentPage]);
    useEffect(() => {
        console.log("transactionData", transactionData);
    }, [transactionData]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        console.log(selectedMonth);
        setCurrentPage(1);//default 1
    }
    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchText(event.target.value);
        setCurrentPage(1);//reset page when search changes
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }
    const handlePerPageChange = () => {

    }

    return (
        <>
            <div className="container">
                <h1>Transaction Analyzer</h1>
                <div className="input-container">
                    <label htmlFor="search">Search:</label>
                    <input type="text" id="search" value={searchText} onChange={handleSearchChange} placeholder='Search Transactions'></input>

                    <label htmlFor="month">Select Month:</label>
                    <select id="month" value={selectedMonth} onChange={handleMonthChange} >
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                    </select>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Sold</th>
                                <th>Image</th>

                            </tr>
                        </thead>
                        <tbody>
                            {transactionData.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.price}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.sold}</td>
                                    <td>{transaction.image}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table></div>
                <div className="pagination">
                    <span>Page no: {currentPage}</span>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {/* not used disabled if no further record present to show previous/next is working. as db deos not contain more than 10 records for any month */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        {/* <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(transactionData.length / 10)}
          ></button> */}
                        Next
                    </button>
                    <span>Page no: {10}</span>

                </div>
            </div>
        </>
    )
};

export default TransactionAnalyzer;