import React, { Component } from "react";
import { Route } from "react-router-dom";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Select from 'react-select';
import RecordCardNew from "./record-card-new.component";
import Topic from "./topic.component"
import TopicService from "../services/topic.service";
import {Grid} from "@material-ui/core";

export default class ViewRecordsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.displayRecordThread = this.displayRecordThread.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.onTopicsDropdownSelected = this.onTopicsDropdownSelected.bind(this);


        this.state = {
            records: [],
            currentRecord: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 10,

            showTopics: true,
            availableTopics: [],
            selectedTopic: null,
            selectedTopicValue: null,
        };

        this.pageSizes = [{value: 2, label: '2'}, {value: 4, label: '4'}, {value: 10, label: '10'}];
    }

    componentDidMount() {
        this.getRecords();

        TopicService.getAllTopics()
            .then(response => {
                    let topicsForSelect = response.data.topics.map(el => {
                        return {value: el.id, label: el.name};
                    })
                    this.setState({
                        availableTopics: topicsForSelect
                    });
                },
                error => {
                    console.log(error);
                }
            );
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    onTopicsDropdownSelected(selectedTopic) {
        this.setState({
            selectedTopic: selectedTopic.value,
            selectedTopicValue: selectedTopic
        });
    }


    getRecords() {
        const { searchTitle, page, pageSize, selectedTopic } = this.state;

        RecordService.getAll(page, pageSize, searchTitle, selectedTopic)
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
    }

    refreshList() {
        this.setState({
            records: [],
            count: -1,
        });
    }

    displayRecordThread(record) {
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

        const {showTopics} = this.state;

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
                        <label htmlFor="selectedTopics" className="col-sm-2">Тэги:</label>
                        <Select className="col-sm-10"
                                onChange={this.onTopicsDropdownSelected}
                                options={this.state.availableTopics}
                                value={this.state.selectedTopicValue}
                                autoFocus={true}
                                isMulti={false}
                        />
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


                    <Grid container spacing={2} direction={"column"}>
                        {this.state.records &&
                        this.state.records.map((record, index) => (
                            <Grid item
                                style={{listStyleType: "none"}}
                                key={index}
                                onClick={() => this.displayRecordThread(record)}
                            >
                                <RecordCardNew record={record} isPreview={true} isReply={false} />
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <div className="col-sm-2">
                    <Link to={"/records/create"} className="nav-link card-link-custom color-orange">
                        Создать пост
                    </Link>
                    <Link to={"/topics/create"} className="nav-link card-link-custom color-orange">
                        Страница тэгов
                    </Link>

                    {showTopics && (
                        <Route component={Topic}/>
                    )}
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