import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Select from 'react-select';
import RecordCard from "./record-card.component";

export default class ViewRecordsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.displayRecordThread = this.displayRecordThread.bind(this);
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
        // console.log(this.state.records);
        // this.state.records.map(record =>
        //     console.log(record.content)
        // )
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    getRecords() {
        const { searchTitle, page, pageSize } = this.state;
        //console.log(searchTitle, page, pageSize);

        RecordService.getAll(page, pageSize, searchTitle, null)
            .then((response) => {
                const { records, totalPages } = response.data;
                this.refreshList();

                this.setState({
                    records: records,
                    count: totalPages,
                });
            })
            .catch((e) => {
                console.log(e);
            });
        // console.log(this.state.records)
    }

    refreshList() {
        this.setState({
            records: [],
            count: -1,
        });
    }

    displayRecordThread(record, index) {
        // this.setState({
        //     currentRecord: record,
        //     currentIndex: index,
        // });
        this.props.history.push({
            pathname: '/records/thread/' + record.id,
            state: { recordId: record.id }
        });
        window.location.reload();
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
            page,
            count,
        } = this.state;

        return (
            <div className="list row">
                <div className="col-sm-9">
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


                    <div className="mt-3">
                        <div className="row">
                            <div style={{marginLeft: "17px"}}>{"Количество постов на странице: "}</div>
                            <Select className="col-2"
                                    onChange={this.handlePageSizeChange}
                                    options={this.pageSizes}
                                    autoFocus={true}
                                    defaultValue={this.pageSizes[2]}
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
                        {this.state.records &&
                        this.state.records.map((record, index) => (
                            <li
                                style={{listStyleType: "none"}}
                                key={index}
                                onClick={() => this.displayRecordThread(record, index)}
                            >
                                <RecordCard record={record} isPreview={true} isReply={false}/>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-sm-2">
                    <Link to={"/records/create"} className="nav-link card-link-custom color-orange">
                        Создать пост
                    </Link>
                    {/*<Link to={"/profile"} className="nav-link card-link-custom color-orange">*/}
                    {/*    Мои посты*/}
                    {/*</Link>*/}
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