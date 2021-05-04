import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Select from 'react-select';

export default class ViewRecordsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRecord = this.setActiveRecord.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
            records: [],
            currentRecord: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 10,
        };

        this.pageSizes = [{value: 2, label: '2'}, {value: 4, label :'4'}, {value: 10, label: '10'}];
    }

    componentDidMount() {
        this.getRecords();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    getRecords() {
        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);

        RecordService.getAll(page - 1, pageSize, searchTitle, null)
            .then((response) => {
                const { records, totalPages } = response.data;

                this.setState({
                    records: records,
                    count: totalPages,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.getRecords();
        this.setState({
            currentRecord: null,
            currentIndex: -1,
        });
    }

    setActiveRecord(record, index) {
        this.setState({
            currentRecord: record,
            currentIndex: index,
        });
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.getRecords();
            }
        );
    }

    handlePageSizeChange(selectedItem) {
        this.setState(
            {
                pageSize: selectedItem.value,
                page: 1
            },
            () => {
                this.getRecords();
            }
        );
    }

    render() {
        const {
            searchTitle,
            records,
            currentRecord,
            currentIndex,
            page,
            count,
            pageSize,
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите часть заголовка"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.getRecords}
                            >
                                Найти
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список постов</h4>

                    <div className="mt-3">
                        <div className="row">
                            <div>{"Количество постов на странице: "}</div>
                            <Select className="col-2"
                                    onChange={this.handlePageSizeChange}
                                    options={this.pageSizes}
                                    autoFocus={true}
                                    defaultValue={this.pageSizes[1]}
                                    styles={stylesForSmallSelectBox}
                            />
                        </div>

                        <Pagination
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                        />
                    </div>

                    <ul className="list-group">
                        {records &&
                        records.map((record, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveRecord(record, index)}
                                key={index}
                            >
                                {record.title}
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentRecord ? (
                        <div>
                            <h4>Record</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentRecord.title}
                            </div>

                            <Link
                                to={"/records/" + currentRecord.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Record...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const stylesForSmallSelectBox = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
};